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
            <Hero key="hero" profile={profile} socialLinks={social_links} />
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
            <Contact key="contact" profile={profile} socialLinks={social_links} />
        ),
    };

    // Sort enabled sections based on sort_order from database per Spec Section 35 & 123
    const sortedEnabledSections = [...sections]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((s) => (typeof s === 'string' ? s : s.key));

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-primary-500/20 selection:text-primary-600 transition-colors">
            {/* Dynamic SEO Meta Tags */}
            <Head>
                <title>{profile.meta_title || `${profile.name} — ${profile.title}`}</title>
                <meta name="description" content={profile.meta_description || profile.tagline || ''} />
                <meta property="og:title" content={profile.meta_title || `${profile.name} — ${profile.title}`} />
                <meta property="og:description" content={profile.meta_description || profile.tagline || ''} />
                {profile.og_image && <meta property="og:image" content={profile.og_image} />}
            </Head>

            {/* Navbar */}
            <Navbar title={profile.name || 'Portfolio'} sections={sections} />

            {/* Main Content Area */}
            <main>
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
