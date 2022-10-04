<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class TrainingCategory extends Model
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

    protected $directory = '/images/training-categories/';

    protected $fillable = [
        'subject_id', 'photo',
    ];

    protected $appends = [
        'name', 'link', 'stringified',
    ];

    protected $hidden = [
        'stringified', 'subject_id',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }

    public function getNameAttribute()
    {
        return $this->subject->name;
    }

    public function getLinkAttribute()
    {
        return '/trainings/' . $this->slug;
    }

    public function getStringifiedAttribute()
    {
        return $this->name[env('MIX_DEFAULT_LANG', 'fr')];
    }

    public function trainings()
    {
        return $this->hasMany(Training::class, 'category_id');
    }
}
