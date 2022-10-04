<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Experience;
use App\Models\Image;
use App\Models\Project;
use App\Models\Publication;
use App\Models\Skill;
use App\Models\Subject;
use App\Models\Technology;
use App\Models\Training;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $subjects = Subject::count();
        $trainings = Training::count();
        $publications = Publication::count();
        $images = Image::count();

        $generalReport = [
            'publications' => $publications,
        ];

        $names = $cms['pages'][$manager->language->abbr]['general']['months'];
        $totalPublications = [];
        for ($i = 0; $i < 12; $i++) {
            $totalPublications[] = Publication::whereYear('created_at', now()->year)->whereMonth('created_at', $i + 1)->count();
        }
        for ($i = 0; $i < count($names); $i++) {
            $generalReportTrackerData[] = [
                'name' => strtoupper($names[$i]),
                'Publications' => $totalPublications[$i],
            ];
        }

        return response()->json([
            'blocksData' => [
                'subjects' => $subjects,
                'trainings' => $trainings,
                'publications' => $publications,
                'images' => $images,
            ],
            'generalReport' => $generalReport,
            'generalReportTrackerData' => $generalReportTrackerData,
        ]);
    }
}
