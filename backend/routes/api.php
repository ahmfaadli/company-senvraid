<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\NewsController;

Route::apiResource('portfolios', PortfolioController::class);
Route::apiResource('news', NewsController::class);