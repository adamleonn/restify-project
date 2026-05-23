<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;
use App\Models\Hotel;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $floresHotel = Hotel::where(
            'name',
            'Flores Gallery Hotel'
        )->first();

        Room::create([
            'hotel_id' => $floresHotel->id,
            'room_type' => 'Deluxe Room',
            'price' => 750000,
            'status' => 'available',
            'capacity' => 2,

            'description' =>
                'Kamar deluxe nyaman dengan desain artistik dan fasilitas lengkap.',

            'facilities' => [
                'AC',
                'TV',
                'Wifi',
                'Hot Water',
                'Breakfast'
            ],

            'image' => 'rooms/flores-deluxe.jpg',
        ]);


        $elHotel = Hotel::where(
            'name',
            'eL Hotel Bandung'
        )->first();

        Room::create([
            'hotel_id' => $elHotel->id,
            'room_type' => 'Superior Room',
            'price' => 850000,
            'status' => 'available',
            'capacity' => 2,

            'description' =>
                'Kamar modern dengan fasilitas premium dan suasana nyaman.',

            'facilities' => [
                'AC',
                'Netflix TV',
                'Wifi',
                'Mini Bar',
                'Breakfast'
            ],

            'image' => 'rooms/elhotel-superior.jpg',
        ]);
    }
}