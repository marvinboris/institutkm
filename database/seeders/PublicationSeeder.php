<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\User;
use Illuminate\Database\Seeder;

class PublicationSeeder extends Seeder
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
                'category_id' => 1,
                'title' => json_encode([
                    'fr' => 'La meilleure formation en stylisme modélisme',
                    'en' => 'The best fashion design course',
                ]),
                'description' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'read_more' => json_encode([
                    'fr' => 'Découvrir plus',
                    'en' => 'Discover more',
                ]),
                'body' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'photo' => 'fleur-5obYWU5UXdI-unsplash.jpg',
            ],
            [
                'category_id' => 1,
                'title' => json_encode([
                    'fr' => 'La meilleure formation en stylisme modélisme',
                    'en' => 'The best fashion design course',
                ]),
                'description' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'read_more' => json_encode([
                    'fr' => 'Découvrir plus',
                    'en' => 'Discover more',
                ]),
                'body' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'photo' => 'merve-sehirli-nasir-sFubXOglx7g-unsplash.jpg',
            ],
            [
                'category_id' => 1,
                'title' => json_encode([
                    'fr' => 'La meilleure formation en stylisme modélisme',
                    'en' => 'The best fashion design course',
                ]),
                'description' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'read_more' => json_encode([
                    'fr' => 'Découvrir plus',
                    'en' => 'Discover more',
                ]),
                'body' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'photo' => 'patricia-serna-zPZ9vqqDNBA-unsplash.jpg',
            ],
        ];

        foreach ($items as $item) {
            $publication = User::find(1)->publications()->create($item);
            $publication->subjects()->sync([1]);
        }
    }
}
