<?php

namespace Database\Seeders;

use App\Models\TrainingLevel;
use Illuminate\Database\Seeder;

class TrainingLevelSeeder extends Seeder
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
                    'fr' => 'Formation initiale',
                    'en' => 'Starter',
                ])
            ],
            [
                'name' => json_encode([
                    'fr' => 'Formation intermédiaire',
                    'en' => 'Medium',
                ])
            ],
        ];

        foreach ($items as $item) {
            TrainingLevel::create($item);
        }
    }
}
