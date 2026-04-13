<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            // relasi ke booking (1 booking = 1 payment)
            $table->foreignId('booking_id')
                  ->constrained()
                  ->cascadeOnDelete()
                  ->unique();

            // total pembayaran
            $table->decimal('amount', 10, 2);

            // metode pembayaran
            $table->enum('payment_method', ['qris', 'cash'])
                  ->default('qris');

            // status pembayaran
            $table->enum('status', ['pending', 'paid', 'failed'])
                  ->default('pending');

            // kode transaksi (WAJIB & UNIQUE)
            $table->string('transaction_code')->unique();

            // waktu pembayaran berhasil
            $table->timestamp('paid_at')->nullable();

            // index tambahan (biar cepat query)
            $table->index('booking_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};