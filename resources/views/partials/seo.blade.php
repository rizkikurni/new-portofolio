{{-- Inertia owns these tags after React mounts, avoiding duplicates on navigation. --}}
<title inertia="">{{ $seo['title'] }}</title>
<link inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">
@foreach ($seo['meta'] as $meta)
    @if (isset($meta['name']))
        <meta inertia="{{ $meta['key'] }}" name="{{ $meta['name'] }}" content="{{ $meta['content'] }}">
    @else
        <meta inertia="{{ $meta['key'] }}" property="{{ $meta['property'] }}" content="{{ $meta['content'] }}">
    @endif
@endforeach
@if ($seo['favicon'])
    <link inertia="favicon" rel="icon" href="{{ $seo['favicon'] }}">
@endif
<script inertia="structured-data" type="application/ld+json">{!! json_encode($seo['schema'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR) !!}</script>
