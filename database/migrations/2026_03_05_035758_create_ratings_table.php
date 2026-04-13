<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();

            // relasi user (yang memberi rating)
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // relasi booking (WAJIB, biar validasi user pernah booking)
            $table->foreignId('booking_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // optional: hotel (biar query lebih cepat)
            $table->foreignId('hotel_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // 1 booking hanya boleh 1 rating
            $table->unique('booking_id');

            // rating 1 - 5
            $table->unsignedTinyInteger('rating');

            // ulasan
            $table->text('review')->nullable();

            // optional: foto review (future feature)
            $table->string('image')->nullable();

            $table->timestamps();

             
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};