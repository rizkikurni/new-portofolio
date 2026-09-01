import {
    Globe,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Youtube,
    Facebook,
    Mail,
    Send,
} from 'lucide-react';

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    x: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    facebook: Facebook,
    mail: Mail,
    email: Mail,
    telegram: Send,
    dribbble: Globe,
    website: Globe,
};

export default function SocialLinks({ links = [], size = 'md' }) {
    if (!links || links.length === 0) return null;

    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-9 h-9 text-sm',
        lg: 'w-10 h-10 text-base',
    };

    const iconSizes = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-4.5 h-4.5',
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {links.map((link) => {
                const platformKey = link.platform?.toLowerCase() || '';
                const IconComponent = iconMap[platformKey] || Globe;

                return (
                    <a
                        key={link.id || link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label || link.platform}
                        className={`inline-flex items-center justify-center rounded-full border border-dark-600/80 bg-dark-800/60 text-gray-300 hover:text-accent-500 hover:border-accent-500/60 hover:bg-dark-700 transition-all ${sizeClasses[size] || sizeClasses.md}`}
                    >
                        <IconComponent className={iconSizes[size] || iconSizes.md} />
                    </a>
                );
            })}
        </div>
    );
}
