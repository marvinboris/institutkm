<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            LanguageSeeder::class,
            RoleSeeder::class,
            FeatureSeeder::class,
            AdminSeeder::class,
            UserSeeder::class,
            SubjectSeeder::class,
            PublicationCategorySeeder::class,
            PublicationSeeder::class,
            BannerPublicationSeeder::class,
            TrainingCategorySeeder::class,
            TrainingLevelSeeder::class,
            TrainingSeeder::class,
            TestimonySeeder::class,
            ImageSeeder::class,
        ]);
    }
}
