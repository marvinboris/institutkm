<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\TrainingLevel;
use Illuminate\Http\Request;

class TrainingLevelController extends Controller
{
    private $rules = [
        'name' => 'required|string',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $training_levels = [];
        $filteredData = TrainingLevel::orderBy('id');

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('training_levels.name', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $training_level) {
            $training_levels[] = $training_level->toArray();
        }

        return [
            'training_levels' => $training_levels,
            'total' => $total,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $training_levels = $data['training_levels'];
        $total = $data['total'];

        return response()->json([
            'training_levels' => $training_levels,
            'total' => $total,
        ]);
    }

    public function show($type, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $training_level = TrainingLevel::find($id);
        if (!$training_level) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['training_levels']['not_found'], 'danger'),
        ]);

        return response()->json([
            'training_level' => $training_level,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate(array_merge($this->rules, [
            'name' => 'required|string|unique:training_levels',
        ]));

        $input = $request->all();

        TrainingLevel::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['training_levels']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $type, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $training_level = TrainingLevel::find($id);
        if (!$training_level) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['training_levels']['not_found'], 'danger'),
        ]);

        $rules = UtilController::rules($this->rules, $training_level);
        $request->validate($rules);

        $input = $request->all();

        $training_level->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['training_levels']['updated'], 'success'),
            'training_level' => $training_level,
        ]);
    }

    public function destroy($type, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $training_level = TrainingLevel::find($id);
        if (!$training_level) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['training_levels']['not_found'], 'danger'),
        ]);

        $training_level->delete();

        $data = $this->data();

        $training_levels = $data['training_levels'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['backend']['messages']['training_levels']['deleted'], 'success'),
            'training_levels' => $training_levels,
            'total' => $total,
        ]);
    }
}
