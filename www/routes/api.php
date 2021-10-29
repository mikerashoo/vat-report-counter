<?php

use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ItemController;
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
    Route::get('/', [ItemController::class, 'items']);
    Route::get('detail/{id}', [ItemController::class, 'categoryDetail']);
    Route::post('save', [ItemController::class, 'save']);
    Route::post('update', [ItemController::class, 'update']);
    Route::delete('delete/{id}', [ItemController::class, 'delete']);
    Route::get('/last_report', [ItemController::class, 'getLastReport']);
    Route::get('/items_from_last_report', [ItemController::class, 'itemsFromLastReport']);
    Route::get('/last_starting_date', [ItemController::class, 'getStartingDateFromLastReport']);
    Route::post('/transaction', [ItemController::class, 'saveTransaction']);
});

Route::group(['prefix' => 'reports'], function() {
    Route::get('/', [ReportController::class, 'getAll']);
    Route::get('/{id}', [ReportController::class, 'reportDetail']);
    Route::post('/save', [ReportController::class, 'save']);
});
