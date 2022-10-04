<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Publication extends Model
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

    protected $directory = '/images/publications/';

    protected $fillable = [
        'category_id', 'title', 'description', 'read_more', 'body', 'photo', 'slug', 'is_active',
    ];

    protected $appends = [
        'link', 'stringified',
    ];

    public function category()
    {
        return $this->belongsTo(PublicationCategory::class);
    }

    public function getTitleAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getDescriptionAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getReadMoreAttribute($value)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $lang = $user ? $user->language->abbr : request()->lang;

        $return = null;
        if ($value) $return = UtilController::translatable($value)[$lang];
        else {
            $return = $cms['pages'][$lang]['frontend']['components']['publication']['read_more'];
        }
        return $return;
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

    public function author()
    {
        return $this->morphTo();
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'subject_publication');
    }
}
