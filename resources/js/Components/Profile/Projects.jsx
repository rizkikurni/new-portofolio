import Section from '../UI/Section';
import ScrollReveal from '../UI/ScrollReveal';
import ProjectCard from './ProjectCard';

export default function Projects({ projects = [] }) {
    if (!projects.length) return null;

    const orderedProjects = [...projects].sort((a, b) => {
        if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
        return (a.sort_order ?? 0) - (b.sort_order ?? 0);
    });

    return (
        <Section
            id="projects"
            tag="Selected work"
            title="Projects that show how I think and build."
            subtitle="A focused selection of work, with context on the problem, my contribution, and the outcome."
        >
            <div className="space-y-6">
                {orderedProjects.map((project, index) => (
                    <ScrollReveal
                        key={project.id}
                        variant={index % 2 === 0 ? 'from-left' : 'from-right'}
                        delay={250 + Math.min(index, 2) * 80}
                    >
                        <ProjectCard project={project} index={index} />
                    </ScrollReveal>
                ))}
            </div>
        </Section>
    );
}
