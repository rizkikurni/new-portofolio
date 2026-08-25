import Section from '../UI/Section';
import ProjectCard from './ProjectCard';
import { FolderGit2 } from 'lucide-react';

export default function Projects({ projects = [] }) {
    if (!projects || projects.length === 0) return null;

    // Featured projects appear first per Spec Section 39
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return (a.sort_order ?? 0) - (b.sort_order ?? 0);
    });

    return (
        <Section
            id="projects"
            title="Selected Projects"
            subtitle="A showcase of work, side projects, and open-source contributions."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </Section>
    );
}
