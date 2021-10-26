<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Unit;
class UnitController extends Controller
{
    public function index()
    {
        return Unit::all();
    }

    public function save(Request $request){ 
        $unit = new Unit;
        $unit->name = $request->unit;
        $unit->save();
        return Unit::find($unit->id);
    }

    public function delete($id)
    {
        return Unit::find($id)->delete();
    }
}
