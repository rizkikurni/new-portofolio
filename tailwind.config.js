/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', 'system-ui', 'sans-serif'],
                display: ['Manrope', 'system-ui', 'sans-serif'],
                mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
            },
            colors: {
                accent: {
                    400: '#ff9a7a',
                    500: '#ff704d',
                    600: '#e55738',
                    DEFAULT: '#ff704d',
                },
                dark: {
                    900: '#18191d',
                    800: '#202126',
                    700: '#292b31',
                    600: '#3a3d45',
                    500: '#4b4f59',
                    DEFAULT: '#18191d',
                },
            },
            borderColor: {
                DEFAULT: '#3a3d45',
            },
        },
    },
    plugins: [],
};
