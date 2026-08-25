# FLEXIBLE DEVELOPER PORTFOLIO - PROJECT SPECIFICATION

> This document is the single source of truth for developing the project.
> All implementation decisions must follow this document unless explicitly changed.

---

# 1. PROJECT OVERVIEW

Build a flexible personal developer portfolio website that allows the owner to create multiple portfolio versions for different job roles. The portfolio must support different target positions without requiring source-code changes.

Example target roles: Frontend Developer, Backend Developer, Fullstack Developer, Software Engineer, Machine Learning Engineer, Web Developer, Custom Job Position.

Each role is represented as a separate Profile (e.g. /profile/frontend, /profile/backend, /profile/fullstack).

Each profile may have different: Job title, Tagline, About text, Selected projects, Project ordering, Featured projects, Skills, Skill ordering, Experiences, Section visibility, Section ordering, SEO metadata.

The same underlying project, skill, and experience data must be reusable across multiple profiles.

---

# 2. PRIMARY OBJECTIVES

1. Flexibility
2. Fast development
3. Maintainability
4. Good performance
5. Professional appearance
6. Responsive design
7. SEO friendliness
8. Easy content management
9. Reusability
10. Clean architecture

The owner must be able to create or modify a portfolio profile without modifying application source code.

---

# 3. TECHNOLOGY STACK

## 3.1 Backend: Laravel
Responsible for: Routing, Business logic, Authentication, Authorization, Validation, Database access, Eloquent models, Server-side data preparation, File management, SEO metadata, Application security.

## 3.2 Frontend: React
Responsible for: Public portfolio UI, Reusable components, Interactive UI, Portfolio sections, Responsive interface, Client-side interactions. Do NOT use Vue.js or React as a completely separate application.

## 3.3 Application Bridge: Inertia.js
Architecture: Browser -> React -> Inertia.js -> Laravel -> Eloquent -> MySQL. Do not build a separate REST API for the public portfolio unless a concrete requirement appears. Laravel routes should directly render Inertia pages.

Example:
```php
return Inertia::render('Profile/Show', ['profile' => $profile]);
```

## 3.4 Styling: Tailwind CSS
Primary styling framework. Avoid large CSS files. Prefer reusable React components and Tailwind utility classes.

## 3.5 Admin Panel: Filament
Responsible for administration interface. Admin URL: /admin. The admin panel should not be implemented manually unless Filament cannot provide the required functionality.

## 3.6 Database: MySQL
Use: Laravel migrations, Eloquent ORM, Database seeders, Factories where useful. Do not use raw SQL unless there is a clear technical reason.

## 3.7 JavaScript Utilities: Alpine.js (only if needed for small interactions outside React)
React is the primary frontend framework. Do not introduce unnecessary JavaScript frameworks.

## 3.8 Icons: Lucide Icons (or another lightweight icon library)

---

# 4. HIGH-LEVEL ARCHITECTURE

```
USER -> Web Browser -> Laravel Routes
                            |
              +-------------+------------+
              |                          |
        Public Portfolio              Admin
              |                          |
        Inertia + React             Filament
              |                          |
              +-------------+------------+
                            |
                          Laravel
                            |
                         Eloquent
                            |
                          MySQL
```

---

# 5. APPLICATION STRUCTURE

```
app/
  Filament/Resources/, Filament/Pages/
  Http/Controllers/
  Models/
  Services/

database/
  factories/, migrations/, seeders/

resources/
  css/
  js/
    Components/, Layouts/, Pages/, Types/, app.jsx
  views/

routes/
  web.php, auth.php
```

---

# 6. PUBLIC ROUTES

- / (Home: displays the default active profile)
- /profile/{slug} (e.g. /profile/frontend, /profile/backend, /profile/fullstack)
- /projects/{slug} (e.g. /projects/phishguard)

---

# 7. ADMIN ROUTES (managed by Filament)

