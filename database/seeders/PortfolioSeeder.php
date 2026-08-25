<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\ProfileSection;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Skill::truncate();
        Project::truncate();
        Experience::truncate();
        Education::truncate();
        Certification::truncate();
        SocialLink::truncate();
        Profile::truncate();
        ProfileSection::truncate();
        DB::table('profile_project')->truncate();
        DB::table('profile_skill')->truncate();
        DB::table('profile_experience')->truncate();
        DB::table('project_skill')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // =====================================================================
        // 1. SKILLS
        // =====================================================================
        $skills = [
            // Frontend
            ['name' => 'HTML',          'category' => 'Frontend',    'icon' => 'html5'],
            ['name' => 'CSS',           'category' => 'Frontend',    'icon' => 'css3'],
            ['name' => 'JavaScript',    'category' => 'Frontend',    'icon' => 'javascript'],
            ['name' => 'TypeScript',    'category' => 'Frontend',    'icon' => 'typescript'],
            ['name' => 'React',         'category' => 'Frontend',    'icon' => 'react'],
            ['name' => 'Tailwind CSS',  'category' => 'Frontend',    'icon' => 'tailwind'],
            ['name' => 'Bootstrap',     'category' => 'Frontend',    'icon' => 'bootstrap'],

            // Backend
            ['name' => 'PHP',           'category' => 'Backend',     'icon' => 'php'],
            ['name' => 'Laravel',       'category' => 'Backend',     'icon' => 'laravel'],
            ['name' => 'Python',        'category' => 'Backend',     'icon' => 'python'],
            ['name' => 'Flask',         'category' => 'Backend',     'icon' => 'flask'],

            // Database
            ['name' => 'MySQL',         'category' => 'Database',    'icon' => 'mysql'],
            ['name' => 'SQLite',        'category' => 'Database',    'icon' => 'sqlite'],

            // Machine Learning
            ['name' => 'XGBoost',       'category' => 'Machine Learning', 'icon' => 'python'],
            ['name' => 'Scikit-learn',  'category' => 'Machine Learning', 'icon' => 'python'],
            ['name' => 'Pandas',        'category' => 'Machine Learning', 'icon' => 'python'],
            ['name' => 'NumPy',         'category' => 'Machine Learning', 'icon' => 'python'],

            // Tools
            ['name' => 'Git',           'category' => 'Tools',       'icon' => 'git'],
            ['name' => 'GitHub',        'category' => 'Tools',       'icon' => 'github'],
            ['name' => 'VS Code',       'category' => 'Tools',       'icon' => 'vscode'],
            ['name' => 'Figma',         'category' => 'Tools',       'icon' => 'figma'],

            // Other
            ['name' => 'Unity',         'category' => 'Other',       'icon' => 'unity'],
            ['name' => 'Blender',       'category' => 'Other',       'icon' => 'blender'],
            ['name' => 'Inertia.js',    'category' => 'Frontend',    'icon' => 'inertia'],
        ];

        $createdSkills = [];
        foreach ($skills as $s) {
            $createdSkills[$s['name']] = Skill::create($s);
        }

        // =====================================================================
        // 2. PROJECTS
        // =====================================================================
        $projects = [
            [
                'slug'              => 'portfolio-platform',
                'title'             => 'Portfolio Platform',
                'short_description' => 'A flexible multi-profile developer portfolio CMS built with Laravel + Inertia.js + React.',
                'description'       => 'A content management system that allows developers to create multiple portfolio versions targeting different job roles. Built with Laravel 12, Inertia.js, React 18, Tailwind CSS, and Filament admin panel. Features include dynamic profiles, per-profile skill/project selection, section ordering, and dark mode.',
                'github_url'        => 'https://github.com',
                'demo_url'          => null,
                'start_date'        => '2026-08-01',
                'end_date'          => null,
                'status'            => 'ongoing',
                'is_active'         => true,
                'skills'            => ['Laravel', 'PHP', 'React', 'Tailwind CSS', 'MySQL', 'Inertia.js'],
            ],
            [
                'slug'              => 'phishguard',
                'title'             => 'PhishGuard',
                'short_description' => 'A machine learning-based phishing URL detection system using XGBoost classifier.',
                'description'       => 'PhishGuard is a web application that detects phishing URLs using a trained XGBoost machine learning model. The system extracts features from URLs and classifies them as legitimate or phishing with high accuracy. Built with Python, Flask for the backend API, and a simple frontend interface.',
                'github_url'        => 'https://github.com',
                'demo_url'          => null,
                'start_date'        => '2025-01-01',
                'end_date'          => '2025-06-01',
                'status'            => 'completed',
                'is_active'         => true,
                'skills'            => ['Python', 'Flask', 'XGBoost', 'Scikit-learn', 'Pandas', 'Bootstrap'],
            ],
            [
                'slug'              => 'image-sorter',
                'title'             => 'Image Sorter',
                'short_description' => 'A desktop tool to automatically organize and sort images by metadata and content.',
                'description'       => 'Image Sorter is a utility application that helps users organize large collections of images. It sorts photos by EXIF metadata (date, camera model, location), file type, and allows custom sorting rules. Built with Python and a clean GUI interface.',
                'github_url'        => 'https://github.com',
                'demo_url'          => null,
                'start_date'        => '2024-06-01',
                'end_date'          => '2024-09-01',
                'status'            => 'completed',
                'is_active'         => true,
                'skills'            => ['Python', 'Pandas'],
            ],
            [
                'slug'              => 'audiophile-tool',
                'title'             => 'Audiophile Tool',
                'short_description' => 'A web-based audio analysis and visualization tool for audiophiles.',
                'description'       => 'A browser-based tool that provides audio analysis features for audiophiles. Displays frequency response graphs, waveform visualization, and metadata analysis for audio files. Built with JavaScript and Web Audio API.',
                'github_url'        => 'https://github.com',
                'demo_url'          => null,
                'start_date'        => '2024-01-01',
                'end_date'          => '2024-05-01',
                'status'            => 'completed',
                'is_active'         => true,
                'skills'            => ['JavaScript', 'HTML', 'CSS'],
            ],
            [
                'slug'              => 'unity-game',
                'title'             => 'Unity Game',
                'short_description' => 'A 3D game prototype developed in Unity with custom game mechanics.',
                'description'       => 'A 3D game prototype built in Unity using C# scripting. Features custom game mechanics, physics interactions, and 3D models created in Blender. Demonstrates understanding of game development pipelines and real-time 3D rendering.',
                'github_url'        => 'https://github.com',
                'demo_url'          => null,
                'start_date'        => '2023-06-01',
                'end_date'          => '2023-12-01',
                'status'            => 'completed',
                'is_active'         => true,
                'skills'            => ['Unity', 'Blender'],
            ],
        ];

        $createdProjects = [];
        foreach ($projects as $p) {
            $projectSkills = $p['skills'];
            unset($p['skills']);
            $project = Project::create($p);
            $createdProjects[$project->slug] = $project;

            // Attach technologies to project
            $skillAttach = [];
            foreach ($projectSkills as $order => $skillName) {
                if (isset($createdSkills[$skillName])) {
                    $skillAttach[$createdSkills[$skillName]->id] = ['sort_order' => $order];
                }
            }
            $project->skills()->attach($skillAttach);
        }

        // =====================================================================
        // 3. EXPERIENCES
        // =====================================================================
        $exp1 = Experience::create([
            'company'     => 'Tech Solutions Co.',
            'position'    => 'Frontend Developer',
            'description' => "Developed and maintained responsive web applications using React and Tailwind CSS.\n- Built reusable component libraries reducing development time by 30%\n- Integrated REST APIs and optimized frontend performance\n- Collaborated with backend team on Inertia.js implementation",
            'start_date'  => '2024-07-01',
            'end_date'    => null,
            'is_current'  => true,
            'company_url' => 'https://example.com',
        ]);

        $exp2 = Experience::create([
            'company'     => 'Digital Agency',
            'position'    => 'Web Developer Intern',
            'description' => "Assisted in building client websites and web applications.\n- Worked on full-stack features using Laravel and vanilla JavaScript\n- Performed database design and optimization for MySQL\n- Delivered 3 client projects on time",
            'start_date'  => '2024-01-01',
            'end_date'    => '2024-06-30',
            'is_current'  => false,
            'company_url' => 'https://example.com',
        ]);

        $exp3 = Experience::create([
            'company'     => 'Freelance',
            'position'    => 'Backend Developer',
            'description' => "Developed backend systems and APIs for various clients.\n- Built RESTful APIs using Laravel for mobile applications\n- Implemented authentication systems and database architecture\n- Deployed applications to production servers",
            'start_date'  => '2023-06-01',
            'end_date'    => '2023-12-31',
            'is_current'  => false,
            'company_url' => null,
        ]);

        // =====================================================================
        // 4. EDUCATION
        // =====================================================================
        Education::create([
            'institution' => 'State University',
            'degree'      => 'Bachelor of Computer Science',
            'field'       => 'Software Engineering',
            'description' => 'Focused on software engineering, algorithms, and web development. Final project: Machine learning-based cybersecurity tool.',
            'start_date'  => '2021-09-01',
            'end_date'    => '2025-07-01',
        ]);

        // =====================================================================
        // 5. CERTIFICATIONS
        // =====================================================================
        Certification::create([
            'name'           => 'Laravel Certified Developer',
            'issuer'         => 'Laravel',
            'issue_date'     => '2025-01-15',
            'expiration_date' => null,
            'credential_id'  => 'LCD-2025-001',
            'credential_url' => 'https://laravel.com',
            'image'          => null,
        ]);

        // =====================================================================
        // 6. SOCIAL LINKS
        // =====================================================================
        $socialLinks = [
            ['platform' => 'github',   'label' => 'GitHub',   'url' => 'https://github.com',        'icon' => 'github',   'sort_order' => 0, 'is_active' => true],
            ['platform' => 'linkedin', 'label' => 'LinkedIn', 'url' => 'https://linkedin.com',      'icon' => 'linkedin', 'sort_order' => 1, 'is_active' => true],
            ['platform' => 'email',    'label' => 'Email',    'url' => 'mailto:hello@example.com',  'icon' => 'mail',     'sort_order' => 2, 'is_active' => true],
            ['platform' => 'instagram','label' => 'Instagram','url' => 'https://instagram.com',     'icon' => 'instagram','sort_order' => 3, 'is_active' => false],
        ];
        foreach ($socialLinks as $link) {
            SocialLink::create($link);
        }

        // =====================================================================
        // 7. PROFILES
        // =====================================================================
        $defaultSections = ProfileSection::DEFAULT_SECTIONS;

        // --- Frontend Profile ---
        $frontend = Profile::create([
            'slug'             => 'frontend',
            'name'             => 'Frontend Developer',
            'title'            => 'Frontend Developer',
            'tagline'          => 'Building beautiful, responsive interfaces that users love.',
            'about'            => "I'm a passionate Frontend Developer focused on crafting responsive, accessible, and performant user interfaces. I love turning complex design requirements into clean, maintainable React components.\n\nWith a strong foundation in HTML, CSS, and JavaScript, I specialize in building modern web applications using React and Tailwind CSS. I care deeply about user experience and code quality.",
            'location'         => 'Indonesia',
            'email'            => 'hello@example.com',
            'phone'            => null,
            'meta_title'       => 'Your Name — Frontend Developer',
            'meta_description' => 'Frontend Developer specializing in React, Tailwind CSS, and modern web development.',
            'is_default'       => true,
            'is_active'        => true,
        ]);

        $this->createSections($frontend, $defaultSections, ['certifications' => false]);
        $frontend->projects()->attach([
            $createdProjects['portfolio-platform']->id => ['sort_order' => 0, 'is_featured' => true],
            $createdProjects['image-sorter']->id       => ['sort_order' => 1, 'is_featured' => true],
            $createdProjects['audiophile-tool']->id    => ['sort_order' => 2, 'is_featured' => false],
        ]);
        $frontend->skills()->attach([
            $createdSkills['HTML']->id         => ['sort_order' => 0, 'is_featured' => true],
            $createdSkills['CSS']->id          => ['sort_order' => 1, 'is_featured' => true],
            $createdSkills['JavaScript']->id   => ['sort_order' => 2, 'is_featured' => true],
            $createdSkills['TypeScript']->id   => ['sort_order' => 3, 'is_featured' => false],
            $createdSkills['React']->id        => ['sort_order' => 4, 'is_featured' => true],
            $createdSkills['Tailwind CSS']->id => ['sort_order' => 5, 'is_featured' => true],
            $createdSkills['Bootstrap']->id    => ['sort_order' => 6, 'is_featured' => false],
            $createdSkills['Git']->id          => ['sort_order' => 7, 'is_featured' => false],
            $createdSkills['Figma']->id        => ['sort_order' => 8, 'is_featured' => false],
        ]);
        $frontend->experiences()->attach([
            $exp1->id => ['sort_order' => 0],
            $exp2->id => ['sort_order' => 1],
        ]);

        // --- Backend Profile ---
        $backend = Profile::create([
            'slug'             => 'backend',
            'name'             => 'Backend Developer',
            'title'            => 'Backend Developer',
            'tagline'          => 'Building scalable APIs and robust backend systems.',
            'about'            => "I'm a Backend Developer who enjoys building reliable, scalable server-side systems. I specialize in Laravel for API development and have experience with Python for data processing and machine learning projects.\n\nI focus on clean architecture, database design, and API performance. I love solving complex backend challenges and building systems that handle real-world load.",
            'location'         => 'Indonesia',
            'email'            => 'hello@example.com',
            'phone'            => null,
            'meta_title'       => 'Your Name — Backend Developer',
            'meta_description' => 'Backend Developer specializing in Laravel, PHP, Python, and database design.',
            'is_default'       => false,
            'is_active'        => true,
        ]);

        $this->createSections($backend, $defaultSections, ['education' => false]);
        $backend->projects()->attach([
            $createdProjects['phishguard']->id         => ['sort_order' => 0, 'is_featured' => true],
            $createdProjects['portfolio-platform']->id => ['sort_order' => 1, 'is_featured' => true],
        ]);
        $backend->skills()->attach([
            $createdSkills['PHP']->id        => ['sort_order' => 0, 'is_featured' => true],
            $createdSkills['Laravel']->id    => ['sort_order' => 1, 'is_featured' => true],
            $createdSkills['Python']->id     => ['sort_order' => 2, 'is_featured' => true],
            $createdSkills['Flask']->id      => ['sort_order' => 3, 'is_featured' => true],
            $createdSkills['MySQL']->id      => ['sort_order' => 4, 'is_featured' => true],
            $createdSkills['Git']->id        => ['sort_order' => 5, 'is_featured' => false],
            $createdSkills['GitHub']->id     => ['sort_order' => 6, 'is_featured' => false],
        ]);
        $backend->experiences()->attach([
            $exp3->id => ['sort_order' => 0],
            $exp2->id => ['sort_order' => 1],
        ]);

        // --- Fullstack Profile ---
        $fullstack = Profile::create([
            'slug'             => 'fullstack',
            'name'             => 'Fullstack Developer',
            'title'            => 'Fullstack Developer',
            'tagline'          => 'End-to-end development — from database to UI.',
            'about'            => "I'm a Fullstack Developer who works across the entire stack. I build complete web applications — from database design and Laravel APIs to React frontends and deployment.\n\nI enjoy the full development cycle and can take a feature from requirements to production. Whether it's a complex backend system or a polished UI, I deliver complete solutions.",
            'location'         => 'Indonesia',
            'email'            => 'hello@example.com',
            'phone'            => null,
            'meta_title'       => 'Your Name — Fullstack Developer',
            'meta_description' => 'Fullstack Developer with expertise in Laravel, React, and end-to-end web development.',
            'is_default'       => false,
            'is_active'        => true,
        ]);

        $this->createSections($fullstack, $defaultSections);
        $fullstack->projects()->attach([
            $createdProjects['portfolio-platform']->id => ['sort_order' => 0, 'is_featured' => true],
            $createdProjects['phishguard']->id         => ['sort_order' => 1, 'is_featured' => true],
            $createdProjects['image-sorter']->id       => ['sort_order' => 2, 'is_featured' => false],
            $createdProjects['audiophile-tool']->id    => ['sort_order' => 3, 'is_featured' => false],
        ]);
        $fullstack->skills()->attach([
            $createdSkills['Laravel']->id      => ['sort_order' => 0, 'is_featured' => true],
            $createdSkills['PHP']->id          => ['sort_order' => 1, 'is_featured' => true],
            $createdSkills['React']->id        => ['sort_order' => 2, 'is_featured' => true],
            $createdSkills['JavaScript']->id   => ['sort_order' => 3, 'is_featured' => true],
            $createdSkills['Tailwind CSS']->id => ['sort_order' => 4, 'is_featured' => true],
            $createdSkills['MySQL']->id        => ['sort_order' => 5, 'is_featured' => true],
            $createdSkills['Python']->id       => ['sort_order' => 6, 'is_featured' => false],
            $createdSkills['Git']->id          => ['sort_order' => 7, 'is_featured' => false],
            $createdSkills['Inertia.js']->id   => ['sort_order' => 8, 'is_featured' => false],
        ]);
        $fullstack->experiences()->attach([
            $exp1->id => ['sort_order' => 0],
            $exp2->id => ['sort_order' => 1],
            $exp3->id => ['sort_order' => 2],
        ]);

        $this->command->info('Portfolio seeded successfully!');
        $this->command->info('Profiles: frontend (default), backend, fullstack');
        $this->command->info('Projects: ' . Project::count());
        $this->command->info('Skills: '   . Skill::count());
    }

    /**
     * Create default profile sections with optional overrides.
     */
    private function createSections(Profile $profile, array $defaults, array $overrides = []): void
    {
        foreach ($defaults as $key => $sortOrder) {
            $isEnabled = $overrides[$key] ?? true;
            ProfileSection::create([
                'profile_id'  => $profile->id,
                'section_key' => $key,
                'is_enabled'  => $isEnabled,
                'sort_order'  => $sortOrder,
            ]);
        }
    }
}
