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
        $query = Hotel::query()
            ->withAvg('ratings', 'rating')
            ->withMin('rooms', 'price');

        // search nama hotel
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // filter harga
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

        // filter kota
        if ($request->city) {
            $query->where('city', $request->city);
        }

        // sorting
        if ($request->sort == 'price_asc') {
            $query->orderBy('rooms_min_price', 'asc');
        }

        $hotels = $query->paginate(10)->through(function ($hotel) {
            return [
                'id' => $hotel->id,
                'name' => $hotel->name,
                'city' => $hotel->city,
                'image_url' => $hotel->image_url,
                'price' => $hotel->rooms_min_price,
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

        if ($request->hasFile('qris_image')) {
        $path = $request->file('qris_image')->store('hotels/qris', 'public');
        $data['qris_image'] = $path;
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

        if ($request->hasFile('qris_image')) {
            $path = $request->file('qris_image')->store('hotels/qris', 'public');
            $data['qris_image'] = $path;
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