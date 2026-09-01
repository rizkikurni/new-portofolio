import { Head } from '@inertiajs/react';
import Navbar from '../../Components/Layout/Navbar';
import Footer from '../../Components/Layout/Footer';
import Container from '../../Components/Layout/Container';

import Hero from '../../Components/Profile/Hero';
import ServicesGrid from '../../Components/Profile/ServicesGrid';
import About from '../../Components/Profile/About';
import Skills from '../../Components/Profile/Skills';
import Projects from '../../Components/Profile/Projects';
import Experience from '../../Components/Profile/Experience';
import Education from '../../Components/Profile/Education';
import Certifications from '../../Components/Profile/Certifications';
import TestimonialQuote from '../../Components/Profile/TestimonialQuote';
import Contact from '../../Components/Profile/Contact';

export default function Show({
    profile = {},
    sections = [],
    projects = [],
    skills = [],
    skills_by_category = {},
    experiences = [],
    educations = [],
    certifications = [],
    social_links = [],
}) {
    // Map section key to its React component renderer
    const sectionComponentMap = {
        hero: (
            <div key="hero-group">
                <Hero profile={profile} socialLinks={social_links} />
                <ServicesGrid profile={profile} projects={projects} skills={skills} />
            </div>
        ),
        about: (
            <About key="about" aboutText={profile.about} />
        ),
        skills: (
            <Skills key="skills" skillsByCategory={skills_by_category} skills={skills} />
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
            <div key="contact-group">
                <TestimonialQuote profile={profile} />
                <Contact profile={profile} socialLinks={social_links} />
            </div>
        ),
    };

    // Sort enabled sections based on sort_order from database
    const sortedEnabledSections = sections && sections.length > 0
        ? [...sections]
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((s) => (typeof s === 'string' ? s : s.key))
        : ['hero', 'projects', 'experience', 'skills', 'education', 'certifications', 'contact'];

    return (
        <div className="min-h-screen bg-dark-900 text-gray-300 font-sans antialiased selection:bg-accent-500/20 selection:text-accent-400">
            {/* Dynamic SEO Meta Tags */}
            <Head>
                <title>{profile.meta_title || `${profile.name || 'Carlos Mendoza'} — ${profile.title || 'Portfolio'}`}</title>
                <meta name="description" content={profile.meta_description || profile.tagline || ''} />
                <meta property="og:title" content={profile.meta_title || `${profile.name || 'Carlos Mendoza'} — ${profile.title || 'Portfolio'}`} />
                <meta property="og:description" content={profile.meta_description || profile.tagline || ''} />
                {profile.og_image && <meta property="og:image" content={profile.og_image} />}
            </Head>

            {/* Navbar */}
            <Navbar title={profile.name || 'Portfolio'} sections={sections} />

            {/* Main Content Area */}
            <main className="relative z-10">
                <Container>
                    {sortedEnabledSections.map((sectionKey) => {
                        const component = sectionComponentMap[sectionKey];
                        return component || null;
                    })}
                </Container>
            </main>

            {/* Footer */}
            <Footer profile={profile} socialLinks={social_links} />
        </div>
    );
}
