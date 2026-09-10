<?php

namespace App\Http\Controllers;

use App\Services\PortfolioDataService;
use App\Services\SeoService;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(
        private readonly PortfolioDataService $portfolioData,
        private readonly SeoService $seo,
    ) {}

    /**
     * Display the homepage using the cached default profile payload.
     */
    public function home(): Response
    {
        $data = $this->portfolioData->home();

        return Inertia::render('Profile/Show', [...$data, 'seo' => $this->seo->profile($data, true)]);
    }

    /**
     * Display a cached public profile by slug.
     */
    public function show(string $slug): Response
    {
        $data = $this->portfolioData->profile($slug);
        $isHome = $data['profile']['id'] === $this->portfolioData->home()['profile']['id'];

        return Inertia::render('Profile/Show', [...$data, 'seo' => $this->seo->profile($data, $isHome)]);
    }
}
