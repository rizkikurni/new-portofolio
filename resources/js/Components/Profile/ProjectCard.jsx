import { Link } from '@inertiajs/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export default function ProjectCard({ project = {}, index = 0 }) {
    const skills = project.skills?.slice(0, 6) || [];
    const outcome = stripHtml(project.impact || '');

    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-accent-500/50 dark:border-white/10 dark:bg-dark-800 dark:shadow-none dark:hover:border-accent-500/35">
            <div className="grid md:grid-cols-[0.92fr_1.08fr]">
                <Link href={`/projects/${project.slug}`} className="relative min-h-72 overflow-hidden bg-slate-100 transition-colors dark:bg-dark-700 md:min-h-[380px] xl:min-h-[420px]" aria-label={`View ${project.title} case study`}>
                    {project.thumbnail ? (
                        <img src={project.thumbnail} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,112,77,0.18),transparent_35%),linear-gradient(145deg,#f1f5f9,#e2e8f0)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,112,77,0.18),transparent_35%),linear-gradient(145deg,#292b31,#18191d)]">
                            <span className="text-7xl font-black tracking-[-0.08em] text-slate-300 dark:text-white/10">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                    )}
                    <span className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800 shadow-sm backdrop-blur dark:border-white/15 dark:bg-dark-900/80 dark:text-white dark:shadow-none md:text-xs">
                        {project.is_featured ? 'Featured project' : `Project ${String(index + 1).padStart(2, '0')}`}
                    </span>
                </Link>

                <div className="flex flex-col justify-center p-7 sm:p-9 md:p-8 xl:p-12">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-gray-500 md:text-sm">
                        {project.role && <span>{project.role}</span>}
                        {project.role && project.status && <span className="h-1 w-1 rounded-full bg-accent-500" />}
                        {project.status && <span className="capitalize">{project.status}</span>}
                    </div>

                    <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 transition-colors dark:text-white sm:text-4xl">
                        {project.title || 'Untitled Project'}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 transition-colors dark:text-gray-400 sm:text-base md:text-[17px] md:leading-8 xl:text-lg">
                        {project.short_description}
                    </p>

                    {outcome && (
                        <div className="mt-6 flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors dark:border-dark-600 dark:bg-white/[0.025]">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                            <p className="line-clamp-3 text-sm leading-6 text-slate-700 transition-colors dark:text-gray-300 md:text-base md:leading-7">{outcome}</p>
                        </div>
                    )}

                    {skills.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span key={skill.id} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors dark:bg-white/5 dark:text-gray-300 md:text-sm">{skill.name}</span>
                            ))}
                        </div>
                    )}

                    <Link href={`/projects/${project.slug}`} className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-accent-500 transition-colors hover:text-accent-400 md:text-base">
                        View case study
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
