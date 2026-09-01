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
        <div className="min-h-screen bg-dark-900 text-gray-300 font-sans antialiased selection:bg-accent-500/20 selection:text-accent-400">
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
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-accent-500 transition-colors group"
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
                                    variant={project.status === 'completed' ? 'accent' : 'dark'}
                                    className="capitalize px-3 py-1"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{project.status}</span>
                                </Badge>
                            )}

                            {(project.start_date || project.end_date) && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {project.start_date} {project.end_date ? `– ${project.end_date}` : '– Present'}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
                            {project.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                            {project.short_description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mt-8">
                        {project.demo_url && (
                            <Button
                                href={project.demo_url}
                                variant="accent"
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
                                variant="dark"
                                size="lg"
                                icon={Github}
                                external
                            >
                                GitHub Repository
                            </Button>
                        )}
                    </div>

                    {/* Thumbnail Banner */}
                    <div className="mt-12 rounded-3xl overflow-hidden border border-dark-600/80 bg-dark-800 aspect-video max-h-[500px] w-full shadow-2xl">
                        {project.thumbnail ? (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-700 to-dark-800">
                                <span className="text-6xl font-black text-dark-600 tracking-widest font-display">
                                    {project.title ? project.title.substring(0, 2).toUpperCase() : 'PR'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Main Content Grid */}
                    <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Description Body Left */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-2xl font-bold text-white">
                                About the Project
                            </h2>

                            {project.description ? (
                                <div
                                    className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                            ) : (
                                <p className="text-gray-400">
                                    {project.short_description}
                                </p>
                            )}
                        </div>

                        {/* Sidebar Right */}
                        <div className="space-y-6">
                            {/* Technologies Card */}
                            {project.skills && project.skills.length > 0 && (
                                <div className="bg-dark-700 border border-dark-600/80 rounded-3xl p-6 sm:p-8">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dark-600/60">
                                        <Code2 className="w-5 h-5 text-accent-500" />
                                        <h3 className="font-bold text-white">
                                            Technologies Used
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.skills.map((sk) => (
                                            <Badge key={sk.id} variant="dark">
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
