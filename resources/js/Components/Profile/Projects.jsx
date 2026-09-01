import Section from '../UI/Section';
import ProjectCard from './ProjectCard';

export default function Projects({ projects = [] }) {
    if (!projects || projects.length === 0) return null;

    return (
        <Section
            id="projects"
            tag="Portfolio"
            title="All Creative Works, Selected projects."
            subtitle="A curated selection of applications, systems, and design projects built with craft and precision."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </Section>
    );
}
