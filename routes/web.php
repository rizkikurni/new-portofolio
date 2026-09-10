<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SeoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Homepage — loads default active profile
Route::get('/', [ProfileController::class, 'home'])->name('home');

// Public profile by slug
Route::get('/profile/{slug}', [ProfileController::class, 'show'])->name('profile.show');

// Project detail page by slug
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('project.show');

Route::get('/sitemap.xml', [SeoController::class, 'sitemap'])->name('sitemap');
Route::get('/robots.txt', [SeoController::class, 'robots'])->name('robots');
