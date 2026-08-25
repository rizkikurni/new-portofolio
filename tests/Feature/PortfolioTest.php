<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\PortfolioSeeder::class);
    }

    public function test_default_profile_loads_on_homepage(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Profile/Show')
                ->has('profile')
                ->where('profile.slug', 'frontend')
                ->where('profile.is_default', true)
        );
    }

    public function test_profile_can_be_accessed_using_slug(): void
    {
        $response = $this->get('/profile/backend');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Profile/Show')
                ->where('profile.slug', 'backend')
        );
    }

    public function test_inactive_profile_returns_404(): void
    {
        $profile = Profile::where('slug', 'backend')->first();
        $profile->update(['is_active' => false]);

        $response = $this->get('/profile/backend');

        $response->assertStatus(404);
    }

    public function test_non_existent_profile_returns_404(): void
    {
        $response = $this->get('/profile/invalid-profile-slug');

        $response->assertStatus(404);
    }

    public function test_project_detail_page_loads_technologies(): void
    {
        $response = $this->get('/projects/phishguard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Project/Show')
                ->where('project.slug', 'phishguard')
                ->has('project.skills')
        );
    }

    public function test_profile_duplication_copies_relations_without_duplicating_global_records(): void
    {
        $original = Profile::where('slug', 'fullstack')->first();
        $initialProjectCount = Project::count();
        $initialSkillCount = Skill::count();

        // Perform duplication
        $newProfile = Profile::create([
            'name'       => 'Software Engineer',
            'slug'       => 'software-engineer',
            'title'      => $original->title,
            'is_default' => false,
            'is_active'  => true,
        ]);

        // Attach projects & skills
        $newProfile->projects()->attach(
            $original->projects->mapWithKeys(fn ($p) => [$p->id => ['sort_order' => $p->pivot->sort_order, 'is_featured' => $p->pivot->is_featured]])
        );

        $newProfile->skills()->attach(
            $original->skills->mapWithKeys(fn ($s) => [$s->id => ['sort_order' => $s->pivot->sort_order, 'is_featured' => $s->pivot->is_featured]])
        );

        // Assertions
        $this->assertEquals($original->projects->count(), $newProfile->projects->count());
        $this->assertEquals($original->skills->count(), $newProfile->skills->count());
        $this->assertEquals($initialProjectCount, Project::count());
        $this->assertEquals($initialSkillCount, Skill::count());
    }

    public function test_admin_panel_login_page_is_accessible(): void
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200);
    }
}
