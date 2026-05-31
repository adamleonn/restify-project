<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreRoomRequest;

class RoomController extends Controller
{
    // GET ALL ROOMS by Admin 
    public function index(Request $request)
    {
        $query = Room::with('hotel');

        // SEARCH ROOM TYPE
        if ($request->filled('search')) {

            $query->where(
                'room_type',
                'like',
                '%' . $request->search . '%'
            );
        }

        // FILTER HOTEL
        if ($request->filled('hotel_id')) {

            $query->where(
                'hotel_id',
                $request->hotel_id
            );
        }

        // FILTER STATUS
        if ($request->filled('status')) {

            $query->where(
                'status',
                $request->status
            );
        }

        // FILTER ROOM TYPE
        if ($request->filled('room_type')) {

            $query->where(
                'room_type',
                $request->room_type
            );
        }

        // FILTER PRICE
        if ($request->filled('min_price')) {

            $query->where(
                'price',
                '>=',
                $request->min_price
            );
        }

        if ($request->filled('max_price')) {

            $query->where(
                'price',
                '<=',
                $request->max_price
            );
        }

        // SORTING
        switch ($request->sort) {

            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;

            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;

            case 'latest':
                $query->latest();
                break;

            default:
                $query->latest();
                break;
        }

        // PAGINATION
        $perPage = $request->get('per_page', 10);

        $rooms = $query->paginate($perPage);

        return response()->json($rooms);
    }


    // CREATE ROOM by Admin 
    public function store(StoreRoomRequest $request)
    {
        $data = $request->validated();

        // upload image
        if ($request->hasFile('image')) {

            $data['image'] = $request
                ->file('image')
                ->store('rooms', 'public');
        }

        $room = Room::create($data);

        return response()->json([
            'message' => 'Room berhasil dibuat',
            'data' => $room
        ], 201);
    }


    // ROOM DETAIL by Admin 
    public function show($id)
    {
        $room = Room::with('hotel')->find($id);

        if (!$room) {

            return response()->json([
                'message' => 'Room tidak ditemukan'
            ], 404);
        }

        return response()->json($room);
    }


    // ROOMS BY HOTEL by Admin 
    public function roomsByHotel(Request $request, $id)
    {
        $query = Room::where('hotel_id', $id)
            ->with('hotel');

        // FILTER STATUS
        if ($request->filled('status')) {

            $query->where(
                'status',
                $request->status
            );
        }

        // FILTER ROOM TYPE
        if ($request->filled('room_type')) {

            $query->where(
                'room_type',
                $request->room_type
            );
        }

        // FILTER PRICE
        if ($request->filled('min_price')) {

            $query->where(
                'price',
                '>=',
                $request->min_price
            );
        }

        if ($request->filled('max_price')) {

            $query->where(
                'price',
                '<=',
                $request->max_price
            );
        }

        // SORTING
        switch ($request->sort) {

            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;

            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;

            default:
                $query->latest();
                break;
        }

        // PAGINATION
        $perPage = $request->get('per_page', 10);

        $rooms = $query->paginate($perPage);

        return response()->json($rooms);
    }


    // UPDATE ROOM by admin 
    public function update(StoreRoomRequest $request, $id)
    {
        $room = Room::find($id);

        if (!$room) {

            return response()->json([
                'message' => 'Room tidak ditemukan'
            ], 404);
        }

        $validated = $request->validated();

        // update image
        if ($request->hasFile('image')) {

            // hapus image lama
            if ($room->image) {

                Storage::disk('public')->delete($room->image);
            }

            $validated['image'] = $request
                ->file('image')
                ->store('rooms', 'public');
        }

        $room->update($validated);

        return response()->json([
            'message' => 'Room berhasil diupdate',
            'data' => $room->fresh()
        ]);
    }


    // DELETE ROOM By admin 
    public function destroy($id)
    {
        $room = Room::find($id);

        if (!$room) {

            return response()->json([
                'message' => 'Room tidak ditemukan'
            ], 404);
        }

        // hapus image
        if ($room->image) {

            Storage::disk('public')->delete($room->image);
        }

        $room->delete();

        return response()->json([
            'message' => 'Room berhasil dihapus'
        ]);
    }
}