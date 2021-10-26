<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function create(Request $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->user_name = $request->user_name;
        $user->role = $request->role; 
        $user->password = Hash::make('amare1234');
        $id = $user->save();
        return User::find($id);
    }
}