/admin, /admin/profiles, /admin/projects, /admin/skills, /admin/experiences, /admin/educations, /admin/certifications, /admin/social-links

Do not manually create equivalent CRUD interfaces.

---

# 8. CORE CONCEPT: PROFILE

A Profile is a configuration of the portfolio for a specific job target. These are not separate websites. They are different configurations using the same database.

---

# 9. PROFILE FLEXIBILITY

The system must allow:
- Profile A: Frontend Developer with Projects A,B,C and Skills A,B,C
- Profile B: Backend Developer with Projects B,D,E and Skills D,E,F

The same project/skill/experience may appear in multiple profiles. Do not duplicate records simply because they belong to different profiles.

---

# 10. DATABASE TABLES

```
users
profiles, profile_sections
projects, project_skill, profile_project
skills, profile_skill
experiences, profile_experience
educations, certifications
social_links
```

---

# 11. USERS TABLE

Use Laravel's default users table: id, name, email, email_verified_at, password, remember_token, created_at, updated_at.

---

# 12. PROFILES TABLE

Fields: id, slug (UNIQUE), name, title, tagline, about, location, email, phone, meta_title, meta_description, og_image, is_default, is_active, created_at, updated_at.

Rules: slug must be unique. name is the internal name. title is the public job title. is_active controls public visibility. is_default identifies the default homepage profile. Only one profile may be the default.

---

# 13. PROFILE SECTIONS TABLE (profile_sections)

Fields: id, profile_id, section_key, is_enabled, sort_order, created_at, updated_at.
Unique constraint: UNIQUE(profile_id, section_key).

Supported section keys: hero, about, skills, projects, experience, education, certifications, contact.

---

# 14. PROJECTS TABLE

Fields: id, slug (UNIQUE), title, short_description, description, thumbnail, github_url, demo_url, start_date, end_date, status (completed|ongoing|archived), is_active, created_at, updated_at.

---

# 15. PROFILE_PROJECT TABLE (pivot)

Fields: id, profile_id, project_id, sort_order, is_featured, created_at, updated_at.
Unique constraint: UNIQUE(profile_id, project_id). A project must not be duplicated.

---

# 16. SKILLS TABLE

Fields: id, name, category, icon, description, created_at, updated_at.
Categories (stored as strings, NOT ENUM): Frontend, Backend, Database, Programming, Machine Learning, DevOps, Tools, Other.

---

# 17. PROFILE_SKILL TABLE (pivot)

Fields: id, profile_id, skill_id, sort_order, is_featured, created_at, updated_at.
Unique constraint: UNIQUE(profile_id, skill_id). Do NOT store skills as comma-separated string or JSON.

---

# 18. PROJECT_SKILL TABLE (pivot)

Fields: id, project_id, skill_id, sort_order, created_at, updated_at.
Unique constraint: UNIQUE(project_id, skill_id). This relationship is separate from the profile's personal skills.

---

# 19. EXPERIENCES TABLE

Fields: id, company, position, description, start_date, end_date, is_current, company_url, created_at, updated_at.

---

# 20. PROFILE_EXPERIENCE TABLE (pivot)

Fields: id, profile_id, experience_id, sort_order, created_at, updated_at.
Unique constraint: UNIQUE(profile_id, experience_id).

---

# 21. EDUCATIONS TABLE

Fields: id, institution, degree, field, description, start_date, end_date, created_at, updated_at.
Education is global by default.

---

# 22. CERTIFICATIONS TABLE

Fields: id, name, issuer, issue_date, expiration_date, credential_id, credential_url, image, created_at, updated_at.

---

# 23. SOCIAL_LINKS TABLE

Fields: id, platform, label, url, icon, sort_order, is_active, created_at, updated_at. Social links are global.

---

# 24. DATABASE RELATIONSHIPS

Profile: hasMany ProfileSection, belongsToMany Project, belongsToMany Skill, belongsToMany Experience.
Project: belongsToMany Profile, belongsToMany Skill.
Skill: belongsToMany Profile, belongsToMany Project.
Experience: belongsToMany Profile.

