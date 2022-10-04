<?php

namespace Database\Seeders;

use App\Models\PublicationCategory;
use Illuminate\Database\Seeder;

class PublicationCategorySeeder extends Seeder
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
                'name' => json_encode([
                    'fr' => 'News',
                    'en' => 'News',
                ])
            ],
            [
                'name' => json_encode([
                    'fr' => 'Evènements',
                    'en' => 'Events',
                ])
            ]
        ];

        foreach ($items as $item) {
            PublicationCategory::create($item);
        }
    }
}
