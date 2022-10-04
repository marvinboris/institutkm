<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimony extends Model
{
    protected $fillable = [
        'name', 'photo', 'body', 'is_active',
    ];

    protected $directory = '/images/testimonies/';

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function getBodyAttribute($value)
    {
        return UtilController::translatable($value);
    }
}
