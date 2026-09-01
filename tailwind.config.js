/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'DM Sans', 'system-ui', 'sans-serif'],
                display: ['Plus Jakarta Sans', 'DM Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
            },
            colors: {
                accent: {
                    400: 'var(--accent-400)',
                    500: 'var(--accent-500)',
                    600: 'var(--accent-600)',
                    DEFAULT: 'var(--accent-500)',
                },
                dark: {
                    900: 'var(--dark-900)',
                    800: 'var(--dark-800)',
                    700: 'var(--dark-700)',
                    600: 'var(--dark-600)',
                    500: 'var(--dark-500)',
                    DEFAULT: 'var(--dark-900)',
                },
            },
            borderColor: {
                DEFAULT: 'var(--border-color)',
            },
        },
    },
    plugins: [],
};
