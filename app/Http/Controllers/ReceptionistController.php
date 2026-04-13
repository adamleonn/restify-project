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
            ->with(['user', 'room.hotel'])
            ->latest()
            ->get();

        return response()->json($bookings);
    }

    //Konfirmasi pembayaran
    public function confirm(Request $request)
    {
        $request->validate([
            'transaction_code' => 'required'
        ]);

        $booking = \App\Models\Booking::where('payment_token', $request->transaction_code)
            ->with('room')
            ->first();

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

        // cek pembayaran
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

        $payment = Payment::where('transaction_code', $request->transaction_code)
            ->with('booking.room')
            ->first();

        $booking = $payment->booking;

        if ($booking->room->hotel_id != auth()->user()->hotel_id) {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        if ($booking->status !== 'confirmed') {
            return response()->json([
                'message' => 'Booking belum dikonfirmasi'
            ], 400);
        }

        $booking->update([
            'status' => 'completed'
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

        if ($booking->room->hotel_id != auth()->user()->hotel_id) {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        if ($booking->status === 'cancelled') {
            return response()->json([
                'message' => 'Booking sudah dibatalkan'
            ], 400);
        }

        $booking->update([
            'status' => 'cancelled'
        ]);

        return response()->json([
            'message' => 'Booking ditolak',
            'data' => $booking
        ]);
    }

    // UPDATE STATUS KAMAR
    public function updateRoomStatus(Request $request)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'status' => 'required|in:available,booked,maintenance'
        ]);

        $room = Room::find($request->room_id);

        if ($room->hotel_id != auth()->user()->hotel_id) {
            return response()->json([
                'message' => 'Akses ditolak'
            ], 403);
        }

        $room->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Status kamar berhasil diupdate',
            'data' => $room
        ]);
    }
}