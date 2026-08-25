<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\SocialLink;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a specific project detail page by slug.
     */
    public function show(string $slug): Response
    {
        $project = Project::query()
            ->where('slug', $slug)
            ->active()
            ->with(['skills' => fn ($q) => $q->orderBy('project_skill.sort_order')])
            ->firstOrFail();

        $socialLinks = SocialLink::query()
            ->active()
            ->get()
            ->map(fn ($l) => [
                'id'       => $l->id,
                'platform' => $l->platform,
                'label'    => $l->label,
                'url'      => $l->url,
                'icon'     => $l->icon,
            ]);

        return Inertia::render('Project/Show', [
            'project' => [
                'id'                => $project->id,
                'slug'              => $project->slug,
                'title'             => $project->title,
                'short_description' => $project->short_description,
                'description'       => $project->description,
                'thumbnail'         => $project->thumbnail ? asset('storage/' . $project->thumbnail) : null,
                'github_url'        => $project->github_url,
                'demo_url'          => $project->demo_url,
                'status'            => $project->status,
                'start_date'        => $project->start_date?->format('F Y'),
                'end_date'          => $project->end_date?->format('F Y'),
                'skills'            => $project->skills->map(fn ($s) => [
                    'id'       => $s->id,
                    'name'     => $s->name,
                    'category' => $s->category,
                    'icon'     => $s->icon,
                ]),
            ],
            'social_links' => $socialLinks,
        ]);
    }
}
