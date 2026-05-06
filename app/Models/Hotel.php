<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{   
    protected $fillable = [
        'name',
        'address',
        'city',
        'latitude',
        'longitude',
        'description',
        'image',
        'qris_image'
    ];

    protected $appends = [
        'average_rating',
        'image_url',
        'qris_image_url',
    ];

    // RELATION: HOTEL -> ROOMS
    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    // RELATION: HOTEL -> RATINGS
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    // RELATION: HOTEL -> RECEPTIONISTS
    public function receptionists()
    {
        return $this->hasMany(User::class, 'hotel_id');
    }

    // ACCESSOR: AVERAGE RATING
    public function getAverageRatingAttribute()
    {
        return round($this->ratings()->avg('rating') ?? 0, 1);
    }

    //ACCESSOR: IMAGE URL
    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset('storage/' . $this->image)
            : null;
    }

    //Untuk Gambar Qris
    public function getQrisImageUrlAttribute()
    {
        return $this->qris_image
            ? asset('storage/' . $this->qris_image)
            : null;
    }

}