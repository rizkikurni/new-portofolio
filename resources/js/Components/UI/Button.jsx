const variants = {
    accent: 'bg-accent-500 hover:bg-accent-400 text-white dark:text-dark-900 font-bold shadow-sm',
    dark: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-white dark:border-dark-600',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 dark:hover:bg-dark-700 dark:text-gray-300 dark:hover:text-white',
    link: 'bg-transparent text-accent-500 hover:text-accent-400 underline underline-offset-4 decoration-accent-500/50',
};

const sizes = {
    sm: 'px-4 py-2 text-xs lg:text-sm',
    md: 'px-5 py-2.5 text-sm lg:text-base',
    lg: 'px-6 py-3 text-sm lg:text-base',
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