---

# 25. PROFILE MODEL RELATIONSHIPS

```php
public function sections() {
    return $this->hasMany(ProfileSection::class)->orderBy('sort_order');
}
public function projects() {
    return $this->belongsToMany(Project::class)
        ->withPivot(['sort_order', 'is_featured'])->orderByPivot('sort_order');
}
public function skills() {
    return $this->belongsToMany(Skill::class)
        ->withPivot(['sort_order', 'is_featured'])->orderByPivot('sort_order');
}
public function experiences() {
    return $this->belongsToMany(Experience::class)
        ->withPivot('sort_order')->orderByPivot('sort_order');
}
```

---

# 26. PROJECT MODEL RELATIONSHIPS

```php
public function profiles() {
    return $this->belongsToMany(Profile::class)->withPivot(['sort_order', 'is_featured']);
}
public function skills() {
    return $this->belongsToMany(Skill::class)->withPivot('sort_order')->orderByPivot('sort_order');
}
```

---

# 27. SKILL MODEL RELATIONSHIPS

```php
public function profiles() {
    return $this->belongsToMany(Profile::class)->withPivot(['sort_order', 'is_featured']);
}
public function projects() {
    return $this->belongsToMany(Project::class)->withPivot('sort_order')->orderByPivot('sort_order');
}
```

---

# 28. DATA OWNERSHIP

Global Data: Projects, Skills, Experiences, Education, Certifications, Social Links.
Profile-Specific Data: Title, Tagline, About, Selected Projects, Project Order, Featured Projects, Selected Skills, Skill Order, Featured Skills, Selected Experiences, Experience Order, Section Visibility, Section Order, SEO Metadata.

This separation is mandatory.

---

# 29. PROFILE DUPLICATION

When duplicating a profile:
1. Create a new profile with new id, slug, name.
2. Copy profile-specific fields (title, tagline, about, etc.).
3. Copy profile sections.
4. Copy profile-project relationships.
5. Copy profile-skill relationships.
6. Copy profile-experience relationships.
7-9. Do NOT duplicate projects, skills, or experiences themselves. Only copy relationships.

---

# 30. PUBLIC PROFILE PROCESS

When user visits /profile/{slug}:
1. Find profile by slug.
2. Verify the profile exists and is_active = true.
3. Load enabled sections.
4. Load selected projects, skills, experiences, education, certifications, social links.
5. Prepare SEO metadata.
6. Render React page through Inertia.

Use eager loading. Avoid N+1 queries.

---

# 31. PROFILE CONTROLLER

```php
public function show(string $slug)
{
    $profile = Profile::query()
        ->where('slug', $slug)
        ->where('is_active', true)
        ->with(['sections', 'projects.skills', 'skills', 'experiences', 'educations', 'certifications'])
        ->firstOrFail();

    return Inertia::render('Profile/Show', ['profile' => $profile]);
}
```

---

# 32. INERTIA PAGES

resources/js/Pages/
- Profile/Show.jsx
- Project/Show.jsx
- Home/Index.jsx

---

# 33. REACT COMPONENT STRUCTURE

resources/js/Components/
- Layout/: Navbar.jsx, Footer.jsx, Container.jsx
- Profile/: Hero.jsx, About.jsx, Skills.jsx, Projects.jsx, ProjectCard.jsx, Experience.jsx, Education.jsx, Certifications.jsx, Contact.jsx, SocialLinks.jsx
- UI/: Button.jsx, Badge.jsx, Section.jsx, Modal.jsx, ThemeToggle.jsx

Components should be reusable. Avoid monolithic single-file components.

---

# 34. SECTION RENDERING

Do not hardcode sections as always visible. Example:
```jsx
{sections.about && <About />}
{sections.skills && <Skills />}
{sections.projects && <Projects />}
```
Section ordering must be configurable through sort_order. Render sections according to database configuration.

