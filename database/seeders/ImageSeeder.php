<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
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
                'src' => "/images/publications/fleur-5obYWU5UXdI-unsplash.jpg",
            ],
            [
                'src' => "/images/publications/merve-sehirli-nasir-sFubXOglx7g-unsplash.jpg",
            ],
            [
                'src' => "/images/publications/patricia-serna-zPZ9vqqDNBA-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/camille-brodard-VxAwTeiqDao-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/devon-janse-van-rensburg-KHNjPwG6Sv0-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/hector-j-rivas-Nh6NsnqYVsI-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/jo-szczepanska-9OKGEVJiTKk-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/markus-winkler-RzUhB5oHcJs-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/myrlene-numa-SnITZTTeJVE-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/oc-gonzalez-YDfnnrLXRLE-unsplash.jpg",
            ],
            [
                'src' => "/images/training-categories/wei-cheng-wu-R7lSwItK0LE-unsplash.jpg",
            ],
            [
                'src' => "/images/trainings/edz-norton-s2UUKPH90b0-unsplash.jpg",
            ],
            [
                'src' => "/images/trainings/mel-poole-LlX6BlViuUg-unsplash.jpg",
            ],
            [
                'src' => "/images/trainings/shari-sirotnak-oM5YoMhTf8E-unsplash.jpg",
            ],
            [
                'src' => "/images/aviv-rachmadian-7F7kEHj72MQ-unsplash.jpg",
            ],
        ];

        foreach ($items as $item) {
            Image::create($item);
        }
    }
}
