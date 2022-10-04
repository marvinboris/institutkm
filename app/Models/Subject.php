<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        'name', 'color',
    ];

    public function getNameAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function publications()
    {
        return $this->belongsToMany(Publication::class, 'subject_publication');
    }
}
