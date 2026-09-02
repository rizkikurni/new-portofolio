import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight, Calendar, CheckCircle2, Code2, Github } from 'lucide-react';
import Navbar from '../../Components/Layout/Navbar';
import Footer from '../../Components/Layout/Footer';
import Container from '../../Components/Layout/Container';

const caseStudySections = [
    { key: 'challenge', eyebrow: 'The challenge', title: 'What needed to be solved' },
    { key: 'solution', eyebrow: 'The solution', title: 'How I approached it' },
    { key: 'impact', eyebrow: 'The outcome', title: 'What the project achieved' },
];

export default function Show({ project = {}, social_links = [] }) {
    const hasCaseStudy = caseStudySections.some(({ key }) => project[key]);

    return (
        <div className="min-h-screen overflow-x-hidden bg-dark-900 font-sans text-gray-300 antialiased selection:bg-accent-500/25 selection:text-white">
            <Head>
                <title>{`${project.title || 'Project'} — Case Study`}</title>
                <meta name="description" content={project.short_description || ''} />
            </Head>

            <Navbar title="Portfolio" homeUrl="/" />

            <main className="pt-32 sm:pt-36">
                <Container>
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Back to portfolio
                    </Link>

                    <header className="grid gap-10 py-14 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:gap-20 lg:py-20">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-accent-500">
                                {project.role && <span>{project.role}</span>}
                                {project.role && project.status && <span className="h-1 w-1 rounded-full bg-gray-600" />}
                                {project.status && <span className="capitalize text-gray-400">{project.status}</span>}
                            </div>
                            <h1 className="mt-5 max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">{project.title}</h1>
                            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl">{project.short_description}</p>
                        </div>

                        <div className="space-y-5 border-l border-white/10 pl-6">
                            {(project.start_date || project.end_date) && (
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Timeline</p>
                                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white"><Calendar className="h-4 w-4 text-accent-500" /> {project.start_date || '—'} — {project.end_date || 'Present'}</p>
                                </div>
                            )}
                            {project.skills?.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Core stack</p>
                                    <p className="mt-2 text-sm font-semibold leading-6 text-white">{project.skills.slice(0, 5).map((skill) => skill.name).join(' · ')}</p>
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-dark-800">
                        {project.thumbnail ? (
                            <img src={project.thumbnail} alt={`${project.title} preview`} className="aspect-video w-full object-cover" />
                        ) : (
                            <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,112,77,0.18),transparent_35%),linear-gradient(145deg,#292b31,#18191d)]">
                                <span className="text-8xl font-black tracking-[-0.08em] text-white/10">{project.title?.slice(0, 2).toUpperCase() || 'PR'}</span>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-14 py-20 lg:grid-cols-[1fr_0.38fr] lg:gap-20 lg:py-28">
                        <div className="space-y-16">
                            {project.description && (
                                <section>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-500">Overview</p>
                                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">About the project</h2>
                                    <div className="portfolio-prose mt-6 text-base leading-8 text-gray-300" dangerouslySetInnerHTML={{ __html: project.description }} />
                                </section>
                            )}

                            {hasCaseStudy && caseStudySections.map(({ key, eyebrow, title }) => project[key] && (
                                <section key={key} className="border-t border-white/10 pt-10">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-500">{eyebrow}</p>
                                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">{title}</h2>
                                    <div className="portfolio-prose mt-6 text-base leading-8 text-gray-300" dangerouslySetInnerHTML={{ __html: project[key] }} />
                                </section>
                            ))}
                        </div>

                        <aside className="h-fit rounded-3xl border border-white/10 bg-dark-800 p-6 lg:sticky lg:top-28">
                            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                                <Code2 className="h-5 w-5 text-accent-500" />
                                <h2 className="font-bold text-white">Project details</h2>
                            </div>
                            {project.skills?.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.skills.map((skill) => <span key={skill.id} className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-gray-300">{skill.name}</span>)}
                                </div>
                            )}
                            <div className="mt-6 space-y-3">
                                {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-dark-900 transition-colors hover:bg-accent-400">View live project <ArrowUpRight className="h-4 w-4" /></a>}
                                {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5"><Github className="h-4 w-4" /> View source code</a>}
                            </div>
                            {project.status && <p className="mt-5 flex items-center gap-2 text-xs font-medium capitalize text-gray-400"><CheckCircle2 className="h-4 w-4 text-accent-500" /> {project.status}</p>}
                        </aside>
                    </div>

                    {project.media?.length > 0 && (
                        <section className="border-t border-white/10 py-20 md:py-28">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-500">Gallery</p>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">A closer look at the product.</h2>
                            <div className="mt-10 grid gap-6 md:grid-cols-2">
                                {project.media.map((media, index) => (
                                    <figure key={media.id} className={`${index === 0 ? 'md:col-span-2' : ''} overflow-hidden rounded-3xl border border-white/10 bg-dark-800`}>
                                        <img src={media.url} alt={media.alt_text || `${project.title} screenshot ${index + 1}`} loading="lazy" className="w-full object-cover" />
                                        {media.caption && <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-gray-400">{media.caption}</figcaption>}
                                    </figure>
                                ))}
                            </div>
                        </section>
                    )}
                </Container>
            </main>

            <Footer socialLinks={social_links} />
        </div>
    );
}
