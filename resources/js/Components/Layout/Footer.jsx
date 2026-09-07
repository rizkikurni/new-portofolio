import Container from './Container';
import SocialLinks from '../Profile/SocialLinks';

export default function Footer({ profile = {}, socialLinks = [] }) {
    const currentYear = new Date().getFullYear();
    const name = profile.name || 'Portfolio';

    return (
        <footer className="mt-20 border-t border-dark-600/60 bg-dark-900/80 py-10 md:py-12">
            <Container>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Brand / Name */}
                    <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold md:text-sm ${profile.logo_url ? 'overflow-hidden' : 'bg-accent-500 text-dark-900'}`}>
                            {profile.logo_url ? (
                                <img src={profile.logo_url} alt="" className="h-full w-full object-contain" />
                            ) : (
                                <svg className="h-4 w-4 text-dark-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 3h6a7 7 0 0 1 0 14H4V3zm2.5 2.5v9H10a4.5 4.5 0 0 0 0-9H6.5z" />
                                </svg>
                            )}
                        </div>
                        <span className="text-sm font-semibold tracking-wide text-white md:text-base">
                            {name}
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className="text-center text-xs text-gray-500 sm:text-left md:text-sm">
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
