<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\SocialLink;
use App\Services\PortfolioDataService;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(private readonly PortfolioDataService $portfolioData) {}

    /**
     * Display a specific project detail page by slug.
     */
    public function show(string $slug): Response
    {
        $project = Project::query()
            ->where('slug', $slug)
            ->active()
            ->with([
                'skills' => fn ($q) => $q->orderBy('project_skill.sort_order'),
                'media',
            ])
            ->firstOrFail();

        $socialLinks = SocialLink::query()
            ->active()
            ->get()
            ->map(fn ($l) => [
                'id' => $l->id,
                'platform' => $l->platform,
                'label' => $l->label,
                'url' => $l->url,
                'icon' => $l->icon,
            ]);

        return Inertia::render('Project/Show', [
            'project' => [
                'id' => $project->id,
                'slug' => $project->slug,
                'title' => $project->title,
                'short_description' => $project->short_description,
                'description' => $project->description,
                'role' => $project->role,
                'challenge' => $project->challenge,
                'solution' => $project->solution,
                'impact' => $project->impact,
                'thumbnail' => $project->thumbnail ? '/storage/'.ltrim($project->thumbnail, '/') : null,
                'github_url' => $project->github_url,
                'demo_url' => $project->demo_url,
                'status' => $project->status,
                'start_date' => $project->start_date?->format('F Y'),
                'end_date' => $project->end_date?->format('F Y'),
                'skills' => $project->skills->map(fn ($s) => [
                    'id' => $s->id,
                    'name' => $s->name,
                    'category' => $s->category,
                    'icon' => $s->icon,
                ]),
                'media' => $project->media->map(fn ($media) => [
                    'id' => $media->id,
                    'url' => '/storage/'.ltrim($media->file_path, '/'),
                    'type' => $media->media_type,
                    'alt_text' => $media->alt_text,
                    'caption' => $media->caption,
                    'sort_order' => $media->sort_order,
                ]),
            ],
            'branding' => $this->portfolioData->branding(),
            'social_links' => $socialLinks,
        ]);
    }
}
