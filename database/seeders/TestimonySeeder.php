<?php

namespace Database\Seeders;

use App\Models\Testimony;
use Illuminate\Database\Seeder;

class TestimonySeeder extends Seeder
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
                'name' => 'Judith Soeurs',
                'body' => json_encode([
                    'fr' => 'Merci de tout coeur! Nous avons passé des moments extraordinaires de beauté. Recevez toute notre affection des USA.',
                    'en' => 'Thank you so much! We have spent a great beauty time. Receive our love from USA.',
                ]),
                'photo' => 'fleur-5obYWU5UXdI-unsplash.jpg',
            ],
            [
                'name' => 'Fanny',
                'body' => json_encode([
                    'fr' => 'Que vous soyez du genre créatif ou non, la couture et la réalisation de quelques points de suture est un passe-temps que vous devriez ajouter à votre liste. Le simple fait de coudre a des effets bénéfiques avérés sur la santé et le mental qui amélioreront votre bien-être.',
                    'en' => 'Thank you so much! We have spent a great beauty time. Receive our love from USA.',
                ]),
                'photo' => 'merve-sehirli-nasir-sFubXOglx7g-unsplash.jpg',
            ],
        ];

        foreach ($items as $item) {
            Testimony::create($item);
        }
    }
}
