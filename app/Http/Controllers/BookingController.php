<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Http\Requests\StoreBookingRequest;
use Midtrans\Config;
use Midtrans\Snap;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request)
    {
        $user = auth()->user();

        $room = Room::find($request->room_id);

        if (!$room || $room->status !== 'available') {
            return response()->json([
                'message' => 'Kamar tidak tersedia'
            ], 400);
        }

        $nights = Carbon::parse($request->check_in_date)
            ->diffInDays(Carbon::parse($request->check_out_date));

        $maxCapacity = $room->capacity;

        if ($request->extra_bed) {
            $maxCapacity += 1;
        }

        if ($request->guests > $maxCapacity) {
            return response()->json([
                'message' => 'Jumlah tamu melebihi kapasitas kamar'
            ], 422);
        }

        $totalPrice = $room->price * $nights;

        if ($request->extra_bed) {
            $totalPrice += 100000 * $nights;
        }

        $transactionCode = 'TRX-' . strtoupper(Str::random(8));

        $booking = Booking::create([
            'user_id' => $user->id,
            'room_id' => $request->room_id,
            'check_in_date' => $request->check_in_date,
            'check_out_date' => $request->check_out_date,
            'nights' => $nights,
            'total_price' => $totalPrice,
            'guests' => $request->guests,
            'extra_bed' => $request->extra_bed,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => 'midtrans'
        ]);

        Payment::create([
            'booking_id' => $booking->id,
            'amount' => $totalPrice,
            'payment_method' => 'midtrans',
            'status' => 'pending',
            'transaction_code' => $transactionCode
        ]);

        return response()->json([
            'message' => 'Booking berhasil',
            'data' => $booking
        ], 201);
    }

    //HistoryBooking By User
    public function history()
    {
        $user = auth()->user();

        $bookings = \App\Models\Booking::with(['room.hotel'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json($bookings);
    }

    public function show($id)
    {
        $user = auth()->user();

        $booking = \App\Models\Booking::with(['room.hotel'])
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

        return response()->json($booking);
    }

    //Get All bookings by admin
    public function allBookings()
    {
        $bookings = \App\Models\Booking::with([
            'user:id,name,email',
            'room.hotel'
        ])
        ->latest()
        ->get();

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