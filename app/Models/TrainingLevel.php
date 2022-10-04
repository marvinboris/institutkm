<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Model;

class TrainingLevel extends Model
{
    protected $fillable = [
        'name',
    ];

    public function getNameAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function trainings()
    {
        return $this->hasMany(Training::class);
    }
}
