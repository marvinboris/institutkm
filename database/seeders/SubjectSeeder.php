<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
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
                    'fr' => 'Stylisme modélisme',
                    'en' => 'Fashion design',
                ]),
                'color' => 'green'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Art et mannequinat',
                    'en' => 'Art and modeling',
                ]),
                'color' => 'red'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Modélisme',
                    'en' => 'Model making',
                ]),
                'color' => 'blue'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Coiffure',
                    'en' => 'Hairdressing',
                ]),
                'color' => 'green'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Esthétique',
                    'en' => 'Beauty care',
                ]),
                'color' => 'red'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Customisation',
                    'en' => 'Customization',
                ]),
                'color' => 'blue'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Décoration',
                    'en' => 'Decoration',
                ]),
                'color' => 'green'
            ],
            [
                'name' => json_encode([
                    'fr' => 'Technicien de fabrication',
                    'en' => 'Manufacturing technician',
                ]),
                'color' => 'red'
            ],
        ];

        foreach ($items as $item) {
            Subject::create($item);
        }
    }
}
