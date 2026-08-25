import Badge from '../UI/Badge';
import { Github, ExternalLink, ArrowRight, Star, Layers } from 'lucide-react';

export default function ProjectCard({ project = {} }) {
    return (
        <article className="group pro-card pro-card-glow p-0 flex flex-col h-full overflow-hidden">
            {/* Thumbnail / Image Header */}
            <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-primary-50/20 to-indigo-50/20 dark:from-slate-900 dark:via-primary-950/20 dark:to-slate-900">
                        <span className="text-4xl font-display font-black text-slate-300 dark:text-slate-700 tracking-wider uppercase">
                            {project.title ? project.title.substring(0, 2) : 'PR'}
                        </span>
                    </div>
                )}

                {/* Featured Badge Overlay */}
                {project.is_featured && (
                    <div className="absolute top-3 left-3">
                        <Badge variant="featured" className="shadow-lg backdrop-blur-md bg-amber-500/90 text-white border-none">
                            <Star className="w-3.5 h-3.5 fill-white shrink-0" />
                            <span>Featured</span>
                        </Badge>
                    </div>
                )}

                {/* Status Badge Overlay */}
                {project.status && (
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant={project.status === 'completed' ? 'success' : 'secondary'}
                            className="capitalize shadow-lg backdrop-blur-md"
                        >
                            {project.status}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <a href={`/projects/${project.slug}`}>{project.title}</a>
                </h3>

                {/* Short Description */}
                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1 font-sans">
                    {project.short_description}
                </p>

                {/* Technology Tags */}
                {project.skills && project.skills.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                        {project.skills.slice(0, 4).map((sk) => (
                            <span
                                key={sk.id}
                                className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                            >
                                {sk.name}
                            </span>
                        ))}
                        {project.skills.length > 4 && (
                            <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                                +{project.skills.length - 4}
                            </span>
                        )}
                    </div>
                )}

                {/* Card Footer Links */}
                <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <a
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 group/link"
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex items-center gap-1.5">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="GitHub Repository"
                                aria-label="GitHub Repository"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="Live Demo"
                                aria-label="Live Demo"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