---

# 35. HERO SECTION

Display: Name, Professional Title, Tagline, Short introduction, Primary CTA, Secondary CTA, Social links.
Content must come from the profile. Do not hardcode role names.

---

# 36. ABOUT SECTION

Display the about field from the active profile. Content may differ per profile.

---

# 37. SKILLS SECTION

Display selected skills for the active profile. Support grouping by category.
Each skill: Name, Category, Icon, Description.

---

# 38. PROJECT SECTION

Support: Thumbnail, Title, Short description, Technologies, GitHub URL, Demo URL, Featured status.
Featured projects appear first. Project ordering must respect profile_project.sort_order.

---

# 39. PROJECT CARD

Include: Image, Title, Short Description, Technology Tags, GitHub Button, Live Demo Button.

---

# 40. PROJECT DETAIL PAGE (/projects/{slug})

Display: Project Title, Thumbnail, Description, Technologies, GitHub, Live Demo, Status, Start Date, End Date.

---

# 41. EXPERIENCE SECTION

Display: Company, Position, Description, Start Date, End Date, Current Status. Sort by profile-specific ordering.

---

# 42. EDUCATION SECTION

Display: Institution, Degree, Field, Description, Start Date, End Date.

---

# 43. CERTIFICATIONS SECTION

Display: Certification, Issuer, Issue Date, Expiration Date, Credential ID, Credential URL.

---

# 44. CONTACT SECTION

Support: Email, Social Links, Optional contact form. Contact form is NOT required for MVP.

---

# 45. ADMIN PANEL (Filament)

Required resources: ProfileResource, ProjectResource, SkillResource, ExperienceResource, EducationResource, CertificationResource, SocialLinkResource.

---

# 46. PROFILE RESOURCE FIELDS

General: Name, Slug, Title, Tagline, About, Location, Email, Phone.
SEO: Meta Title, Meta Description, OG Image.
Sections: Enable/Disable, Ordering.
Projects: Select projects, Change order, Mark featured.
Skills: Select skills, Change order, Mark featured.
Experiences: Select experiences, Change order.

---

# 47. PROFILE ADMIN ACTIONS

Create, Edit, Delete, Activate, Deactivate, Duplicate, Set as Default, Preview.

---

# 48. PROJECT RESOURCE ACTIONS

Create, Edit, Delete, Upload Thumbnail, Set GitHub URL, Set Demo URL, Set Status, Set Start/End Date, Assign Technologies.

---

# 49. IMAGE STORAGE

Use Laravel Storage. Store only file paths, not binary data in MySQL.
Paths: storage/app/public/projects/, storage/app/public/profiles/, storage/app/public/certifications/.
Run: php artisan storage:link.

All uploads must be validated: Allowed MIME types, Maximum file size, Image validation, Safe filenames. Do not trust the uploaded file extension.

---

# 50. SEO

Each profile must have: meta_title, meta_description, og_image.
Dynamically generate: title, meta description, og:title, og:description, og:image.

---

# 51. RESPONSIVE DESIGN

Support: Mobile, Tablet, Desktop, Large Desktop. Mobile is first-class. Do not design desktop-first.

---

# 52. DESIGN DIRECTION

Visual direction: Modern, Minimal, Professional, Developer-oriented, Clean, Fast, Readable.
Avoid: Excessive gradients/animations, Overly large text, Unnecessary glassmorphism, Excessive shadows, Template-like appearance.
The website should look like a real developer portfolio.

---

# 53. THEME

Support Light Mode and Dark Mode. Theme preference stored in browser local storage (NOT database).
Use Tailwind dark mode utilities: dark:bg-*, dark:text-*.

---

# 54. ANIMATION

Use sparingly: Fade in, Slide in, Hover states, Button/Card/Navigation transitions.
Avoid excessive animation that harms performance, accessibility, or readability.

---

# 55. ACCESSIBILITY

