<?php

namespace App\Http\Controllers;

use App\Services\PortfolioDataService;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(private readonly PortfolioDataService $portfolioData) {}

    /**
     * Display the homepage using the cached default profile payload.
     */
    public function home(): Response
    {
        return Inertia::render('Profile/Show', $this->portfolioData->home());
    }

    /**
     * Display a cached public profile by slug.
     */
    public function show(string $slug): Response
    {
        return Inertia::render('Profile/Show', $this->portfolioData->profile($slug));
    }
}
