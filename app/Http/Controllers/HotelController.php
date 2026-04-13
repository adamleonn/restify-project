<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use App\Http\Requests\StoreHotelRequest;

class HotelController extends Controller
{
    // GET ALL HOTELS + FILTER + UI READY
    public function index(Request $request)
    {
        $query = Hotel::with('rooms')
            ->withAvg('ratings', 'rating');

        // filter harga berdasarkan room
        if ($request->min_price) {
            $query->whereHas('rooms', function ($q) use ($request) {
                $q->where('price', '>=', $request->min_price);
            });
        }

        if ($request->max_price) {
            $query->whereHas('rooms', function ($q) use ($request) {
                $q->where('price', '<=', $request->max_price);
            });
        }

        $hotels = $query->get()->map(function ($hotel) {
            return [
                'id' => $hotel->id,
                'name' => $hotel->name,
                'city' => $hotel->city,
                'image_url' => $hotel->image_url,

                'price' => $hotel->rooms->min('price'),

                'average_rating' => round($hotel->ratings_avg_rating ?? 0, 1),
            ];
        });

        return response()->json($hotels);
    }

    // GET HOTEL DETAIL
    public function show($id)
    {
        $hotel = Hotel::with(['rooms', 'ratings.user'])
            ->withAvg('ratings', 'rating')
            ->find($id);

        if (!$hotel) {
            return response()->json([
                'message' => 'Hotel tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'id' => $hotel->id,
            'name' => $hotel->name,
            'city' => $hotel->city,
            'image_url' => $hotel->image_url,
            'description' => $hotel->description,

            'average_rating' => round($hotel->ratings_avg_rating ?? 0, 1),

            'price' => $hotel->rooms->min('price'),

            'rooms' => $hotel->rooms,
            'ratings' => $hotel->ratings
        ]);
    }

    // ADMIN - CREATE HOTEL (UPLOAD IMAGE)
    public function store(StoreHotelRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hotels', 'public');
            $data['image'] = $path;
        }

        $hotel = Hotel::create($data);

        return response()->json([
            'message' => 'Hotel berhasil dibuat',
            'data' => $hotel
        ], 201);
    }

    // ADMIN - UPDATE HOTEL (UPLOAD IMAGE)
    public function update(StoreHotelRequest $request, $id)
    {
        $hotel = Hotel::find($id);

        if (!$hotel) {
            return response()->json([
                'message' => 'Hotel tidak ditemukan'
            ], 404);
        }

        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hotels', 'public');
            $data['image'] = $path;
        }

        $hotel->update($data);

        return response()->json([
            'message' => 'Hotel berhasil diupdate',
            'data' => $hotel
        ]);
    }

    // ADMIN - DELETE HOTEL
    public function destroy($id)
    {
        $hotel = Hotel::find($id);

        if (!$hotel) {
            return response()->json([
                'message' => 'Hotel tidak ditemukan'
            ], 404);
        }

        $hotel->delete();

        return response()->json([
            'message' => 'Hotel berhasil dihapus'
        ]);
    }
}