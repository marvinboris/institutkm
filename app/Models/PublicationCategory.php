<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class PublicationCategory extends Model
{
    use Sluggable;

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'stringified'
            ]
        ];
    }

    protected $fillable = [
        'name', 'slug', 'is_active',
    ];

    public function getNameAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getLinkAttribute()
    {
        return '/publications/' . $this->slug;
    }

    public function getStringifiedAttribute()
    {
        return $this->name[env('MIX_DEFAULT_LANG', 'fr')];
    }

    public function publications()
    {
        return $this->hasMany(Publication::class, 'category_id');
    }
}
