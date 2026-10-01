import { useEffect, useState } from 'react';

export function useTheme() {
    const [theme, setThemeState] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        const stored = localStorage.getItem('portfolio_theme');
        if (stored === 'light' || stored === 'dark') return stored;
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });

    const applyTheme = (newTheme) => {
        const root = document.documentElement;
        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        try {
            localStorage.setItem('portfolio_theme', newTheme);
        } catch {
            // ignore localStorage quota or privacy errors
        }
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        applyTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        // Sync with class in html root on mount
        const isDark = document.documentElement.classList.contains('dark');
        setThemeState(isDark ? 'dark' : 'light');

        // Listen for storage changes across tabs
        const handleStorage = (e) => {
            if (e.key === 'portfolio_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
                applyTheme(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme: applyTheme,
    };
}

export default useTheme;
