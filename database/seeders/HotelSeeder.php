<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        Hotel::create([
            'name' => 'Flores Gallery Hotel',
            'address' => 'Jl. Flores No.7, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115',
            'city' => 'Bandung',
            'latitude' => -6.9080704,
            'longitude' => 107.6131024,
            'description' => 'Hotel bintang 3 dengan fasilitas lengkap dan suasana artistik.',

            'facilities' => [
                'Wifi',
                'Kolam Renang',
                'Gym',
                'Restaurant',
                'Parking Area'
            ],

            'image' => 'hotels/flores-hotel.jpg',
            'qris_image' => null,
        ]);


        Hotel::create([
            'name' => 'eL Hotel Bandung',
            'address' => 'Jl. Merdeka No.2, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40111',
            'city' => 'Bandung',
            'latitude' => -6.9161116,
            'longitude' => 107.6080445,
            'description' => 'Hotel modern di pusat kota Bandung dengan fasilitas premium.',

            'facilities' => [
                'Wifi',
                'Spa',
                'Meeting Room',
                'Cafe',
                '24 Hours Front Desk'
            ],

            'image' => 'hotels/elhotel-bandung.jpg',
            'qris_image' => null,
        ]);
    }
}