<?php

namespace Tests\Feature;

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\Profile;
use App\Models\Project;
use Database\Seeders\PortfolioSeeder;
use DOMDocument;
use DOMXPath;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class SeoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['app.url' => 'https://portfolio.example/']);
        $this->seed(PortfolioSeeder::class);
        Profile::where('slug', 'frontend')->firstOrFail()->update([
            'name' => 'Muhammad Rizki Kurniawan',
            'title' => 'Full-Stack Web Developer',
            'meta_title' => 'Muhammad Rizki Kurniawan | Full-Stack Web Developer',
            'meta_description' => 'Portfolio pengembangan aplikasi Laravel dan React.',
            'avatar' => 'profiles/avatar.webp',
            'og_image' => 'profiles/social.webp',
        ]);
    }

    public function test_initial_html_contains_seo_before_javascript_runs(): void
    {
        $response = $this->get('https://192.0.2.10/?utm_source=example')->assertOk();
        $xpath = $this->html($response->getContent());

        $this->assertSame('Muhammad Rizki Kurniawan | Full-Stack Web Developer', $xpath->evaluate('string(/html/head/title)'));
        $this->assertSame('Portfolio pengembangan aplikasi Laravel dan React.', $xpath->evaluate('string(/html/head/meta[@name="description"]/@content)'));
        $this->assertSame('https://portfolio.example/', $xpath->evaluate('string(/html/head/link[@rel="canonical"]/@href)'));
        $this->assertSame('https://portfolio.example/', $xpath->evaluate('string(/html/head/meta[@property="og:url"]/@content)'));
        $this->assertSame('https://portfolio.example/storage/profiles/social.webp', $xpath->evaluate('string(/html/head/meta[@property="og:image"]/@content)'));
        $this->assertSame('summary_large_image', $xpath->evaluate('string(/html/head/meta[@name="twitter:card"]/@content)'));
        $this->assertSame(1, $xpath->query('/html/head/link[@rel="canonical"]')->length);
        $schema = json_decode($xpath->evaluate('string(/html/head/script[@type="application/ld+json"])'), true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame('ProfilePage', $schema['@type']);
        $this->assertSame('Person', $schema['mainEntity']['@type']);
        $this->assertSame('Muhammad Rizki Kurniawan', $schema['mainEntity']['name']);
        $response->assertHeaderMissing('X-Robots-Tag');
    }

    public function test_inertia_visits_receive_the_same_canonical_metadata(): void
    {
        $version = app(HandleInertiaRequests::class)->version(Request::create('/'));
        $this->withHeaders(['X-Inertia' => 'true', 'X-Inertia-Version' => $version ?? ''])
            ->get('/profile/frontend?utm_source=example')
            ->assertOk()
            ->assertJsonPath('props.seo.canonical', 'https://portfolio.example/')
            ->assertJsonPath('props.seo.title', 'Muhammad Rizki Kurniawan | Full-Stack Web Developer');

        $this->get('/profile/backend')->assertOk()
            ->assertJsonPath('props.seo.canonical', 'https://portfolio.example/profile/backend');
    }

    public function test_project_has_its_own_metadata_and_structured_data(): void
    {
        Project::where('slug', 'phishguard')->firstOrFail()->update(['thumbnail' => 'projects/preview.webp']);
        $response = $this->get('/projects/phishguard')->assertOk();
        $xpath = $this->html($response->getContent());
        $this->assertSame('PhishGuard - Case Study | Muhammad Rizki Kurniawan', $xpath->evaluate('string(/html/head/title)'));
        $this->assertSame('https://portfolio.example/projects/phishguard', $xpath->evaluate('string(/html/head/link[@rel="canonical"]/@href)'));
        $schema = json_decode($xpath->evaluate('string(/html/head/script[@type="application/ld+json"])'), true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame('CreativeWork', $schema['@type']);
        $this->assertSame('https://portfolio.example/storage/projects/preview.webp', $schema['image']);
    }

    public function test_sitemap_only_lists_active_canonical_pages(): void
    {
        Profile::where('slug', 'backend')->firstOrFail()->update(['is_active' => false]);
        Project::where('slug', 'phishguard')->firstOrFail()->update(['is_active' => false]);
        Project::where('slug', 'image-sorter')->firstOrFail()->delete();

        $response = $this->get('https://192.0.2.10/sitemap.xml')->assertOk()
            ->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
        $xml = simplexml_load_string($response->getContent());
        $this->assertNotFalse($xml);
        $urls = array_map(fn ($url) => (string) $url->loc, iterator_to_array($xml->url, false));
        $this->assertContains('https://portfolio.example/', $urls);
        $this->assertContains('https://portfolio.example/profile/fullstack', $urls);
        $this->assertContains('https://portfolio.example/projects/portfolio-platform', $urls);
        $this->assertNotContains('https://portfolio.example/profile/frontend', $urls);
        $this->assertNotContains('https://portfolio.example/profile/backend', $urls);
        $this->assertNotContains('https://portfolio.example/projects/phishguard', $urls);
        $this->assertNotContains('https://portfolio.example/projects/image-sorter', $urls);
        $response->assertDontSee('/admin')->assertDontSee('192.0.2.10');
    }

    public function test_robots_advertises_sitemap_and_admin_is_noindex(): void
    {
        $this->get('https://192.0.2.10/robots.txt')->assertOk()
            ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
            ->assertSee('Sitemap: https://portfolio.example/sitemap.xml', false)
            ->assertDontSee('192.0.2.10');
        $this->get('/admin/login')->assertOk()->assertHeader('X-Robots-Tag', 'noindex, nofollow');
        $this->get('/projects/non-existent')->assertNotFound();
    }

    public function test_metadata_escapes_html_and_json_script_boundaries(): void
    {
        Profile::where('slug', 'frontend')->firstOrFail()->update([
            'name' => 'Rizki &lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;',
            'meta_title' => 'Rizki &quot;Developer&quot; &amp; Portfolio',
        ]);
        $response = $this->get('/')->assertOk();
        $xpath = $this->html($response->getContent());
        $schema = json_decode($xpath->evaluate('string(/html/head/script[@type="application/ld+json"])'), true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame('Rizki </script><script>alert(1)</script>', $schema['mainEntity']['name']);
        $this->assertSame('Rizki "Developer" & Portfolio', $xpath->evaluate('string(/html/head/title)'));
        $this->assertSame(0, $xpath->query('/html/head/script[not(@type)]')->length);
    }

    private function html(string $html): DOMXPath
    {
        $document = new DOMDocument;
        $previous = libxml_use_internal_errors(true);
        $document->loadHTML($html);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        return new DOMXPath($document);
    }
}
