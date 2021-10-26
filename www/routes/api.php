<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/users', [App\Http\Controllers\Api\UserController::class, 'index']);

Route::group(['prefix' => 'items'], function () {
    Route::get('/', [App\Http\Controllers\Api\ItemController::class, 'items']);
    Route::get('detail/{id}', [App\Http\Controllers\Api\ItemController::class, 'categoryDetail']);
    Route::post('save', [App\Http\Controllers\Api\ItemController::class, 'save']);
    Route::post('update', [App\Http\Controllers\Api\ItemController::class, 'update']);
    Route::delete('delete/{id}', [App\Http\Controllers\Api\ItemController::class, 'delete']);
    Route::get('/last_report', [App\Http\Controllers\Api\ItemController::class, 'getLastReport']);
    Route::get('/items_from_last_report', [App\Http\Controllers\Api\ItemController::class, 'itemsFromLastReport']);
    Route::get('/last_starting_date', [App\Http\Controllers\Api\ItemController::class, 'getStartingDateFromLastReport']);
    Route::post('/transaction', [App\Http\Controllers\Api\ItemController::class, 'saveTransaction']);
});
