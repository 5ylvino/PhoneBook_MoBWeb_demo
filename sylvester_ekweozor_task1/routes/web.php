<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [UserController::class, "loginIndex"])->name("login");
Route::post('auth-login-form', [UserController::class, "loginStore"]);

Route::get('register-form', [UserController::class, "registerIndex"]);
Route::post('store-register-form', [UserController::class, "registerStore"]);

Route::middleware(["web","prevent-back-history"])->group(function (){
    Route::post('logout', [UserController::class, "logout"]);
    Route::get('dashboard', [UserController::class, "dashboardIndex"])->name("dashboard");
    Route::post('search', [UserController::class, "dashboardSearch"]);
});