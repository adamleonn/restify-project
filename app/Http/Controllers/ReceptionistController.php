<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\Payment;
use Illuminate\Http\Request;

class ReceptionistController extends Controller
{
    // LIST BOOKING SESUAI HOTEL
    public function bookingList()
    {
        $hotelId = auth()->user()->hotel_id;

        $bookings = Booking::whereHas('room', function ($query) use ($hotelId) {
                $query->where('hotel_id', $hotelId);
            })
            ->with(['user', 'room.hotel', 'payment'])
            ->latest()
            ->get();

        return response()->json($bookings);
    }

    // KONFIRMASI BOOKING
    public function confirm(Request $request)
    {
        $request->validate([
            'transaction_code' => 'required|exists:payments,transaction_code'
        ]);

        // cari payment berdasarkan transaction code
        $payment = Payment::where('transaction_code', $request->transaction_code)
            ->with('booking.room')
            ->first();

        if (!$payment) {
            return response()->json([
                'message' => 'Payment tidak ditemukan'
            ], 404);
        }

        // ambil booking
        $booking = $payment->booking;

        // validasi hotel receptionist
        if ($booking->room->hotel_id != auth()->user()->hotel_id) {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        // validasi pembayaran harus paid
        if ($booking->payment_status !== 'paid') {
            return response()->json([
                'message' => 'Pembayaran belum selesai'
            ], 400);
        }

        // cegah double confirm
        if ($booking->status === 'confirmed') {
            return response()->json([
                'message' => 'Booking sudah dikonfirmasi'
            ], 400);
        }

        // update booking
        $booking->update([
            'status' => 'confirmed'
        ]);

        return response()->json([
            'message' => 'Booking berhasil dikonfirmasi',
            'data' => $booking
        ]);
    }

    // CHECK-IN
    public function checkIn(Request $request)
    {
        $request->validate([
            'transaction_code' => 'required|exists:payments,transaction_code'
        ]);

        // cari payment
        $payment = Payment::where('transaction_code', $request->transaction_code)
            ->with('booking.room')
            ->first();

        if (!$payment) {
            return response()->json([
                'message' => 'Payment tidak ditemukan'
            ], 404);
        }

        // ambil booking
        $booking = $payment->booking;

        // validasi hotel receptionist
        if ($booking->room->hotel_id != auth()->user()->hotel_id) {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        // hanya confirmed yang boleh check-in
        if ($booking->status !== 'confirmed') {
            return response()->json([
                'message' => 'Booking belum dikonfirmasi'
            ], 400);
        }

        // update booking
        $booking->update([
            'status' => 'checked_in'
        ]);

        // update room
        $booking->room->update([
            'status' => 'booked'
        ]);

        return response()->json([
            'message' => 'Check-in berhasil',
            'data' => $booking
        ]);
    }

    // DECLINE BOOKING
    public function decline(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id'
        ]);

        $booking = Booking::with('room')->find($request->booking_id);

        if (!$booking) {
            return response()->json([
                'message' => 'Booking tidak ditemukan'
            ], 404);
        }

        // validasi hotel receptionist
        if ($booking->room->hotel_id != auth()->user()->hotel_id) {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        // cegah double cancel
        if ($booking->status === 'cancelled') {
            return response()->json([
                'message' => 'Booking sudah dibatalkan'
            ], 400);
        }

        // update booking
        $booking->update([
            'status' => 'cancelled'
        ]);

        // update room kembali available
        $booking->room->update([
            'status' => 'available'
        ]);

        return response()->json([
            'message' => 'Booking ditolak',
            'data' => $booking
        ]);
    }

    // UPDATE STATUS ROOM
    public function updateRoomStatus(Request $request)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'status' => 'required|in:available,booked,maintenance'
        ]);

        $room = Room::find($request->room_id);

        if (!$room) {
            return response()->json([
                'message' => 'Room tidak ditemukan'
            ], 404);
        }

        // validasi hotel receptionist
        if ($room->hotel_id != auth()->user()->hotel_id) {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        // update room
        $room->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Status kamar berhasil diupdate',
            'data' => $room
        ]);
    }
}