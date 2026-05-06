<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Http\Requests\StoreBookingRequest;

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
            'payment_method' => 'qris'
        ]);

        Payment::create([
            'booking_id' => $booking->id,
            'amount' => $totalPrice,
            'payment_method' => 'qris',
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

        if ($booking->payment_status === 'paid') {
            return response()->json([
                'message' => 'Sudah dibayar'
            ], 400);
        }

        $booking->update([
            'payment_status' => 'paid',
            'payment_method' => $request->payment_method,
            'payment_token' => $request->payment_token
        ]);

        return response()->json([
            'message' => 'Pembayaran berhasil',
            'data' => $booking
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
            'booking_id'       => $booking->id,
            'amount'           => $booking->total_price,
            'payment_method'   => 'QRIS',

            // hotel
            'hotel_name'       => $booking->room->hotel->name,

            // QRIS HOTEL
            'qris_image_url'   => $booking->room->hotel->qris_image
                ? asset('storage/' . $booking->room->hotel->qris_image)
                : null,

            // transaksi
            'transaction_code' => $booking->payment->transaction_code
        ]);
    }
}