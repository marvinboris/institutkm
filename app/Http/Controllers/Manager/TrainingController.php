<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Training;
use App\Models\TrainingCategory;
use App\Models\Subscriber;
use App\Models\TrainingLevel;
use App\Notifications\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TrainingController extends Controller
{
    private $rules = [
        'category_id' => 'required|exists:training_categories,id',
        'level_id' => 'required|exists:training_levels,id',
        'title' => 'array|required',
        'description' => 'array|required',
        'body' => 'array|required',
        'photo' => 'nullable|image',
        'is_active' => 'required|integer',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $trainings = [];
        $filteredData = Training::orderBy('id');

        $filteredData = $filteredData
            ->join('training_categories', 'training_categories.id', '=', 'trainings.category_id')
            ->join('training_levels', 'training_levels.id', '=', 'trainings.level_id')
            ->select('trainings.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('trainings.title', 'LIKE', "%$search%")
                        ->orWhere('trainings.description', 'LIKE', "%$search%")
                        ->orWhere('trainings.body', 'LIKE', "%$search%")
                        // ->orWhere('email', 'LIKE', "%$search%")
                        // ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('trainings.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $training) {
            $trainings[] = array_merge($training->toArray(), [
                'category' => $training->category->name,
                'level' => $training->level->name,
            ]);
        }

        return [
            'trainings' => $trainings,
            'total' => $total,
        ];
    }

    private function information()
    {
        $categories = TrainingCategory::all();
        $levels = TrainingLevel::all();

        return [
            'categories' => $categories,
            'levels' => $levels,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $trainings = $data['trainings'];
        $total = $data['total'];

        return response()->json([
            'trainings' => $trainings,
            'total' => $total,
        ]);
    }

    public function info()
    {
        $information = $this->information();

        return response()->json($information);
    }

    public function show($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $training = Training::find($id);
        if (!$training) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['trainings']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'training' => $training,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo', 'title', 'description', 'body']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'trainings');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $manager->trainings()->create($input + [
            'title' => json_encode($request->title),
            'description' => json_encode($request->description),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['trainings']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $training = Training::find($id);
        if (!$training) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['trainings']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo', 'title', 'description', 'body']);

        if ($file = $request->file('photo')) {
            if ($training->photo && is_file(public_path($training->photo))) unlink(public_path($training->photo));
            $fileName = UtilController::resize($file, 'trainings');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $training->update($input + [
            'title' => json_encode($request->title),
            'description' => json_encode($request->description),
            'body' => json_encode($request->body),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['trainings']['updated'], 'success'),
            'training' => $training,
        ]);
    }

    public function destroy($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $training = Training::find($id);
        if (!$training) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['trainings']['not_found'], 'danger'),
        ]);

        if ($training->photo && is_file(public_path($training->photo))) unlink(public_path($training->photo));
        $training->delete();

        $data = $this->data();

        $trainings = $data['trainings'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['trainings']['deleted'], 'success'),
            'trainings' => $trainings,
            'total' => $total,
        ]);
    }
}
