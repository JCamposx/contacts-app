<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Auth\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('oauth')->controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:api')->group(function () {
    Route::get('contacts/latest', [ContactController::class, 'indexLatest'])
        ->name('contacts.index');

    Route::resource('contacts', ContactController::class)
        ->except(['create', 'edit']);

    Route::post('oauth/logout', [AuthController::class, 'logout']);
});
