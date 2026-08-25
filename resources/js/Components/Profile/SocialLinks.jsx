import {
    Github,
    Linkedin,
    Mail,
    Twitter,
    Instagram,
    Youtube,
    Globe,
    ExternalLink,
} from 'lucide-react';

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    mail: Mail,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    website: Globe,
};

export default function SocialLinks({ links = [], size = 'md', className = '' }) {
    if (!links || links.length === 0) return null;

    const sizeClasses = {
        sm: 'w-8 h-8 p-1.5 text-xs',
        md: 'w-10 h-10 p-2.5 text-sm',
        lg: 'w-12 h-12 p-3 text-base',
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <div className={`flex items-center gap-3 flex-wrap ${className}`}>
            {links.map((link) => {
                const IconComponent = iconMap[link.platform?.toLowerCase()] || iconMap[link.icon?.toLowerCase()] || Globe;

                return (
                    <a
                        key={link.id || link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-850 hover:bg-primary-100 dark:hover:bg-primary-950/60 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-200/80 dark:border-gray-800 transition-all duration-200 hover:scale-110 shadow-sm ${sizeClasses[size] || sizeClasses.md}`}
                        title={link.label || link.platform}
                        aria-label={link.label || link.platform}
                    >
                        <IconComponent className={iconSizes[size] || iconSizes.md} />
                    </a>
                );
            })}
        </div>
    );
}
