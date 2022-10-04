<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    private $rules = [
        'src' => 'required|image',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $images = [];
        $filteredData = Image::orderBy('id');

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('images.src', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $image) {
            $images[] = $image->toArray();
        }

        return [
            'images' => $images,
            'total' => $total,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $images = $data['images'];
        $total = $data['total'];

        return response()->json([
            'images' => $images,
            'total' => $total,
        ]);
    }

    public function show($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $image = Image::find($id);
        if (!$image) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['images']['not_found'], 'danger'),
        ]);

        return response()->json([
            'image' => $image,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $request->validate(array_merge($this->rules, [
            'src' => 'required|string|unique:images',
        ]));

        if ($file = $request->file('src')) {
            $fileName = UtilController::resize($file, 'images');
            $input['src'] = '/images/images/' . htmlspecialchars($fileName);
        }

        $input = $request->except(['src']);

        Image::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['images']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $image = Image::find($id);
        if (!$image) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['images']['not_found'], 'danger'),
        ]);

        $rules = UtilController::rules($this->rules, $image);
        $request->validate($rules);

        $input = $request->except(['src']);

        if ($file = $request->file('src')) {
            $fileName = UtilController::resize($file, 'images');
            $input['src'] = '/images/images/' . htmlspecialchars($fileName);
        }

        $image->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['images']['updated'], 'success'),
            'image' => $image,
        ]);
    }

    public function destroy($type, $id)
    {
        $cms = UtilController::cms();
        $manager = UtilController::get(request());

        $image = Image::find($id);
        if (!$image) return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['images']['not_found'], 'danger'),
        ]);

        $image->delete();

        $data = $this->data();

        $images = $data['images'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$manager->language->abbr]['backend']['messages']['images']['deleted'], 'success'),
            'images' => $images,
            'total' => $total,
        ]);
    }
}
