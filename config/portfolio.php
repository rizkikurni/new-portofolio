<?php

return [
    'cache' => [
        'store' => env('PORTFOLIO_CACHE_STORE', 'file'),
        'ttl' => (int) env('PORTFOLIO_CACHE_TTL', 1800),
    ],
];
