<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\PublicationCategory;
use Illuminate\Http\Request;

class PublicationCategoryController extends Controller
{
    private $rules = [
        'name' => 'array|required',
        'is_active' => 'required|integer',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $publication_categories = [];
        $filteredData = PublicationCategory::orderBy('id');

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('name', 'LIKE', "%$search%")
                        ->orWhere('slug', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $publication_category) {
            $publication_categories[] = $publication_category->toArray();
        }

        return [
            'publication_categories' => $publication_categories,
            'total' => $total,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $publication_categories = $data['publication_categories'];
        $total = $data['total'];

        return response()->json([
            'publication_categories' => $publication_categories,
            'total' => $total,
        ]);
    }

    public function show($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $publication_category = PublicationCategory::find($id);
        if (!$publication_category) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['publication_categories']['not_found'], 'danger'),
        ]);

        return response()->json([
            'publication_category' => $publication_category,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except('name');

        PublicationCategory::create($input + [
            'name' => json_encode($request->name),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['publication_categories']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $publication_category = PublicationCategory::find($id);
        if (!$publication_category) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['publication_categories']['not_found'], 'danger'),
        ]);

        $rules = UtilController::rules($this->rules, $publication_category);
        $request->validate($rules);

        $input = $request->except('name');

        $publication_category->update($input + [
            'name' => json_encode($request->name),
        ]);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['publication_categories']['updated'], 'success'),
            'publication_category' => $publication_category,
        ]);
    }

    public function destroy($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $publication_category = PublicationCategory::find($id);
        if (!$publication_category) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['publication_categories']['not_found'], 'danger'),
        ]);

        $publication_category->delete();

        $data = $this->data();

        $publication_categories = $data['publication_categories'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['publication_categories']['deleted'], 'success'),
            'publication_categories' => $publication_categories,
            'total' => $total,
        ]);
    }
}
