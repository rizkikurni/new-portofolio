import { Head } from '@inertiajs/react';
import Navbar from '../../Components/Layout/Navbar';
import Footer from '../../Components/Layout/Footer';
import Container from '../../Components/Layout/Container';
import Badge from '../../Components/UI/Badge';
import Button from '../../Components/UI/Button';

import {
    ArrowLeft,
    Github,
    ExternalLink,
    Calendar,
    Code2,
    CheckCircle2,
} from 'lucide-react';

export default function Show({ project = {}, social_links = [] }) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-primary-500/20 selection:text-primary-600 transition-colors">
            {/* Dynamic SEO Meta Tags */}
            <Head>
                <title>{`${project.title} — Project Details`}</title>
                <meta name="description" content={project.short_description || ''} />
            </Head>

            {/* Navbar */}
            <Navbar title="Portfolio" />

            <main className="pt-28 pb-20 md:pt-36 md:pb-28">
                <Container>
                    {/* Back Link */}
                    <div className="mb-8">
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Portfolio</span>
                        </a>
                    </div>

                    {/* Header */}
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3">
                            {project.status && (
                                <Badge
                                    variant={project.status === 'completed' ? 'success' : 'secondary'}
                                    className="capitalize px-3 py-1"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{project.status}</span>
                                </Badge>
                            )}

                            {(project.start_date || project.end_date) && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {project.start_date} {project.end_date ? `– ${project.end_date}` : '– Present'}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            {project.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {project.short_description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mt-6">
                        {project.demo_url && (
                            <Button
                                href={project.demo_url}
                                variant="primary"
                                size="lg"
                                icon={ExternalLink}
                                external
                            >
                                Live Demo
                            </Button>
                        )}
                        {project.github_url && (
                            <Button
                                href={project.github_url}
                                variant="secondary"
                                size="lg"
                                icon={Github}
                                external
                            >
                                GitHub Repository
                            </Button>
                        )}
                    </div>

                    {/* Thumbnail Banner */}
                    <div className="mt-10 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-xl bg-gray-100 dark:bg-gray-900 aspect-video max-h-[480px] w-full">
                        {project.thumbnail ? (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-900/10 via-violet-900/10 to-gray-900">
                                <span className="text-6xl font-black text-gray-300 dark:text-gray-700 tracking-widest">
                                    {project.title ? project.title.substring(0, 2) : 'PR'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Main Content Grid */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Description Body Left */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                About the Project
                            </h2>

                            {project.description ? (
                                <div
                                    className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                    {project.short_description}
                                </p>
                            )}
                        </div>

                        {/* Sidebar Right */}
                        <div className="space-y-6">
                            {/* Technologies Card */}
                            {project.skills && project.skills.length > 0 && (
                                <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                                        <Code2 className="w-5 h-5 text-primary-500" />
                                        <h3 className="font-bold text-gray-900 dark:text-white">
                                            Technologies Used
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.skills.map((sk) => (
                                            <Badge key={sk.id} variant="secondary" className="py-1.5 px-3">
                                                {sk.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </main>

            {/* Footer */}
            <Footer socialLinks={social_links} />
        </div>
    );
}
