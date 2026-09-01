import { useState, useEffect } from 'react';
import Container from './Container';
import { Menu, X } from 'lucide-react';

export default function Navbar({ title = 'Portfolio', sections = [] }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Nav items derived from enabled sections
    const allNavItems = [
        { key: 'services', label: 'Services' },
        { key: 'projects', label: 'Works' },
        { key: 'experience', label: 'Experience' },
    ];

    const navItems = allNavItems.filter((item) => {
        if (!sections || sections.length === 0) return true;
        if (item.key === 'services') return true;
        return sections.some((s) => (typeof s === 'string' ? s : s.key) === item.key);
    });

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-dark-900/90 backdrop-blur-md border-b border-dark-600/50 py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <Container>
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex items-center justify-between">
                        {/* Logo Mark — "D" shape in golden yellow */}
                        <a href="#" className="flex items-center group">
                            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center">
                                <svg className="w-5 h-5 text-dark-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 3h6a7 7 0 0 1 0 14H4V3zm2.5 2.5v9H10a4.5 4.5 0 0 0 0-9H6.5z" />
                                </svg>
                            </div>
                        </a>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-10">
                            {navItems.map((item) => (
                                <a
                                    key={item.key}
                                    href={`#${item.key}`}
                                    className="text-[13px] font-semibold text-gray-400 hover:text-white tracking-wide transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-gray-400 hover:text-white"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile Drawer */}
                    {mobileOpen && (
                        <div className="md:hidden mt-4 py-4 px-2 bg-dark-700 border border-dark-600 rounded-2xl">
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <a
                                        key={item.key}
                                        href={`#${item.key}`}
                                        onClick={() => setMobileOpen(false)}
                                        className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-xl transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
}
