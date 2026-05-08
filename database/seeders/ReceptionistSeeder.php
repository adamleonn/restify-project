<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ReceptionistSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([

            [
                'name' => 'Receptionist Flores Gallery',
                'email' => 'receptionist@flores.com',
                'password' => Hash::make('recep12345'),
                'role_id' => 3,
                'hotel_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Receptionist El Hotel',
                'email' => 'receptionist@elhotel.com',
                'password' => Hash::make('recep123456'),
                'role_id' => 3,
                'hotel_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}