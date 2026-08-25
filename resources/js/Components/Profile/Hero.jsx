import Button from '../UI/Button';
import SocialLinks from './SocialLinks';
import { ArrowDown, Send, Sparkles, MapPin, Code2, FolderGit2, Cpu } from 'lucide-react';

export default function Hero({ profile = {}, socialLinks = [] }) {
    return (
        <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
            {/* Background Grid & Ambient Glows */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 pointer-events-none -z-10" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
            <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
                {/* Content Left */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    {/* Status Badge with Live Pulse */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-sm animate-fade-in">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                        <span>Available for Hire & Projects</span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-3">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            Hi, I'm <span className="text-gradient-primary">{profile.name || 'Developer'}</span>
                        </h1>
                        <p className="text-2xl sm:text-3xl font-display font-bold text-slate-700 dark:text-slate-300">
                            {profile.title || 'Software Engineer'}
                        </p>
                    </div>

                    {/* Tagline */}
                    {profile.tagline && (
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-sans">
                            {profile.tagline}
                        </p>
                    )}

                    {/* Location */}
                    {profile.location && (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 pt-1">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            <span>Based in {profile.location}</span>
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3">
                        <Button href="#projects" variant="primary" size="lg" icon={ArrowDown} iconPosition="right">
                            View Projects
                        </Button>
                        <Button href="#contact" variant="secondary" size="lg" icon={Send}>
                            Get in Touch
                        </Button>
                    </div>

                    {/* Stat Metrics Bar */}
                    <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0">
                        <div className="text-center md:text-left">
                            <p className="text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                5+
                            </p>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                                Featured Projects
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                20+
                            </p>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                                Tech Stack Skills
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                100%
                            </p>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                                Dedicated Code
                            </p>
                        </div>
                    </div>

                    {/* Social Links */}
                    {socialLinks && socialLinks.length > 0 && (
                        <div className="pt-4">
                            <SocialLinks links={socialLinks} size="md" />
                        </div>
                    )}
                </div>

                {/* Avatar / Visual Card Right */}
                <div className="shrink-0 relative">
                    <div className="relative group">
                        {/* Glow Backdrop */}
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />

                        {profile.avatar ? (
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-2xl"
                            />
                        ) : (
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center shadow-2xl">
                                <span className="text-7xl font-display font-black text-gradient-primary">
                                    {profile.name ? profile.name.charAt(0) : 'D'}
                                </span>
                            </div>
                        )}

                        {/* Floating Badge 1 */}
                        <div className="absolute -top-4 -left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 shadow-xl flex items-center gap-2.5 animate-float">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                                <Code2 className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-900 dark:text-white">Clean Code</p>
                                <p className="text-[10px] text-slate-500">Structured & Scalable</p>
                            </div>
                        </div>

                        {/* Floating Badge 2 */}
                        <div className="absolute -bottom-4 -right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 shadow-xl flex items-center gap-2.5 animate-float" style={{ animationDelay: '2s' }}>
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <FolderGit2 className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-900 dark:text-white">Architecture</p>
                                <p className="text-[10px] text-slate-500">Best Practices</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
