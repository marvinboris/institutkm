<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Training extends Model
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

    protected $directory = '/images/trainings/';

    protected $fillable = [
        'category_id', 'level_id', 'title', 'description', 'body', 'photo', 'slug', 'is_active',
    ];

    protected $appends = [
        'link', 'stringified',
    ];

    public function category()
    {
        return $this->belongsTo(TrainingCategory::class);
    }

    public function level()
    {
        return $this->belongsTo(TrainingLevel::class);
    }

    public function getTitleAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getDescriptionAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getBodyAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function getLinkAttribute()
    {
        return $this->category->link . '/' . $this->slug;
    }

    public function getStringifiedAttribute()
    {
        return $this->title[env('MIX_DEFAULT_LANG', 'fr')];
    }
}
