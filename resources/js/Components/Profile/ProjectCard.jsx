import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project = {} }) {
    const title = project.title || 'Untitled Project';
    const formattedTitle = title.endsWith('.') ? title : `${title}.`;
    const skillsList = project.skills?.map((s) => s.name).join(', ') || 'Design, Development';

    return (
        <a
            href={`/projects/${project.slug}`}
            className="group block bg-dark-700 border border-dark-600/80 hover:border-dark-500 rounded-3xl p-6 sm:p-8 transition-colors"
        >
            {/* Header: Title and Category */}
            <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-500 transition-colors leading-tight">
                        {formattedTitle}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                        {skillsList}
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-dark-800 border border-dark-600/80 flex items-center justify-center text-gray-400 group-hover:text-accent-500 group-hover:border-accent-500/50 transition-colors flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>

            {/* Mockup / Image Preview Frame */}
            <div className="rounded-2xl overflow-hidden bg-dark-900 border border-dark-600/50 aspect-[16/10] relative flex items-center justify-center p-3">
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl"
                    />
                ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/80 flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-4xl font-display font-black text-gray-600 mb-2">
                            {title.substring(0, 2).toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500 max-w-[200px] line-clamp-2">
                            {project.short_description || 'View project details and live demonstration'}
                        </span>
                    </div>
                )}
            </div>

            {/* Short Description */}
            {project.short_description && (
                <p className="mt-5 text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {project.short_description}
                </p>
            )}
        </a>
    );
}
