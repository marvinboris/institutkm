<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerPublication extends Model
{
    protected $fillable = [
        'publication_id',
    ];

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }
}
