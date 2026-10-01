import SeoHead from '../../Components/SeoHead';
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
    seo,
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

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-700 antialiased selection:bg-accent-500/25 selection:text-white transition-colors duration-200 dark:bg-dark-900 dark:text-gray-300">
            {/* Dynamic SEO Meta Tags */}
            <SeoHead seo={seo} />

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

                    return (
                        <Container key={`${sectionKey}-container`}>
                            {component}
                        </Container>
                    );
                })}
            </main>

            {/* Footer */}
            <Footer profile={profile} socialLinks={social_links} />
        </div>
    );
}
