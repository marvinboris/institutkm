<?php

use App\Http\Controllers\UtilController;
use App\Models\Image;
use App\Models\Language;
use App\Models\TrainingCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('User')->prefix('user')->name('user.')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('forgot', 'AuthController@forgot')->name('forgot');
    Route::post('reset/{id}/{code}', 'AuthController@reset')->name('reset');
});

Route::middleware('auth:admin,api')->group(function () {
    Route::get('logout', 'UtilController@logout')->name('logout');
    Route::get('account', 'UtilController@account')->name('account');



    Route::prefix('content')->name('content.')->group(function () {
        Route::get('language/{language}', function ($id) {
            $manager = UtilController::get(request());
            $cmsFile = UtilController::cms();

            $language = Language::find($id);
            if (!$language) return response()->json([
                'message' => UtilController::message($cmsFile['pages'][$manager->language->abbr]['backend']['messages']['languages']['not_found'], 'danger')
            ]);

            $manager->update([
                'language_id' => $id
            ]);

            $cms = [
                'global' => $cmsFile['global'],
                'pages' => $cmsFile['pages'][$language->abbr],
            ];
            if (request()->has('frontend_lang')) $cms['pages']['frontend'] = $cmsFile['pages'][request()->frontend_lang]['frontend'];

            return response()->json([
                'language' => $language->toArray(),
                'cms' => $cms,
            ]);
        })->name('language');
    });


    
    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('{notification}', 'UtilController@notification')->name('show');
        Route::get('', 'UtilController@notifications')->name('index');
    });
    
    Route::name('export.')->prefix('export')->group(function () {
        Route::name('xlsx')->post('xlsx', 'ExportController@xlsx');
        Route::name('csv')->post('csv', 'ExportController@csv');
        Route::name('pdf')->post('pdf', 'ExportController@pdf');
    });
    
    Route::middleware('permission')->name('manager')->namespace('Manager')->prefix('{manager}')->group(function () {
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');
        
        Route::name('cms.')->prefix('cms')->namespace('CMS')->group(function () {
            Route::patch('global', 'GlobalController@patch')->name('global');
            Route::patch('general', 'GeneralController@patch')->name('general');
            Route::patch('frontend', 'FrontendController@patch')->name('frontend');
            Route::patch('backend', 'BackendController@patch')->name('backend');
            Route::patch('auth', 'AuthController@patch')->name('auth');

            Route::name('index')->get('', function () {
                $jsonString = file_get_contents(base_path('cms.json'));
                $exampleJsonString = file_get_contents(base_path('cms.example.json'));
                $cms = json_decode($jsonString, true);
                $cmsExample = json_decode($exampleJsonString, true);

                return response()->json([
                    'cms' => $cms,
                    'cmsExample' => $cmsExample,
                    'languages' => Language::all(),
                    'test' => [
                        'value' => json_encode($cms['pages']['fr']['frontend']['components']),
                        'example' => json_encode($cmsExample['pages']['fr']['frontend']['components']),
                    ]
                ]);
            });
        });

        Route::prefix('features')->name('features.')->group(function () {
            Route::get('{feature}', 'FeatureController@show')->name('show');
        });

        Route::prefix('languages')->name('languages.')->group(function () {
            Route::get('{language}', 'LanguageController@show')->name('show');
        });

        Route::prefix('roles')->name('roles.')->group(function () {
            Route::get('info', 'RoleController@info')->name('info');
            Route::get('{role}', 'RoleController@show')->name('show');
        });

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('info', 'UserController@info')->name('info');
            Route::get('{user}', 'UserController@show')->name('show');
        });



        Route::prefix('subjects')->name('subjects.')->group(function () {
            Route::get('{subject}', 'SubjectController@show')->name('show');
        });

        Route::prefix('publication-categories')->name('publication_categories.')->group(function () {
            Route::get('{publication_category}', 'PublicationCategoryController@show')->name('show');
        });

        Route::prefix('publications')->name('publications.')->group(function () {
            Route::get('info', 'PublicationController@info')->name('info');
            Route::get('{publication}', 'PublicationController@show')->name('show');
        });

        Route::prefix('training-categories')->name('training_categories.')->group(function () {
            Route::get('info', 'TrainingCategoryController@info')->name('info');
            Route::get('{training_category}', 'TrainingCategoryController@show')->name('show');
        });

        Route::prefix('training-levels')->name('training_levels.')->group(function () {
            Route::get('{training_level}', 'TrainingLevelController@show')->name('show');
        });

        Route::prefix('trainings')->name('trainings.')->group(function () {
            Route::get('info', 'TrainingController@info')->name('info');
            Route::get('{training}', 'TrainingController@show')->name('show');
        });

        Route::prefix('testiminonies')->name('testiminonies.')->group(function () {
            Route::get('{testiminony}', 'TestimonyController@show')->name('show');
        });

        Route::prefix('images')->name('images.')->group(function () {
            Route::get('{image}', 'ImageController@show')->name('show');
        });



        Route::apiResources([
            'users' => 'UserController',
            'roles' => 'RoleController',
            'features' => 'FeatureController',
            'languages' => 'LanguageController',

            'subjects' => 'SubjectController',
            'publication-categories' => 'PublicationCategoryController',
            'publications' => 'PublicationController',
            'training-categories' => 'TrainingCategoryController',
            'training-levels' => 'TrainingLevelController',
            'trainings' => 'TrainingController',
            'testimonies' => 'TestimonyController',
            'images' => 'ImageController',
        ]);
    });
});

Route::prefix('content')->name('content.')->group(function () {
    Route::get('{language}', function ($lang) {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cmsFile = json_decode($jsonString, true);

        $abbr = $lang;
        if (Language::whereAbbr($lang)->count() === 0) $abbr = env('MIX_DEFAULT_LANG', 'en');

        $cms = [
            'global' => $cmsFile['global'],
            'pages' => $cmsFile['pages'][$abbr],
        ];
        if (request()->has('frontend_lang')) $cms['pages']['frontend'] = $cmsFile['pages'][request()->frontend_lang]['frontend'];
        
        $languages = Language::all();
        $trainings = TrainingCategory::all();
        $gallery_image = Image::orderBy('id', 'DESC')->first()->src;

        return response()->json([
            'cms' => $cms,
            'languages' => $languages,
            'trainings' => $trainings,
            'gallery_image' => $gallery_image,
        ]);
    })->name('cms');
});

Route::name('frontend.')->group(function () {
    Route::prefix('trainings/{category?}')->name('trainings.')->group(function () {
        Route::get('{training}', 'FrontendController@training')->name('show');
        Route::get('', 'FrontendController@trainings')->name('index');
    });

    Route::prefix('publications/{category?}')->name('publications.')->group(function () {
        Route::get('{publication}', 'FrontendController@publication')->name('show');
        Route::get('', 'FrontendController@publications')->name('index');
    });

    Route::post('contact', 'FrontendController@contact')->name('contact');
    Route::post('preregistration', 'FrontendController@preregistration')->name('preregistration');
    Route::get('gallery', 'FrontendController@gallery')->name('gallery');
    Route::get('about', 'FrontendController@about')->name('about');
    Route::get('home', 'FrontendController@home')->name('home');
});
