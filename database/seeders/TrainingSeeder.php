<?php

namespace Database\Seeders;

use App\Models\Training;
use Illuminate\Database\Seeder;

class TrainingSeeder extends Seeder
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
                'level_id' => 1,
                'title' => json_encode([
                    'fr' => 'Stylisme modélisme A',
                    'en' => 'Fashion design A',
                ]),
                'description' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'body' => json_encode([
                    'fr' => "
Créateur styliste de mode
Formation Stylisme de mode
<p>Apprenez à manier les couleurs, les textiles et matières pour créer des vêtements et accessoires avec la formation professionnelle de l’Institut de Formation Professionnelle KM. Formez-vous et recevez un enseignement de qualité qui vous permettra d’acquérir toutes les connaissances nécessaires pour appréhender au mieux tous les aspects du métier de styliste.</p>

<p>Découvrez le programme de la formation Stylisme de mode et faites votre demande de documentation gratuite pour un complément sur le net.<br />
L’enseignement complet offert par KM Institute vous garantira une entrée rapide sur le marché de la mode. Un conseiller pédagogique de l’école sera mis à votre disposition en retour pour vous accompagner au mieux dans votre projet professionnel.</p>

Accueil / Secteur Mode / Formation Créateur Styliste de Mode / Programme de la formation Créateur styliste de mode

Si vous êtes sensible aux tendances, polyvalent(e) et passionné(e) par tout ce qui touche à la mode, vous aurez toutes les chances de réussir votre formation Créateur styliste de mode à KM INSTITUTE.

Le créateur de mode, toujours à l’affût des tendances du marché de la mode, est doté d’un grand sens du relationnel et artistique.
Il se doit d’être patient, précis, organisé et de maîtriser parfaitement la couture et le modélisme.

Suite à la Formation Créateur Styliste de mode, vous pourrez exercer votre savoir-faire en indépendant ou en tant que salarié dans des bureaux de création, des grands magasins ou pour des marques de prêt-à-porter.

PROGRAMME
Découvrez le programme de la formation Créateur styliste de mode
Le programme de la formation Créateur styliste de mode contient 5 axes :

‌Culture de mode – Connaissance du secteur
‌Croquis et dessin de mode
‌Conception de lignes et collections de vêtements
‌Créativité
‌Environnement professionnel

Les options
Votre formation mode d’une ou plusieurs options pour approfondir un domaine ou enrichir vos compétences. Un atout supplémentaire pour votre réussite professionnelle ! Nos options pour la formation de Styliste Créateur de Mode :

ACCESSOIRES DE MODE
ATELIERS
CRÉEZ VOTRE SITE INTERNET
DÉCLIC DESSIN
DÉCLIC COUTURE
DESIGN TEXTILE

Notre formation Stylisme de mode
Conçue par des professionnels de la mode, notre méthode pédagogique vous permettra d’acquérir toutes les compétences théoriques et pratiques indispensables pour donner vie à votre projet professionnel et devenir un as de la Mode. Vous pourrez également participer à des ateliers pratiques sur des thèmes variés dans notre centre de formation situé à Ndogsimbi face ENEO Ndokotti. Couleurs, motifs et créativité, croquis et dessin de mode… Tout est mis en place pour vous apprendre à maîtriser les techniques professionnelles et les outils clés du graphisme pour stimuler votre créativité.

Vous disposerez lors de votre formation Stylisme de mode :

‌De cours efficaces, disponibles à la fois en fascicules et en format numérique (PDF) WhatsApp. Pour être vraiment libre et capable d’étudier en toute aisance.
‌D’évaluations corrigées par nos formateurs professionnels

‌Un Espace Élève (salle de classe) pour suivre vos cours même si vous ne disposez pas d’une connexion internet

‌De vidéos tutorielles pour mieux visualiser les techniques professionnelles
‌De tutoriels vidés et Fiches mémos pour apprendre
‌De formateurs professionnels en activité à votre disposition par WhatsApp ou Facebook
‌De la possibilité de faire des stages conventionnés
                    ",
                    'en' => "Test",
                ]),
                'photo' => 'fleur-5obYWU5UXdI-unsplash.jpg',
            ],
            [
                'category_id' => 4,
                'level_id' => 1,
                'title' => json_encode([
                    'fr' => 'Coiffure A',
                    'en' => 'Hairdressing A',
                ]),
                'description' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'body' => json_encode([
                    'fr' => 'Test',
                    'en' => 'Test',
                ]),
                'photo' => 'edz-norton-s2UUKPH90b0-unsplash.jpg',
            ],
            [
                'category_id' => 1,
                'level_id' => 2,
                'title' => json_encode([
                    'fr' => 'Stylisme modélisme B',
                    'en' => 'Fashion design B',
                ]),
                'description' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'body' => json_encode([
                    'fr' => 'Test',
                    'en' => 'Test',
                ]),
                'photo' => 'patricia-serna-zPZ9vqqDNBA-unsplash.jpg',
            ],
            [
                'category_id' => 4,
                'level_id' => 2,
                'title' => json_encode([
                    'fr' => 'Coiffure B',
                    'en' => 'Hairdressing B',
                ]),
                'description' => json_encode([
                    'fr' => "Venez vivre votre passion et apprendre avec de véritables professionnels du métier. Nous vous accompagnerons depuis le plus modeste niveau jusqu'à l'implémentation d'un projet concret et votre insertion professionnelle.",
                    'en' => 'Come and live your passion. Learn with experienced workers of the domain. We will bring you from the very bottom to a real project and help you enter professional world.',
                ]),
                'body' => json_encode([
                    'fr' => 'Test',
                    'en' => 'Test',
                ]),
                'photo' => 'shari-sirotnak-oM5YoMhTf8E-unsplash.jpg',
            ],
        ];

        foreach ($items as $item) {
            Training::create($item);
        }
    }
}
