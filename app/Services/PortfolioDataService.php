<?php

namespace App\Services;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Profile;
use App\Models\SocialLink;
use Closure;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Str;

class PortfolioDataService
{
    private const CACHE_PREFIX = 'portfolio.data';

    private const VERSION_KEY = self::CACHE_PREFIX.'.version';

    public function home(): array
    {
        return $this->remember('home', function (): array {
            $profile = Profile::query()
                ->active()
                ->default()
                ->first() ?? Profile::query()->active()->firstOrFail();

            return $this->buildProfileData($profile);
        });
    }

    public function profile(string $slug): array
    {
        return $this->remember('profile.'.sha1($slug), function () use ($slug): array {
            $profile = Profile::query()
                ->where('slug', $slug)
                ->active()
                ->firstOrFail();

            return $this->buildProfileData($profile);
        });
    }

    public function branding(): array
    {
        return $this->remember('branding', function (): array {
            $profile = Profile::query()
                ->active()
                ->default()
                ->first() ?? Profile::query()->active()->firstOrFail();

            return [
                'name' => $profile->name,
                'logo_url' => $profile->logo ? asset('storage/'.$profile->logo) : null,
                'favicon_url' => $profile->favicon ? asset('storage/'.$profile->favicon) : null,
                'resume_url' => $profile->resume_path ? asset('storage/'.$profile->resume_path) : null,
                'resume_label' => $profile->resume_label ?: 'Download CV',
            ];
        });
    }

    public function invalidate(): void
    {
        $this->cache()->forever(self::VERSION_KEY, (string) Str::uuid());
    }

    private function remember(string $key, Closure $resolver): array
    {
        $cache = $this->cache();
        $version = (string) $cache->get(self::VERSION_KEY, 'initial');
        $ttl = max(1, (int) config('portfolio.cache.ttl', 1800));

        return $cache->remember(
            self::CACHE_PREFIX.'.'.$version.'.'.$key,
            $ttl,
            $resolver,
        );
    }

    private function cache(): Repository
    {
        return cache()->store((string) config('portfolio.cache.store', 'file'));
    }