Use semantic HTML: header, nav, main, section, article, footer.
Proper heading hierarchy. Meaningful alt text. Keyboard accessible interactive elements.
Do not use clickable div elements when button/link is appropriate.

---

# 56. PERFORMANCE

Fast initial load, Optimized images, Lazy loading, Eager loading, Efficient DB queries, Caching, Asset optimization.
Avoid N+1 queries. Use eager loading for relationships.

---

# 57. DATABASE INDEXING

Index: profiles.slug, profiles.is_active, projects.slug, projects.is_active, profile_sections.profile_id, profile_sections.section_key, profile_project.profile_id, profile_project.project_id, profile_skill.profile_id, profile_skill.skill_id, profile_experience.profile_id, profile_experience.experience_id, skills.category.

---

# 58. FOREIGN KEYS

All relationships must use foreign keys with cascading deletes where appropriate.
profile_project.profile_id -> profiles.id ON DELETE CASCADE.
profile_project.project_id -> projects.id ON DELETE CASCADE.
Same for profile_skill, profile_experience, profile_sections, project_skill.

---

# 59. CASCADE RULES

Profile deleted: profile_sections, profile_project, profile_skill, profile_experience auto-deleted.
Project deleted: profile_project, project_skill auto-deleted.
Skill deleted: profile_skill, project_skill auto-deleted.

---

# 60. SOFT DELETE

May be used for: Projects, Skills, Experiences, Certifications.
Profiles should use is_active instead of immediate deletion.

---

# 61. VALIDATION

Profile: slug (required, unique, max:100), name (required, max:255), title (required, max:255).
Project: slug (required, unique), title (required), short_description (required).
Skill: name (required, unique), category (required).
URLs: Use URL validation where appropriate.

---

# 62. SECURITY

Implement: Authentication, Authorization, CSRF protection, Input validation, Mass-assignment protection, Password hashing, Rate limiting, Secure file uploads.
Only authorized users may access /admin.

---

# 63. HOME PAGE

/ loads the default active profile (profiles.is_default = true).
If no default, use the first active profile.

---

# 64. PROFILE STATUS

Inactive profiles must not be publicly accessible. /profile/inactive-profile returns 404.

---

# 65. DEFAULT PROFILE

Only one profile should be the default. Setting a profile as default must atomically remove default status from all others.

---

# 66. ORDERING LOGIC

Projects: profile_project.sort_order.
Skills: profile_skill.sort_order.
Experiences: profile_experience.sort_order.
Sections: profile_sections.sort_order.
Always respect these fields when rendering.

---

# 67. FEATURED LOGIC

Featured projects: determined by profile_project.is_featured (NOT projects.is_featured).
Featured skills: determined by profile_skill.is_featured.
A project/skill may be featured for one profile but not another.

---

# 68. URL STRUCTURE

Use clean URLs: /profile/frontend, /projects/phishguard.
Avoid: /profile?id=1, /project?id=12.

Slug rules: Lowercase, Hyphen-separated, Unique, URL-safe.

---

# 69. NAVIGATION

Navbar: Logo/Name, About, Skills, Projects, Experience, Contact, Theme Toggle.
Mobile: collapsible navigation menu.
Menu items should respect enabled profile sections.

---

# 70. FOOTER

Contains: Name, Copyright, Social links, Optional short description.
Example: (c) 2026 Ragam. All rights reserved.

---

# 71. STATE MANAGEMENT

Do not introduce Redux by default.
Prefer: React props, Inertia props, React state, Context.
Use Zustand only if genuinely complex client-side state is needed.

---

# 72. ROUTING

Laravel is responsible for primary application routing.
Do not introduce React Router for the public portfolio.
Use Laravel routes + Inertia pages.

---

# 73. ERROR HANDLING

Implement handling for: 404, 403, 419, 422, 500.
Create professional error pages matching the portfolio design.
Handle empty states gracefully (No projects available, No certifications, etc.).

---

