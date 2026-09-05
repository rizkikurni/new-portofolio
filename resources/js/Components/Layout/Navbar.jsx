import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import Container from './Container';

const NAV_ITEMS = [
    { key: 'projects', label: 'Projects' },
    { key: 'experience', label: 'Experience' },
    { key: 'skills', label: 'Skills' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' },
];

export default function Navbar({ title = 'Portfolio', logoUrl, sections = [], resumeUrl, resumeLabel = 'Download CV', homeUrl = '' }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const enabledKeys = sections.map((section) => typeof section === 'string' ? section : section.key);
    const navItems = NAV_ITEMS.filter((item) => enabledKeys.length === 0 || enabledKeys.includes(item.key));
    const initials = title.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/5 bg-dark-900/90 py-3 backdrop-blur-xl' : 'bg-transparent py-5'}`}>
            <Container>
                <div className="flex items-center justify-between gap-6">
                    <a href={`${homeUrl}#hero`} className="group flex items-center gap-3" aria-label="Back to portfolio">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold transition-transform group-hover:-rotate-3 lg:text-sm ${logoUrl ? 'overflow-hidden' : 'bg-accent-500 text-dark-900'}`}>
                            {logoUrl ? (
                                <img src={logoUrl} alt="" className="h-full w-full object-contain" />
                            ) : (initials || 'PF')}
                        </span>
                        <span className="hidden max-w-48 truncate text-sm font-bold text-white sm:block lg:text-base">{title}</span>
                    </a>

                    <div className="hidden items-center gap-7 lg:flex">
                        <nav className="flex items-center gap-7" aria-label="Primary navigation">
                            {navItems.map((item) => (
                                <a key={item.key} href={`${homeUrl}#${item.key}`} className="text-xs font-semibold tracking-wide text-gray-400 transition-colors hover:text-white lg:text-[15px]">
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {resumeUrl && (
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-dark-900 transition-colors hover:bg-accent-400 lg:text-sm">
                                <Download className="h-4 w-4" />
                                {resumeLabel}
                            </a>
                        )}
                    </div>

                    <button type="button" onClick={() => setMobileOpen((open) => !open)} className="rounded-lg border border-white/10 p-2 text-gray-300 transition-colors hover:text-white lg:hidden" aria-label="Toggle navigation" aria-expanded={mobileOpen}>
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-dark-800 p-3 shadow-2xl lg:hidden">
                        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                            {navItems.map((item) => (
                                <a key={item.key} href={`${homeUrl}#${item.key}`} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white">
                                    {item.label}
                                </a>
                            ))}
                            {resumeUrl && (
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-dark-900">
                                    <Download className="h-4 w-4" />
                                    {resumeLabel}
                                </a>
                            )}
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
}
