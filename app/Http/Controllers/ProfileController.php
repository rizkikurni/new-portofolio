<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Profile;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the homepage (default active profile).
     */
    public function home(): Response
    {
        $profile = Profile::query()
            ->active()
            ->default()
            ->first() ?? Profile::query()->active()->firstOrFail();

        return $this->renderProfile($profile);
    }

    /**
     * Display a specific profile by slug.
     */
    public function show(string $slug): Response
    {
        $profile = Profile::query()
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        return $this->renderProfile($profile);
    }

    /**
     * Prepare eager-loaded data and render Inertia Profile/Show page.
     */
    private function renderProfile(Profile $profile): Response
    {
        // 1. Eager load sections (enabled only, ordered)
        $sections = $profile->sections()
            ->where('is_enabled', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($s) => [
                'key'        => $s->section_key,
                'sort_order' => $s->sort_order,
            ]);

        // 2. Load projects with their skills & pivot data
        $projects = $profile->projects()
            ->where('is_active', true)
            ->with(['skills' => fn ($q) => $q->orderBy('project_skill.sort_order')])
            ->get()
            ->map(fn ($p) => [
                'id'                => $p->id,
                'slug'              => $p->slug,
                'title'             => $p->title,
                'short_description' => $p->short_description,
                'description'       => $p->description,
                'role'              => $p->role,
                'challenge'         => $p->challenge,
                'solution'          => $p->solution,
                'impact'            => $p->impact,
                'thumbnail'         => $p->thumbnail ? asset('storage/' . $p->thumbnail) : null,
                'github_url'        => $p->github_url,
                'demo_url'          => $p->demo_url,
                'status'            => $p->status,
                'start_date'        => $p->start_date?->format('Y-m'),
                'end_date'          => $p->end_date?->format('Y-m'),
                'is_featured'       => (bool) $p->pivot->is_featured,
                'sort_order'        => (int) $p->pivot->sort_order,
                'skills'            => $p->skills->map(fn ($s) => [
                    'id'       => $s->id,
                    'name'     => $s->name,
                    'category' => $s->category,
                    'icon'     => $s->icon,
                ]),
            ]);

        // 3. Load skills with pivot data, grouped by category
        $skills = $profile->skills()
            ->get()
            ->map(fn ($s) => [
                'id'          => $s->id,
                'name'        => $s->name,
                'category'    => $s->category,
                'icon'        => $s->icon,
                'description' => $s->description,
                'is_featured' => (bool) $s->pivot->is_featured,
                'sort_order'  => (int) $s->pivot->sort_order,
            ]);

        // Group skills by category while preserving category structure
        $skillsByCategory = $skills->groupBy('category');

        // 4. Load experiences with pivot ordering
        $experiences = $profile->experiences()
            ->get()
            ->map(fn ($e) => [
                'id'          => $e->id,
                'company'     => $e->company,
                'position'    => $e->position,
                'description' => $e->description,
                'start_date'  => $e->start_date?->format('M Y'),
                'end_date'    => $e->is_current ? 'Present' : $e->end_date?->format('M Y'),
                'is_current'  => $e->is_current,
                'company_url' => $e->company_url,
                'sort_order'  => (int) $e->pivot->sort_order,
            ]);

        // 5. Global educations
        $educations = Education::query()
            ->orderBy('start_date', 'desc')
            ->get()
            ->map(fn ($e) => [
                'id'          => $e->id,
                'institution' => $e->institution,
                'degree'      => $e->degree,
                'field'       => $e->field,
                'description' => $e->description,
                'date_range'  => $e->date_range,
            ]);

        // 6. Global certifications
        $certifications = Certification::query()
            ->orderBy('issue_date', 'desc')
            ->get()
            ->map(fn ($c) => [
                'id'             => $c->id,
                'name'           => $c->name,
                'issuer'         => $c->issuer,
                'issue_date'     => $c->issue_date?->format('M Y'),
                'expiration_date'=> $c->expiration_date?->format('M Y'),
                'credential_id'  => $c->credential_id,
                'credential_url' => $c->credential_url,
                'image'          => $c->image ? asset('storage/' . $c->image) : null,
            ]);

        // 7. Global social links
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

        return Inertia::render('Profile/Show', [
            'profile' => [
                'id'               => $profile->id,
                'slug'             => $profile->slug,
                'name'             => $profile->name,
                'title'            => $profile->title,
                'tagline'          => $profile->tagline,
                'about'            => $profile->about,
                'location'         => $profile->location,
                'email'            => $profile->email,
                'phone'            => $profile->phone,
                'avatar'           => $profile->avatar ? asset('storage/' . $profile->avatar) : null,
                'resume_url'       => $profile->resume_path ? asset('storage/' . $profile->resume_path) : null,
                'resume_label'     => $profile->resume_label ?: 'Download CV',
                'meta_title'       => $profile->meta_title ?? "{$profile->name} — {$profile->title}",
                'meta_description' => $profile->meta_description ?? $profile->tagline,
                'og_image'         => $profile->og_image ? asset('storage/' . $profile->og_image) : null,
                'is_default'       => $profile->is_default,
            ],
            'sections'           => $sections,
            'projects'           => $projects,
            'skills'             => $skills,
            'skills_by_category' => $skillsByCategory,
            'experiences'        => $experiences,
            'educations'         => $educations,
            'certifications'     => $certifications,
            'social_links'       => $socialLinks,
        ]);
    }
}
