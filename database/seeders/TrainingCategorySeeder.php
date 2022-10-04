<?php

namespace Database\Seeders;

use App\Models\TrainingCategory;
use Illuminate\Database\Seeder;

class TrainingCategorySeeder extends Seeder
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
                'subject_id' => 1,
                'photo' => 'hector-j-rivas-Nh6NsnqYVsI-unsplash.jpg',
            ],
            [
                'subject_id' => 2,
                'photo' => 'oc-gonzalez-YDfnnrLXRLE-unsplash.jpg',
            ],
            [
                'subject_id' => 3,
                'photo' => 'wei-cheng-wu-R7lSwItK0LE-unsplash.jpg',
            ],
            [
                'subject_id' => 4,
                'photo' => 'markus-winkler-RzUhB5oHcJs-unsplash.jpg',
            ],
            [
                'subject_id' => 5,
                'photo' => 'camille-brodard-VxAwTeiqDao-unsplash.jpg',
            ],
            [
                'subject_id' => 6,
                'photo' => 'myrlene-numa-SnITZTTeJVE-unsplash.jpg',
            ],
            [
                'subject_id' => 7,
                'photo' => 'devon-janse-van-rensburg-KHNjPwG6Sv0-unsplash.jpg',
            ],
            [
                'subject_id' => 8,
                'photo' => 'jo-szczepanska-9OKGEVJiTKk-unsplash.jpg',
            ],
        ];

        foreach ($items as $item) {
            TrainingCategory::create($item);
        }
    }
}
