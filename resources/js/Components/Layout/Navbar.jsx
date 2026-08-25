import { useState, useEffect } from 'react';
import Container from './Container';
import ThemeToggle from '../UI/ThemeToggle';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar({ title = 'Portfolio', sections = [] }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filter section nav items based on enabled sections from database
    const navItems = [
        { key: 'about', label: 'About' },
        { key: 'skills', label: 'Skills' },
        { key: 'projects', label: 'Projects' },
        { key: 'experience', label: 'Experience' },
        { key: 'education', label: 'Education' },
        { key: 'certifications', label: 'Certifications' },
        { key: 'contact', label: 'Contact' },
    ].filter((item) => {
        if (!sections || sections.length === 0) return true;
        return sections.some((s) => (typeof s === 'string' ? s : s.key) === item.key);
    });

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'glass-header shadow-sm py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <Container>
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <a
                        href="#"
                        className="flex items-center gap-3 group focus:outline-none"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                            <Terminal className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                                {title}
                            </span>
                            <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">
                                Developer Portfolio
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={`#${item.key}`}
                                className="px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            type="button"
                            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileOpen && (
                    <div className="md:hidden mt-3 py-4 px-3 border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl animate-slide-up">
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.key}
                                    href={`#${item.key}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
}
