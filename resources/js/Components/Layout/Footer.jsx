import Container from './Container';
import SocialLinks from '../Profile/SocialLinks';

export default function Footer({ profile = {}, socialLinks = [] }) {
    const currentYear = new Date().getFullYear();
    const name = profile.name || 'Portfolio';

    return (
        <footer className="border-t border-dark-600/60 bg-dark-900/80 py-10 mt-20">
            <Container>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Brand / Name */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center font-bold text-dark-900 text-xs">
                            <svg className="w-4 h-4 text-dark-900" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 3h6a7 7 0 0 1 0 14H4V3zm2.5 2.5v9H10a4.5 4.5 0 0 0 0-9H6.5z" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-white tracking-wide">
                            {name}
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                        &copy; {currentYear} {name}. All rights reserved.
                    </p>

                    {/* Social Links */}
                    {socialLinks && socialLinks.length > 0 && (
                        <div>
                            <SocialLinks links={socialLinks} size="sm" />
                        </div>
                    )}
                </div>
            </Container>
        </footer>
    );
}
