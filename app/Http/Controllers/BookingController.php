<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Requests\StoreBookingRequest;
use Midtrans\Config;
use Midtrans\Snap;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request)
    {
        $user = auth()->user();

        return DB::transaction(function () use ($request, $user) {

            //LOCK ROOM (ANTI RACE CONDITION)
            $room = Room::where('id', $request->room_id)
                ->lockForUpdate()
                ->first();

            
            //NGCEK ROOM ADA ATAU TIDAK
            if (!$room) {
                return response()->json([
                    'message' => 'Room tidak ditemukan'
                ], 404);
            }

            //ROOM STATUS CHECK 
            if ($room->status !== 'available') {
                return response()->json([
                    'message' => 'Kamar sedang tidak tersedia'
                ], 400);
            }

            //CHECH-IN DATE VALIDATION
            if (
                Carbon::parse($request->check_in_date)
                    ->startOfDay()
                    ->lt(now()->startOfDay())
            ) {
                return response()->json([
                    'message' => 'Tanggal check in tidak valid'
                ], 422);
            }

            //CHECK BOOKING OVERLAP
            $isBooked = Booking::where('room_id', $room->id)

                // booking aktif
                ->where(function ($query) {

                    $query->where('payment_status', 'paid')

                        ->orWhere(function ($q) {

                            $q->where('payment_status', 'pending')
                                ->where('expired_at', '>', now());

                        });

                })

                // overlap tanggal
                ->where(function ($query) use ($request) {

                    $query->where(
                        'check_in_date',
                        '<',
                        $request->check_out_date
                    )
                    ->where(
                        'check_out_date',
                        '>',
                        $request->check_in_date
                    );

                })

                ->exists();

            
            //NGCEK ROOM SUDAH DI BOOKING
            if ($isBooked) {
                return response()->json([
                    'message' => 'Kamar sudah dibooking pada tanggal tersebut'
                ], 422);
            }

            
            //JUMLAH KAN MALAM 
            $nights = Carbon::parse($request->check_in_date)
                ->diffInDays(
                    Carbon::parse($request->check_out_date)
                );

            
            //MINIMUM 1 MALAM
            if ($nights < 1) {
                return response()->json([
                    'message' => 'Minimal booking 1 malam'
                ], 422);
            }

            //ROOM CAPACITY VALIDATION
            $maxCapacity = $room->capacity;

            if ($request->extra_bed) {
                $maxCapacity += 1;
            }

            if ($request->guests > $maxCapacity) {
                return response()->json([
                    'message' => 'Jumlah tamu melebihi kapasitas kamar'
                ], 422);
            }

            //TOTAL PRICE
            $totalPrice = $room->price * $nights;

            // extra bed
            if ($request->extra_bed) {
                $totalPrice += 100000 * $nights;
            }

            //UNIQUE TRANCSACTION CODE
            do {

                $transactionCode =
                    'TRX-' . strtoupper(Str::random(8));

            } while (

                Payment::where(
                    'transaction_code',
                    $transactionCode
                )->exists()

            );

            //CREATE BOOKING
            $booking = Booking::create([
                'user_id' => $user->id,
                'room_id' => $room->id,
                'check_in_date' => $request->check_in_date,
                'check_out_date' => $request->check_out_date,
                'nights' => $nights,
                'total_price' => $totalPrice,
                'guests' => $request->guests,
                'extra_bed' => $request->extra_bed,
                // booking status
                'status' => 'pending',
                // payment
                'payment_status' => 'pending',
                'payment_method' => 'midtrans',
                // booking expired
                'expired_at' => now()->addMinutes(15)
            ]);


            //CREATE PAYMENT
            Payment::create([
                'booking_id' => $booking->id,
                'amount' => $totalPrice,
                'payment_method' => 'midtrans',
                'status' => 'pending',
                'transaction_code' => $transactionCode
            ]);


            //RESPONSE
            return response()->json([

                'message' => 'Booking berhasil dibuat',

                'data' => [
                    'booking_id' => $booking->id,
                    'status' => $booking->status,
                    'payment_status' => $booking->payment_status,
                    'expired_at' => $booking->expired_at,
                    'total_price' => $booking->total_price,
                    'room_id' => $booking->room_id,
                ]

            ], 201);

        });
    }


    //HistoryBooking By User
    public function history(Request $request)
    {
        $user = auth()->user();

        $query = Booking::with([
                'room.hotel',
                'payment'
            ])
            ->where('user_id', $user->id);
        
        //SEARCH TRANSACTION CODE
        if ($request->filled('search')) {

            $query->whereHas('payment', function ($q) use ($request) {

                $q->where(
                    'transaction_code',
                    'like',
                    '%' . $request->search . '%'
                );
            });
        }

        //FILTER BOOKING STATUS
        if ($request->filled('status')) {

            $query->where(
                'status',
                $request->status
            );
        }

        //FILTER PAYMENT STATUS
        if ($request->filled('payment_status')) {

            $query->where(
                'payment_status',
                $request->payment_status
            );
        }

        //SORTING
        $query->latest();
        
        //PAGINATION
        $perPage = $request->get('per_page', 10);

        $bookings = $query->paginate($perPage);

        return response()->json($bookings);
    }


    // BOOKING DETAIL for user
    public function show($id)
    {
        $booking = Booking::with([
            'room.hotel',
            'payment'
        ])
        ->where('id', $id)
        ->where('user_id', auth()->id())
        ->first();

        if (!$booking) {

            return response()->json([
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'message' => 'Detail booking berhasil diambil',
            'data' => $booking
        ]);
    }


    // GET ALL BOOKINGS BY ADMIN
    public function allBookings(Request $request)
    {
        $query = Booking::with([
                'user:id,name,email',
                'room.hotel',
                'payment'
            ]);

        //SEARCH
        if ($request->filled('search')) {

            $query->where(function ($q) use ($request) {

                // search user
                $q->whereHas('user', function ($userQuery) use ($request) {

                    $userQuery->where(
                        'name',
                        'like',
                        '%' . $request->search . '%'
                    );

                })

                // search transaction
                ->orWhereHas('payment', function ($paymentQuery) use ($request) {

                    $paymentQuery->where(
                        'transaction_code',
                        'like',
                        '%' . $request->search . '%'
                    );

                });

            });
        }

        
        //FILTER BOOKING STATUS
        if ($request->filled('status')) {

            $query->where(
                'status',
                $request->status
            );
        }

        //FILTER PAYMENT STATUS
        if ($request->filled('payment_status')) {

            $query->where(
                'payment_status',
                $request->payment_status
            );
        }

        //FILTER HOTEL
        if ($request->filled('hotel_id')) {

            $query->whereHas('room', function ($q) use ($request) {

                $q->where(
                    'hotel_id',
                    $request->hotel_id
                );

            });
        }

        //SORTING
        switch ($request->sort) {

            case 'oldest':
                $query->oldest();
                break;

            default:
                $query->latest();
                break;
        }

        //PAGINATION
        $perPage = $request->get('per_page', 10);

        $bookings = $query->paginate($perPage);

        return response()->json($bookings);
    }


    //Pembayaran
    public function pay(Request $request, $id)
    {
        $user = auth()->user();

        $booking = Booking::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

        // cek apakah sudah dibayar
        if ($booking->payment_status === 'paid') {
            return response()->json([
                'message' => 'Sudah dibayar'
            ], 400);
        }

        // MIDTRANS CONFIG
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // ambil payment
        $payment = $booking->payment;

        // cek payment
        if (!$payment) {
            return response()->json([
                'message' => 'Data payment tidak ditemukan'
            ], 404);
        }

        // parameter transaksi midtrans
        $params = [
            'transaction_details' => [
                'order_id' => $payment->transaction_code,
                'gross_amount' => (int) $payment->amount,
            ],

            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],

            'enabled_payments' => [
                'qris',
                'bank_transfer',
                'gopay'
            ],
        ];

        // generate snap token
        $snapToken = Snap::getSnapToken($params);

        // simpan token ke booking
        $booking->update([
            'payment_method' => 'midtrans',
            'payment_token' => $snapToken
        ]);

        return response()->json([
            'message' => 'Snap token berhasil dibuat',
            'snap_token' => $snapToken,
            'transaction_code' => $payment->transaction_code,
            'booking_id' => $booking->id,
            'gross_amount' => $payment->amount
        ]);
    }

    // MIDTRANS CALLBACK
    public function midtransCallback(Request $request)
    {
        $transactionStatus = $request->transaction_status;
        $orderId = $request->order_id;

        // cari payment berdasarkan transaction_code
        $payment = Payment::where('transaction_code', $orderId)->first();

        if (!$payment) {
            return response()->json([
                'message' => 'Payment tidak ditemukan'
            ], 404);
        }

        // ambil booking
        $booking = $payment->booking;

        // PAYMENT SUCCESS
        if (
            $transactionStatus == 'settlement' ||
            $transactionStatus == 'capture'
        ) {

            // update payment
            $payment->update([
                'status' => 'paid',
                'paid_at' => now()
            ]);

            // update booking
            $booking->update([
                'payment_status' => 'paid',
            ]);
        }

        // PAYMENT FAILED
        else if (
            $transactionStatus == 'deny' ||
            $transactionStatus == 'expire' ||
            $transactionStatus == 'cancel'
        ) {

            $payment->update([
                'status' => 'failed'
            ]);

            $booking->update([
                'payment_status' => 'failed'
            ]);
        }

        // PAYMENT PENDING
        else if ($transactionStatus == 'pending') {

            $payment->update([
                'status' => 'pending'
            ]);

            $booking->update([
                'payment_status' => 'pending'
            ]);
        }

        return response()->json([
            'message' => 'Callback berhasil diproses'
        ]);
    }


    //UserCheckOut
    public function checkout($id)
    {
        $user = auth()->user();

        $booking = \App\Models\Booking::with('room')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

        // hanya bisa checkout jika sudah check-in
        if ($booking->status !== 'checked_in') {
            return response()->json([
                'message' => 'Status tidak valid untuk checkout'
            ], 400);
        }   

        // update status
        $booking->update([
            'status' => 'completed'
        ]);

         // room kembali available
        $booking->room->update([
            'status' => 'available'
        ]);

        return response()->json([
            'message' => 'Checkout berhasil',
            'data' => $booking
        ]);
    }

    // USER CANCEL BOOKING
    public function cancel($id)
    {
        $user = auth()->user();

        $booking = Booking::with('payment')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        // booking tidak ditemukan
        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

        // hanya pending yang boleh dicancel
        if ($booking->status !== 'pending') {
            return response()->json([
                'message' => 'Booking tidak bisa dibatalkan'
            ], 400);
        }

        // update booking
        $booking->update([
            'status' => 'cancelled',
            'payment_status' => 'failed'
        ]);

        // update payment
        if ($booking->payment) {

            $booking->payment->update([
                'status' => 'failed'
            ]);
        }

        return response()->json([
            'message' => 'Booking berhasil dibatalkan'
        ]);
    }

    // Pembayaran Detail
    public function paymentDetail($id)
    {
        $booking = Booking::with(['room.hotel', 'payment'])
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

        return response()->json([

            // booking
            'booking_id' => $booking->id,
            'amount' => $booking->total_price,

            // payment
            'payment_method' => $booking->payment->payment_method,
            'payment_status' => $booking->payment_status,
            'snap_token' => $booking->payment_token,

            // hotel
            'hotel_name' => $booking->room->hotel->name,

            // qris hotel
            'qris_image_url' => $booking->room->hotel->qris_image
                ? asset('storage/' . $booking->room->hotel->qris_image)
                : null,

            // transaksi
            'transaction_code' => $booking->payment->transaction_code
        ]);
    }
}