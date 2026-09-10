import { Head } from '@inertiajs/react';

export default function SeoHead({ seo }) {
    if (!seo) return null;

    return (
        <Head title={seo.title}>
            <link head-key="canonical" rel="canonical" href={seo.canonical} />
            {seo.meta.map(({ key, ...attributes }) => (
                <meta key={key} head-key={key} {...attributes} />
            ))}
            {seo.favicon && <link head-key="favicon" rel="icon" href={seo.favicon} />}
            <script head-key="structured-data" type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema).replace(/</g, '\\u003c') }} />
        </Head>
    );
}
