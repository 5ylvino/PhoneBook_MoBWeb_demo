<?php

use App\Http\Controllers\UserController;
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

Route::post('login', [UserController::class, "loginStore"]);
Route::post('register', [UserController::class, "registerStore"]);

Route::middleware(["auth:sanctum"])->group(function (){
    Route::post('update', [UserController::class, "update"]);
}); 

Route::get('users', [UserController::class, "fetchUsers"]);
Route::post('logout', [UserController::class, "logout"]);
Route::post('search', [UserController::class, "dashboardSearch"]);
