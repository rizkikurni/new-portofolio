export default function Button({
    children,
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    icon: Icon,
    iconPosition = 'left',
    external = false,
    ...props
}) {
    const baseStyles =
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 active:scale-[0.98]';

    const variants = {
        primary:
            'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 border border-primary-500/50',
        secondary:
            'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-850 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-gray-300 dark:hover:border-gray-700',
        outline:
            'bg-transparent text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/40 border border-primary-300 dark:border-primary-800',
        ghost:
            'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
    };

    const sizes = {
        sm: 'px-3.5 py-1.5 text-xs gap-1.5',
        md: 'px-5 py-2.5 text-sm gap-2',
        lg: 'px-6 py-3.5 text-base gap-2.5',
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const content = (
        <>
            {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
            <span>{children}</span>
            {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={combinedClasses}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {content}
        </button>
    );
}
