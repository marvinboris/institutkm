<?php

namespace App\Http\Controllers;

use App\Models\BannerPublication;
use App\Models\Experience;
use App\Models\Image;
use App\Models\Project;
use App\Models\Publication;
use App\Models\PublicationCategory;
use App\Models\Testimony;
use App\Models\Training;
use App\Models\TrainingCategory;
use App\Models\User;
use App\Notifications\ContactNotification;
use App\Notifications\Preregistration;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class FrontendController extends Controller
{
    public function home()
    {
        $trainings = [];
        foreach (Training::orderBy('id')->whereIsActive(1)->take(4)->get() as $training) {
            $trainings[] = array_merge($training->toArray(), [
                'category' => $training->category,
                'level' => $training->level,
            ]);
        }

        $gallery = Image::orderBy('id', 'DESC')->take(12)->get();

        $testimonies = Testimony::orderBy('id', 'DESC')->whereIsActive(1)->take(5)->get();

        $publications = [];
        foreach (Publication::orderBy('id', 'DESC')->whereIsActive(1)->take(4)->get() as $publication) {
            $publications[] = array_merge($publication->toArray(), [
                'subjects' => $publication->subjects,
                'author' => $publication->author->name,
                'category' => $publication->category->name,
            ]);
        }

        $banner_publications = [];
        foreach (BannerPublication::get() as $banner_publication) {
            $publication = array_merge($banner_publication->publication->toArray(), [
                'subjects' => $banner_publication->publication->subjects,
                'author' => $banner_publication->publication->author->name,
                'category' => $banner_publication->publication->category->name,
            ]);

            $banner_publications[] = $publication;
        }

        $training_categories = TrainingCategory::get();

        return response()->json([
            'gallery' => $gallery,
            'trainings' => $trainings,
            'testimonies' => $testimonies,
            'publications' => $publications,
            'banner_publications' => $banner_publications,
            'training_categories' => $training_categories,
        ]);
    }

    public function about()
    {
        return response()->json([]);
    }

    public function gallery()
    {
        $gallery = Image::orderBy('id', 'DESC')->get();

        return response()->json([
            'gallery' => $gallery,
        ]);
    }

    public function publications($category = null)
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $cms = UtilController::cms();

        $publications = [];
        $filteredData = Publication::orderBy('id')->where('publication_categories.is_active', 1);
        if ($category) {
            $category = PublicationCategory::whereSlug($category)->first();
            if (!$category) return response()->json([
                'message' => UtilController::message($cms['pages'][request()->lang]['frontend']['messages']['publication_categories']['not_found'], 'danger'),
            ]);

            $filteredData = $category->publications()->orderBy('id')->where('publications.is_active', 1);
        }

        $filteredData = $filteredData
            ->join('users', function ($join) {
                $join->on('users.id', 'publications.author_id');
                $join->where('publications.author_type', '=', User::class);
            })
            ->join('publication_categories', 'publication_categories.id', '=', 'publications.category_id')
            ->select('publications.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('publications.title', 'LIKE', "%$search%")
                        ->orWhere('publications.description', 'LIKE', "%$search%")
                        ->orWhere('publications.body', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%")
                        ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('publications.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $publication) {
            $publications[] = array_merge($publication->toArray(), [
                'author' => $publication->author->name,
            ]);
        }

        $publication_ids = array_map(function ($publication) {
            return $publication['id'];
        }, $publications);

        $recent_posts = Publication::orderBy('id', 'DESC')->where('id', 'NOT IN', $publication_ids)->whereIsActive(1)->take(5)->get();

        return response()->json([
            'publications' => $publications,
            'recent_posts' => $recent_posts,
        ]);
    }

    public function publication($category, $slug)
    {
        $cms = UtilController::cms();

        $category = PublicationCategory::whereSlug($category)->where('publication_categories.is_active', 1)->first();
        if (!$category) return response()->json([
            'message' => UtilController::message($cms['pages'][request()->lang]['frontend']['messages']['publication_categories']['not_found'], 'danger'),
        ]);

        $publication = $category->publications()->where('publications.is_active', 1)->whereSlug($slug)->first();
        if (!$publication) return response()->json([
            'message' => UtilController::message($cms['pages'][request()->lang]['frontend']['messages']['publications']['not_found'], 'danger'),
        ]);

        $recent_posts = Publication::orderBy('id', 'DESC')->where('publications.id', '!=', $publication->id)->take(5)->get();

        $publication = array_merge($publication->toArray(), [
            'author' => $publication->author->name,
            'category' => $publication->category->name,
            'subjects' => $publication->subjects,
        ]);

        return response()->json([
            'publication' => $publication,
            'recent_posts' => $recent_posts,
        ]);
    }

    public function trainings($category = null)
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';


        $trainings = [];
        $filteredData = Training::orderBy('id');
        if ($category) {
            $category = TrainingCategory::whereSlug($category)->first();
            if (!$category) {
                $cms = UtilController::cms();

                return response()->json([
                    'message' => UtilController::message($cms['pages'][request()->lang]['frontend']['messages']['training_categories']['not_found'], 'danger'),
                ]);
            }

            $filteredData = $category->trainings()->orderBy('id');
        }

        $filteredData = $filteredData
            ->join('training_categories', 'training_categories.id', '=', 'trainings.category_id')
            ->select('trainings.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('trainings.title', 'LIKE', "%$search%")
                        ->orWhere('trainings.description', 'LIKE', "%$search%")
                        // ->orWhere('trainings.body', 'LIKE', "%$search%")
                        ->orWhere('trainings.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $training) {
            $trainings[] = array_merge($training->toArray(), [
                'level' => $training->level,
                'category' => $training->category,
            ]);
        }

        return response()->json([
            'category' => $category,
            'trainings' => $trainings,
        ]);
    }

    public function training($category, $slug)
    {
        $cms = UtilController::cms();

        $category = TrainingCategory::whereSlug($category)->first();
        if (!$category) return response()->json([
            'message' => UtilController::message($cms['pages'][request()->lang]['frontend']['messages']['training_categories']['not_found'], 'danger'),
        ]);

        $training = $category->trainings()->whereSlug($slug)->first();
        if (!$training) return response()->json([
            'message' => UtilController::message($cms['pages'][request()->lang]['frontend']['messages']['trainings']['not_found'], 'danger'),
        ]);

        $training = array_merge($training->toArray(), [
            'level' => $training->level,
            'category' => $training->category,
        ]);

        return response()->json([
            'training' => $training,
        ]);
    }

    public function preregistration(Request $request)
    {
        $request->validate([
            'first_name' => 'nullable|string',
            'last_name' => 'required|string',
            'birthdate' => 'required|date',
            'gender' => 'required|in:male,female',
            'address' => 'nullable|string',
            'phone' => 'required|string',
            'country' => 'required|string',
            'city' => 'required|string',
            'level' => 'nullable|string',
            'activity' => 'nullable|string',
            'training' => 'required|exists:trainings,id',
        ]);

        $lang = env('MIX_DEFAULT_LANG', 'fr');
        $training = Training::find($request->training);

        Notification::send(User::whereEmail('jaris.ultio.21@gmail.com')->first(), new Preregistration($request->except('training') + [
            'training' => array_merge($training->toArray(), [
                'title' => $training->title[$lang],
                'category' => $training->category->name[$lang],
                'level' => $training->level->name[$lang],
            ]),
        ]));

        $cms = UtilController::cms();

        return response()->json([
            'message' => UtilController::message($cms['pages'][$request->frontend_lang]['frontend']['messages']['preregistration']['success'], 'success'),
        ]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string',
            'email' => 'nullable|email',
            'subject' => 'nullable|string',
            'message' => 'required|string',
        ]);

        Notification::send(User::whereEmail('jaris.ultio.21@gmail.com')->first(), new ContactNotification($request->all()));

        $cms = UtilController::cms();

        return response()->json([
            'message' => UtilController::message($cms['pages'][$request->frontend_lang]['frontend']['messages']['contact']['success'], 'success'),
        ]);
    }
}
