import Container from './Container';
import SocialLinks from '../Profile/SocialLinks';

export default function Footer({ profile = {}, socialLinks = [] }) {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-12 transition-colors">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Name & Copyright */}
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {profile.name || 'Developer Portfolio'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            © {year} {profile.name || 'Developer'}. All rights reserved.
                        </p>
                    </div>

                    {/* Right: Social Links */}
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
