<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @if (isset($page['props']['seo']))
            @include('partials.seo', ['seo' => $page['props']['seo']])
        @endif
        <script type="text/javascript">
            (function () {
                try {
                    const stored = localStorage.getItem('portfolio_theme');
                    if (stored === 'light') {
                        document.documentElement.classList.remove('dark');
                    } else if (stored === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                        document.documentElement.classList.remove('dark');
                    } else {
                        document.documentElement.classList.add('dark');
                    }
                } catch (e) {
                    document.documentElement.classList.add('dark');
                }
            })();
        </script>
        @inertiaHead
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
