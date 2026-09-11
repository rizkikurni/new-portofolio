<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Project;
use App\Services\SeoService;
use Illuminate\Http\Response;

class SeoController extends Controller
{
    public function sitemap(SeoService $seo): Response
    {
        $profiles = Profile::active()->orderBy('id')->get(['id', 'slug', 'is_default']);
        $primary = $profiles->firstWhere('is_default', true) ?? $profiles->first();
        $urls = $primary ? [$seo->url()] : [];

        foreach ($profiles as $profile) {
            if ($profile->id !== $primary?->id) {
                $urls[] = $seo->url('profile/'.rawurlencode($profile->slug));
            }
        }

        // Detail pages require default branding, so only list them when a profile exists.
        if ($primary) {
            foreach (Project::active()->orderBy('id')->pluck('slug') as $slug) {
                $urls[] = $seo->url('projects/'.rawurlencode($slug));
            }
        }

        return response()->view('seo.sitemap', compact('urls'))
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    public function robots(): Response
    {
        // Allow crawling so Google can see the noindex headers on private endpoints.
        // Keep the sitemap address fixed while investigating Search Console fetch errors.
        return response("User-agent: *\nAllow: /\n\nSitemap: https://rizkikurni.my.id/sitemap.xml\n")
            ->header('Content-Type', 'text/plain; charset=UTF-8');
    }
}
