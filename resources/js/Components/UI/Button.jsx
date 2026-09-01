const variants = {
    accent: 'bg-accent-500 hover:bg-accent-400 text-dark-900 font-bold',
    dark: 'bg-dark-700 hover:bg-dark-600 text-white border border-dark-600',
    ghost: 'bg-transparent hover:bg-dark-700 text-gray-300 hover:text-white',
    link: 'bg-transparent text-accent-500 hover:text-accent-400 underline underline-offset-4 decoration-accent-500/50',
};

const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-sm',
};

export default function Button({
    children,
    variant = 'accent',
    size = 'md',
    href,
    external = false,
    icon: Icon,
    className = '',
    ...props
}) {
    const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors ${variants[variant] || variants.accent} ${sizes[size] || sizes.md} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                className={classes}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
            >
                {children}
                {Icon && <Icon className="w-4 h-4" />}
            </a>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
            {Icon && <Icon className="w-4 h-4" />}
        </button>
    );
}
