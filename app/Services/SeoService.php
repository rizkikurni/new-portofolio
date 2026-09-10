<?php

namespace App\Services;

use Illuminate\Support\Str;

class SeoService
{
    public function url(string $path = ''): string
    {
        return rtrim(config('app.url'), '/').'/'.ltrim($path, '/');
    }

    public function profile(array $data, bool $isHome = false): array
    {
        $profile = $data['profile'];
        $canonical = $this->url($isHome
            ? '' : 'profile/'.rawurlencode($profile['slug']));
        $title = $this->text($profile['meta_title'] ?: $profile['name'].' - '.$profile['title']);
        $description = $this->text($profile['meta_description'] ?: ($profile['tagline'] ?: $profile['about']));
        $image = $this->image($profile['og_image'] ?: $profile['avatar']);
        $person = array_filter([
            '@type' => 'Person',
            '@id' => $canonical.'#person',
            'name' => $this->text($profile['name']),
            'jobTitle' => $this->text($profile['title']),
            'url' => $canonical,
            'image' => $this->image($profile['avatar']),
            'sameAs' => collect($data['social_links'])
                ->filter(fn ($link) => in_array($link['platform'], ['github', 'linkedin', 'instagram'], true)
                    && preg_match('~^https?://~i', $link['url']))
                ->pluck('url')->unique()->values()->all(),
        ]);

        return $this->metadata($title, $description, $canonical, $profile['name'], $image, $profile['favicon_url'], [
            '@context' => 'https://schema.org',
            '@type' => 'ProfilePage',
            'url' => $canonical,
            'name' => $title,
            'description' => $description,
            'mainEntity' => $person,
        ], 'profile');
    }

    public function project(array $data): array
    {
        $project = $data['project'];
        $name = $this->text($data['branding']['name']);
        $title = $this->text($project['title']).' - Case Study | '.$name;
        $description = $this->text($project['short_description'] ?: $project['description']);
        $canonical = $this->url('projects/'.rawurlencode($project['slug']));
        $image = $this->image($project['thumbnail']);

        return $this->metadata($title, $description, $canonical, $name, $image, $data['branding']['favicon_url'], array_filter([
            '@context' => 'https://schema.org',
            '@type' => 'CreativeWork',
            'name' => $this->text($project['title']),
            'url' => $canonical,
            'description' => $description,
            'image' => $image,
            'creator' => ['@type' => 'Person', 'name' => $name],
        ]));
    }

    private function metadata(string $title, string $description, string $canonical, string $siteName, ?string $image, ?string $favicon, array $schema, string $type = 'website'): array
    {
        $description = Str::limit($description, 160, '…');
        $meta = [
            ['key' => 'description', 'name' => 'description', 'content' => $description],
            ['key' => 'robots', 'name' => 'robots', 'content' => 'index, follow, max-image-preview:large'],
            ['key' => 'og:title', 'property' => 'og:title', 'content' => $title],
            ['key' => 'og:description', 'property' => 'og:description', 'content' => $description],
            ['key' => 'og:type', 'property' => 'og:type', 'content' => $type],
            ['key' => 'og:url', 'property' => 'og:url', 'content' => $canonical],
            ['key' => 'og:site_name', 'property' => 'og:site_name', 'content' => $this->text($siteName)],
            ['key' => 'twitter:card', 'name' => 'twitter:card', 'content' => $image ? 'summary_large_image' : 'summary'],
            ['key' => 'twitter:title', 'name' => 'twitter:title', 'content' => $title],
            ['key' => 'twitter:description', 'name' => 'twitter:description', 'content' => $description],
        ];
        if ($image) {
            $meta[] = ['key' => 'og:image', 'property' => 'og:image', 'content' => $image];
            $meta[] = ['key' => 'og:image:alt', 'property' => 'og:image:alt', 'content' => $title];
            $meta[] = ['key' => 'twitter:image', 'name' => 'twitter:image', 'content' => $image];
        }

        return compact('title', 'canonical', 'favicon', 'meta', 'schema');
    }

    private function image(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        return preg_match('~^https?://~i', $path) ? $path : $this->url($path);
    }

    private function text(?string $value): string
    {
        return Str::squish(html_entity_decode(strip_tags($value ?? ''), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }
}