    private function buildProfileData(Profile $profile): array
    {
        $sections = $profile->sections()
            ->where('is_enabled', true)
            ->orderBy('sort_order')
            ->get(['section_key', 'sort_order'])
            ->map(fn ($section) => [
                'key' => $section->section_key,
                'sort_order' => (int) $section->sort_order,
            ])
            ->values()
            ->all();

        $projects = $profile->projects()
            ->where('projects.is_active', true)
            ->select([
                'projects.id',
                'projects.slug',
                'projects.title',
                'projects.short_description',
                'projects.role',
                'projects.impact',
                'projects.thumbnail',
                'projects.status',
                'projects.start_date',
                'projects.end_date',
            ])
            ->with(['skills' => fn ($query) => $query
                ->select(['skills.id', 'skills.name', 'skills.category', 'skills.icon'])
                ->orderBy('project_skill.sort_order')])
            ->get()
            ->map(fn ($project) => [
                'id' => $project->id,
                'slug' => $project->slug,
                'title' => $project->title,
                'short_description' => $project->short_description,
                'role' => $project->role,
                'impact' => $project->impact,
                'thumbnail' => $project->thumbnail ? asset('storage/'.$project->thumbnail) : null,
                'status' => $project->status,
                'start_date' => $project->start_date?->format('Y-m'),
                'end_date' => $project->end_date?->format('Y-m'),
                'is_featured' => (bool) $project->pivot->is_featured,
                'sort_order' => (int) $project->pivot->sort_order,
                'skills' => $project->skills->map(fn ($skill) => [
                    'id' => $skill->id,
                    'name' => $skill->name,
                    'category' => $skill->category,
                    'icon' => $skill->icon,
                ])->values()->all(),
            ])
            ->values()
            ->all();

        $skills = $profile->skills()
            ->select([
                'skills.id',
                'skills.name',
                'skills.category',
                'skills.icon',
                'skills.description',
            ])
            ->get()
            ->map(fn ($skill) => [
                'id' => $skill->id,
                'name' => $skill->name,
                'category' => $skill->category,
                'icon' => $skill->icon,
                'description' => $skill->description,
                'is_featured' => (bool) $skill->pivot->is_featured,
                'sort_order' => (int) $skill->pivot->sort_order,
            ]);

        $skillsByCategory = $skills
            ->groupBy('category')
            ->map(fn ($group) => $group->values()->all())
            ->all();

        $experiences = $profile->experiences()
            ->select([
                'experiences.id',
                'experiences.company',
                'experiences.position',
                'experiences.description',
                'experiences.start_date',
                'experiences.end_date',
                'experiences.is_current',
                'experiences.company_url',
            ])
            ->get()
            ->map(fn ($experience) => [
                'id' => $experience->id,
                'company' => $experience->company,
                'position' => $experience->position,
                'description' => $experience->description,
                'start_date' => $experience->start_date?->format('M Y'),
                'end_date' => $experience->is_current ? 'Present' : $experience->end_date?->format('M Y'),
                'is_current' => (bool) $experience->is_current,
                'company_url' => $experience->company_url,
                'sort_order' => (int) $experience->pivot->sort_order,
            ])
            ->values()
            ->all();

        $educations = Education::query()
            ->orderBy('start_date', 'desc')
            ->get(['id', 'institution', 'degree', 'field', 'description', 'start_date', 'end_date'])
            ->map(fn ($education) => [
                'id' => $education->id,
                'institution' => $education->institution,
                'degree' => $education->degree,
                'field' => $education->field,
                'description' => $education->description,
                'date_range' => $education->date_range,
            ])
            ->values()
            ->all();

        $certifications = Certification::query()
            ->orderBy('issue_date', 'desc')
            ->get(['id', 'name', 'issuer', 'issue_date', 'credential_url'])
            ->map(fn ($certification) => [
                'id' => $certification->id,
                'name' => $certification->name,
                'issuer' => $certification->issuer,
                'issue_date' => $certification->issue_date?->format('M Y'),
                'credential_url' => $certification->credential_url,
            ])
            ->values()
            ->all();

        $socialLinks = SocialLink::query()
            ->active()
            ->get(['id', 'platform', 'label', 'url'])
            ->map(fn ($link) => [
                'id' => $link->id,
                'platform' => $link->platform,
                'label' => $link->label,
                'url' => $link->url,
            ])
            ->values()
            ->all();

        return [
            'profile' => [
                'id' => $profile->id,
                'slug' => $profile->slug,
                'name' => $profile->name,
                'title' => $profile->title,
                'tagline' => $profile->tagline,
                'about' => $profile->about,
                'location' => $profile->location,
                'email' => $profile->email,
                'avatar' => $profile->avatar ? asset('storage/'.$profile->avatar) : null,
                'logo_url' => $profile->logo ? asset('storage/'.$profile->logo) : null,
                'favicon_url' => $profile->favicon ? asset('storage/'.$profile->favicon) : null,
                'resume_url' => $profile->resume_path ? asset('storage/'.$profile->resume_path) : null,
                'resume_label' => $profile->resume_label ?: 'Download CV',
                'meta_title' => $profile->meta_title ?? "{$profile->name} — {$profile->title}",
                'meta_description' => $profile->meta_description ?? $profile->tagline,
                'og_image' => $profile->og_image ? asset('storage/'.$profile->og_image) : null,
                'is_default' => (bool) $profile->is_default,
            ],
            'sections' => $sections,
            'projects' => $projects,
            'skills_by_category' => $skillsByCategory,
            'experiences' => $experiences,
            'educations' => $educations,
            'certifications' => $certifications,
            'social_links' => $socialLinks,
        ];
    }
}
