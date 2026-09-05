import { Head } from '@inertiajs/react';
import Navbar from '../../Components/Layout/Navbar';
import Footer from '../../Components/Layout/Footer';
import Container from '../../Components/Layout/Container';

import Hero from '../../Components/Profile/Hero';
import About from '../../Components/Profile/About';
import Skills from '../../Components/Profile/Skills';
import Projects from '../../Components/Profile/Projects';
import Experience from '../../Components/Profile/Experience';
import Education from '../../Components/Profile/Education';
import Certifications from '../../Components/Profile/Certifications';
import Contact from '../../Components/Profile/Contact';

export default function Show({
    profile = {},
    sections = [],
    projects = [],
    skills_by_category = {},
    experiences = [],
    educations = [],
    certifications = [],
    social_links = [],
}) {
    // Map section key to its React component renderer
    const sectionComponentMap = {
        hero: (
            <Hero
                key="hero"
                profile={profile}
                socialLinks={social_links}
                hasProjects={projects.length > 0}
            />
        ),
        about: (
            <About key="about" aboutText={profile.about} />
        ),
        skills: (
            <Skills key="skills" skillsByCategory={skills_by_category} />
        ),
        projects: (
            <Projects key="projects" projects={projects} />
        ),
        experience: (
            <Experience key="experience" experiences={experiences} />
        ),
        education: (
            <Education key="education" educations={educations} />
        ),
        certifications: (
            <Certifications key="certifications" certifications={certifications} />
        ),
        contact: (
            <Contact key="contact" profile={profile} socialLinks={social_links} />
        ),
    };

    // Sort enabled sections based on sort_order from database
    const sortedEnabledSections = sections && sections.length > 0
        ? [...sections]
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((s) => (typeof s === 'string' ? s : s.key))
        : ['hero', 'projects', 'experience', 'skills', 'about', 'education', 'certifications', 'contact'];

    const sectionHasContent = {
        hero: true,
        about: Boolean(profile.about),
        skills: Object.keys(skills_by_category || {}).length > 0,
        projects: projects.length > 0,
        experience: experiences.length > 0,
        education: educations.length > 0,
        certifications: certifications.length > 0,
        contact: Boolean(profile.email) || social_links.length > 0,
    };

    const visibleSectionKeys = sortedEnabledSections.filter(
        (sectionKey) => sectionComponentMap[sectionKey] && sectionHasContent[sectionKey],
    );

    const contentSectionKeys = visibleSectionKeys.filter((sectionKey) => sectionKey !== 'hero');

    return (
        <div className="min-h-screen overflow-x-hidden bg-dark-900 font-sans text-gray-300 antialiased selection:bg-accent-500/25 selection:text-white">
            {/* Dynamic SEO Meta Tags */}
            <Head>
                <title>{profile.meta_title || `${profile.name || 'Developer'} — ${profile.title || 'Portfolio'}`}</title>
                <meta name="description" content={profile.meta_description || profile.tagline || ''} />
                <meta property="og:title" content={profile.meta_title || `${profile.name || 'Developer'} — ${profile.title || 'Portfolio'}`} />
                <meta property="og:description" content={profile.meta_description || profile.tagline || ''} />
                {profile.og_image && <meta property="og:image" content={profile.og_image} />}
                {profile.favicon_url && <link rel="icon" href={profile.favicon_url} />}
            </Head>

            {/* Navbar */}
            <Navbar
                title={profile.name || 'Portfolio'}
                logoUrl={profile.logo_url}
                sections={sections}
                resumeUrl={profile.resume_url}
                resumeLabel={profile.resume_label}
            />

            {/* Main Content Area */}
            <main>
                {visibleSectionKeys.map((sectionKey) => {
                    const component = sectionComponentMap[sectionKey];

                    if (sectionKey === 'hero') return component;

                    const sectionIndex = contentSectionKeys.indexOf(sectionKey);
                    const backgroundClass = sectionIndex % 2 === 0
                        ? 'bg-dark-900'
                        : 'bg-dark-800';

                    return (
                        <div key={`${sectionKey}-background`} className={backgroundClass}>
                            <Container>{component}</Container>
                        </div>
                    );
                })}
            </main>

            {/* Footer */}
            <Footer profile={profile} socialLinks={social_links} />
        </div>
    );
}
