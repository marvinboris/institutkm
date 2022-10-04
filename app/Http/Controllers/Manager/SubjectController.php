<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    private $rules = [
        'name' => 'array|required',
        'color' => 'required',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $subjects = [];
        $filteredData = Subject::orderBy('id');

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('name', 'LIKE', "%$search%")
                        ->orWhere('color', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $subject) {
            $subjects[] = $subject->toArray();
        }

        return [
            'subjects' => $subjects,
            'total' => $total,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $subjects = $data['subjects'];
        $total = $data['total'];

        return response()->json([
            'subjects' => $subjects,
            'total' => $total,
        ]);
    }

    public function show($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $subject = Subject::find($id);
        if (!$subject) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['subjects']['not_found'], 'danger'),
        ]);

        return response()->json([
            'subject' => $subject,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except(['name']);

        Subject::create($input + [
            'name' => json_encode($request->name),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['subjects']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $subject = Subject::find($id);
        if (!$subject) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['subjects']['not_found'], 'danger'),
        ]);

        $rules = UtilController::rules($this->rules, $subject);
        $request->validate($rules);

        $input = $request->except(['name']);

        $subject->update($input + [
            'name' => json_encode($request->name),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['subjects']['updated'], 'success'),
            'subject' => $subject,
        ]);
    }

    public function destroy($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $subject = Subject::find($id);
        if (!$subject) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['subjects']['not_found'], 'danger'),
        ]);

        $subject->delete();

        $data = $this->data();

        $subjects = $data['subjects'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['subjects']['deleted'], 'success'),
            'subjects' => $subjects,
            'total' => $total,
        ]);
    }
}
