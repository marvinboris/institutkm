<?php

namespace Database\Seeders;

use App\Models\BannerPublication;
use App\Models\Publication;
use Illuminate\Database\Seeder;

class BannerPublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = Publication::get();

        foreach ($items as $item) {
            BannerPublication::create([
                'publication_id' => $item->id,
            ]);
        }
    }
}
