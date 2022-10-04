<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\TrainingCategory;
use App\Models\Subject;
use App\Models\Technology;
use Illuminate\Http\Request;

class TrainingCategoryController extends Controller
{
    private $rules = [
        'photo' => 'nullable|string',
        'subject_id' => 'required|exists:subjects,id',
    ];



    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $training_categories = [];
        $filteredData = TrainingCategory::orderBy('id');

        $filteredData = $filteredData
            ->join('subjects', 'subjects.id', '=', 'training_categories.subject_id')
            ->select('training_categories.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('training_categories.title', 'LIKE', "%$search%")
                        ->orWhere('training_categories.description', 'LIKE', "%$search%")
                        ->orWhere('training_categories.github', 'LIKE', "%$search%")
                        ->orWhere('training_categories.link', 'LIKE', "%$search%")
                        // ->orWhere('subjects.company', 'LIKE', "%$search%")
                        ->orWhere('training_categories.date', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $training_category) {
            $training_categories[] = array_merge($training_category->toArray(), [
                'subject' => $training_category->subject->name,
            ]);
        }

        return [
            'training_categories' => $training_categories,
            'total' => $total,
        ];
    }

    private function information()
    {
        $subjects = Subject::all();

        return [
            'subjects' => $subjects,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $training_categories = $data['training_categories'];
        $total = $data['total'];

        return response()->json([
            'training_categories' => $training_categories,
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

        $training_category = TrainingCategory::find($id);
        if (!$training_category) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['training_categories']['not_found'], 'danger'),
        ]);

        $information = $this->information();

        return response()->json([
            'training_category' => $training_category,
        ] + $information);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['photo']);

        if ($file = $request->file('photo')) {
            $fileName = UtilController::resize($file, 'training-categories');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $training_category = TrainingCategory::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['training_categories']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $training_category = TrainingCategory::find($id);
        if (!$training_category) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['training_categories']['not_found'], 'danger'),
        ]);

        $rules = $this->rules;
        $request->validate($rules);

        $input = $request->except(['photo']);

        if ($file = $request->file('photo')) {
            if ($training_category->photo && is_file(public_path($training_category->photo))) unlink(public_path($training_category->photo));
            $fileName = UtilController::resize($file, 'training-categories');
            $input['photo'] = htmlspecialchars($fileName);
        }

        $training_category->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['training_categories']['updated'], 'success'),
            'training_category' => $training_category,
        ]);
    }

    public function destroy($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $training_category = TrainingCategory::find($id);
        if (!$training_category) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['training_categories']['not_found'], 'danger'),
        ]);

        if ($training_category->photo && is_file(public_path($training_category->photo))) unlink(public_path($training_category->photo));
        $training_category->delete();

        $data = $this->data();

        $training_categories = $data['training_categories'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['training_categories']['deleted'], 'success'),
            'training_categories' => $training_categories,
            'total' => $total,
        ]);
    }
}
