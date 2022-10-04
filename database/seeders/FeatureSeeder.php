<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Role;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            [
                'name' => "CMS",
                'prefix' => 'cms',
            ],
            [
                'name' => "Users",
                'prefix' => 'users',
            ],
            [
                'name' => "Roles",
                'prefix' => 'roles',
            ],
            [
                'name' => "Features",
                'prefix' => 'features',
            ],
            [
                'name' => "Languages",
                'prefix' => 'languages',
            ],
            [
                'name' => "Trainings",
                'prefix' => 'trainings',
            ],
            [
                'name' => "Training categories",
                'prefix' => 'training-categories',
            ],
            [
                'name' => "Training levels",
                'prefix' => 'training-levels',
            ],
            [
                'name' => "Subjects",
                'prefix' => 'subjects',
            ],
            [
                'name' => "Publications",
                'prefix' => 'publications',
            ],
            [
                'name' => "Publication categories",
                'prefix' => 'publication-categories',
            ],
            [
                'name' => "Banner publications",
                'prefix' => 'banner-publications',
            ],
            [
                'name' => "Testimonies",
                'prefix' => 'testimonies',
            ],
            [
                'name' => "Images",
                'prefix' => 'images',
            ],
        ];

        foreach ($items as $item) {
            Feature::create($item);
        }

        foreach (Role::all() as $role) {
            foreach (Feature::all() as $item) {
                $role->features()->attach($item->id, [
                    'access' => json_encode(['c', 'u', 'd'])
                ]);
            }
        }
    }
}