# 74. SEED DATA

Profiles: Frontend Developer, Backend Developer, Fullstack Developer.
Projects: Portfolio Platform, PhishGuard, Image Sorter, Audiophile Tool, Unity Game.
Skills: HTML, CSS, JavaScript, React, Tailwind CSS, Laravel, PHP, Python, Flask, MySQL, XGBoost, Git, Unity, Blender.
Experiences: realistic development placeholder data.

---

# 75. FACTORIES

Create factories for: Profile, Project, Skill, Experience, Education, Certification. Primarily for testing.

---

# 76. TESTING

Minimum tests:
- Profile can be accessed using slug
- Inactive profile cannot be publicly accessed
- Default profile loads on homepage
- Projects/Skills/Experiences belong to profiles
- Profile duplication works correctly
- Project technologies are loaded
- Admin authorization works

---

# 77. DEVELOPMENT PHASES

Phase 1: Project Setup (Laravel, React, Inertia, Tailwind, Filament, MySQL).
Phase 2: Database (all tables, migrations, models, relationships, factories, seeders).
Phase 3: Admin Panel (all Filament Resources + duplication, relationship management, section ordering).
Phase 4: Public Website (Homepage, Profile page, Project detail page).
Phase 5: Profile System (dynamic profiles, sections, ordering, featured items, duplication).
Phase 6: UI Polish (responsive, dark mode, animations, empty/error states).
Phase 7: SEO (dynamic title, meta description, Open Graph, canonical URL, semantic HTML).
Phase 8: Performance (images, DB queries, eager loading, asset loading, caching).
Phase 9: Testing (authentication, authorization, profile rendering/switching/duplication).
Phase 10: Deployment (production environment, migrations, storage link, cache).

---

# 78. DEPLOYMENT REQUIREMENTS

Production: PHP, Composer, Node.js, NPM, MySQL, Web server (Nginx recommended), SSL.
Environment: Use .env, provide .env.example without real credentials.

---

# 79. API POLICY

A REST API is NOT required for MVP. Do not build API endpoints merely because the project uses React.
Use Laravel + Inertia + React for the primary application.
API may be introduced later for: Mobile app, External integrations, Third-party clients.

---

# 80. CODE QUALITY

Prioritize: Readable code, small functions, clear naming, reusable components, proper relationships, validation, security.
Avoid: Duplicated code, massive controllers, massive React components, hardcoded content.

---

# 81. NO HARDCODED LOGIC

Do NOT implement: if ($slug === 'frontend') { ... }
Do NOT write hardcoded project/skill arrays.

Bad:  <h1>Frontend Developer</h1>
Good: <h1>{profile.title}</h1>

Bad:  <PhishGuardCard />
Good: <ProjectCard project={project} />

---

# 82. FEATURES NOT NEEDED BY DEFAULT

Do not add: Redux, GraphQL, Microservices, Separate API server, React Router, Redis, Elasticsearch, WebSockets, Docker, Complex state management. Avoid overengineering.

---

# 83. ARCHITECTURE SCOPE

The application is a portfolio CMS. It is NOT a SaaS platform, multi-tenant application, social network, or enterprise CMS. Keep the architecture appropriate for the project's actual scope.

---

# 84. FINAL STACK

Backend: Laravel | Frontend: React | Bridge: Inertia.js | CSS: Tailwind CSS | Admin: Filament | Database: MySQL | Icons: Lucide | Build: Vite.

---

# 85. FINAL DEVELOPMENT PRINCIPLE

> Content should be data-driven, not hardcoded.

The application must allow the owner to change the target job role and portfolio contents entirely through the admin panel.

A developer should NOT need to modify React components, Laravel controllers, routes, or database structure when creating a new portfolio profile.

The system must be designed so that adding /profile/frontend, /profile/backend, /profile/fullstack, /profile/software-engineer, /profile/machine-learning, or any custom role requires only database/admin changes. No source-code modification should be required.