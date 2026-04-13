<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRoomRequest;

class RoomController extends Controller
{
    public function index()
    {
        return response()->json(Room::with('hotel')->get());
    }

    public function store(StoreRoomRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('rooms', 'public');
            $data['image'] = $path;
        }

        $room = Room::create($data);

        return response()->json([
            'message' => 'Room created',
            'data' => $room
        ], 201);
    }

    public function show($id)
    {
        $room = Room::with('hotel')->find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        return response()->json($room);
    }

    public function roomsByHotel($id)
    {
        $rooms = Room::where('hotel_id', $id)
            ->with('hotel')
            ->get();

        return response()->json($rooms);
    }

    public function update(Request $request, $id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $validated = $request->validate([
            'hotel_id' => 'sometimes|exists:hotels,id',
            'room_type' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'capacity' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:available,booked,maintenance',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048' 
        ]);


        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('rooms', 'public');
            $validated['image'] = $path;
        }

        $room->update($validated);
        $room->refresh();

        return response()->json([
            'message' => 'Room updated',
            'data' => $room
        ]);
    }

    public function destroy($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->delete();

        return response()->json([
            'message' => 'Room deleted'
        ]);
    }
}