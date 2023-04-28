<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [TaskController::class, 'index']);
Route::post('/create', [TaskController::class, 'store']);
Route::post('/edit/{id}', [TaskController::class, 'edit']);
Route::delete('/delete/{task}', [TaskController::class, 'destroy']);
Route::post('/mark-as-completed/{task}', [TaskController::class, 'markAsCompleted']);
Route::post('/mark-as-uncompleted/{task}', [TaskController::class, 'markAsUncompleted']);
Route::get('/form', function () {
    return view('tasks.create');
});
