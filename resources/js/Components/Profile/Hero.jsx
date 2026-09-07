import { ArrowRight, Download, Mail } from 'lucide-react';
import SocialLinks from './SocialLinks';

export default function Hero({
    profile = {},
    socialLinks = [],
    hasProjects = false,
}) {
    const name = profile.name || 'Your Name';
    const title = profile.title || 'Developer';
    const location = profile.location || '';

    const rawIntro =
        profile.tagline ||
        profile.about ||
        'I build thoughtful digital products with clean code and a focus on real user needs.';

    const cleanIntro = rawIntro
        .replace(/<[^>]*>?/gm, '')
        .replace(/\s+/g, ' ')
        .trim();

    const nameParts = name.trim().split(' ').filter(Boolean);

    const firstName = nameParts[0] || 'Your';
    const lastName = nameParts.slice(1).join(' ');

    return (
        <section
            id="hero"
            className="
                relative
                min-h-[100svh]
                overflow-hidden
                border-b
                border-white/5
                bg-dark-800
            "
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        left-[45%]
                        top-[45%]
                        h-[450px]
                        w-[450px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-accent-500/[0.04]
                        blur-[120px]
                    "
                />

                <div className="hero-grid absolute inset-0 opacity-[0.08]" />
            </div>

            {/* ========================= */}
            {/* DESKTOP */}
            {/* ========================= */}
            <div
                className="
                    relative
                    mx-auto
                    hidden
                    min-h-[100svh]
                    w-full
                    max-w-[1600px]
                    px-[6%]
                    xl:block
                "
            >
                <div
                    className="
                        relative
                        grid
                        min-h-[100svh]
                        grid-cols-12
                        items-center
                    "
                >
                    {/* ========================= */}
                    {/* LEFT */}
                    {/* ========================= */}
                    <div
                        className="
                            relative
                            z-30
                            col-span-5
                            flex
                            items-center
                        "
                    >
                        <div className="-translate-y-4">
                            <h1
                                className="
                                    hero-name
                                    font-display
                                    text-[clamp(4.8rem,6.2vw,7rem)]
                                    font-extrabold
                                    leading-[0.82]
                                    tracking-[-0.06em]
                                    text-white
                                "
                            >
                                <span className="block">
                                    {firstName}
                                </span>

                                {lastName && (
                                    <span className="block">
                                        {lastName}.
                                    </span>
                                )}
                            </h1>

                            {/* Accent */}
                            <div
                                className="
                                    hero-accent
                                    mt-8
                                    h-[5px]
                                    w-16
                                    bg-accent-500
                                "
                            />

                            {/* Social */}
                            {socialLinks.length > 0 && (
                                <div className="hero-social mt-12">
                                    <SocialLinks
                                        links={socialLinks}
                                        size="md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Empty middle */}
                    <div className="col-span-3" />

                    {/* ========================= */}
                    {/* RIGHT */}
                    {/* ========================= */}
                    <div
                        className="
                            hero-intro
                            relative
                            z-30
                            col-span-4
                            flex
                            items-center
                            pl-4
                            xl:pl-8
                        "
                    >
                        <div className="max-w-[430px]">
                            {/* Label */}
                            <div
                                className="
                                    mb-5
                                    flex
                                    items-center
                                    gap-3
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.28em]
                                    text-gray-500
                                "
                            >
                                <span className="h-px w-7 bg-gray-600" />

                                <span>
                                    Introduction
                                </span>
                            </div>

                            {/* Title */}
                            <h2
                                className="
                                    font-display
                                    text-[clamp(1.8rem,2.15vw,2.6rem)]
                                    font-semibold
                                    leading-[1.07]
                                    tracking-[-0.035em]
                                    text-white
                                "
                            >
                                {title}

                                {location && (
                                    <>
                                        <span>, based in</span>

                                        <br />

                                        <span>
                                            {location}.
                                        </span>
                                    </>
                                )}
                            </h2>

                            {/* Description */}
                            <p
                                className="
                                    mt-7
                                    max-w-[400px]
                                    text-base
                                    leading-7
                                    text-gray-400
                                "
                            >
                                {cleanIntro.length > 180
                                    ? `${cleanIntro.slice(0, 180)}...`
                                    : cleanIntro}
                            </p>

                            {/* Actions */}
                            <div
                                className="
                                    mt-8
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-6
                                "
                            >
                                {hasProjects && (
                                    <a
                                        href="#projects"
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-3
                                            border-b
                                            border-accent-500
                                            pb-1.5
                                            text-base
                                            font-semibold
                                            text-accent-500
                                            transition-colors
                                            duration-300
                                            hover:text-accent-400
                                        "
                                    >
                                        My story

                                        <ArrowRight
                                            className="
                                                h-4
                                                w-4
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />
                                    </a>
                                )}

                                {profile.resume_url && (
                                    <a
                                        href={profile.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            text-base
                                            font-medium
                                            text-gray-500
                                            transition-colors
                                            duration-300
                                            hover:text-white
                                        "
                                    >
                                        <Download className="h-4 w-4" />

                                        {profile.resume_label ||
                                            'Download CV'}
                                    </a>
                                )}
                            </div>

                            {/* Email */}
                            {profile.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="
                                        mt-8
                                        inline-flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-medium
                                        text-gray-500
                                        transition-colors
                                        duration-300
                                        hover:text-white
                                    "
                                >
                                    <Mail className="h-4 w-4 text-accent-500" />

                                    {profile.email}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* ========================= */}
                {/* PHOTO */}
                {/* ========================= */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-[47%]
                        z-20
                        flex
                        h-[88%]
                        -translate-x-1/2
                        items-end
                        justify-center
                    "
                >
                    {profile.avatar ? (
                        <img
                            src={profile.avatar}
                            alt={`Portrait of ${name}`}
                            draggable="false"
                            className="
                                hero-photo
                                h-auto
                                max-h-full
                                w-auto
                                max-w-[46vw]
                                select-none
                                object-contain
                                object-bottom

                                lg:max-h-[78vh]
                                xl:max-h-[84vh]
                                2xl:max-h-[88vh]
                            "
                        />
                    ) : (
                        <div
                            className="
                                hero-photo
                                flex
                                h-[75vh]
                                w-[420px]
                                items-center
                                justify-center
                                font-display
                                text-[14rem]
                                font-black
                                text-accent-500
                            "
                        >
                            {firstName
                                .charAt(0)
                                .toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            {/* ========================= */}
            {/* MOBILE + TABLET */}
            {/* ========================= */}
            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-[100svh]
                    w-full
                    max-w-3xl
                    flex-col
                    px-6
                    pt-28
                    sm:px-10
                    md:grid
                    md:max-w-none
                    md:grid-cols-[0.92fr_1.08fr]
                    md:grid-rows-[auto_1fr]
                    md:items-center
                    md:gap-x-10
                    md:gap-y-6
                    md:px-[6%]
                    md:pb-10
                    xl:hidden
                "
            >
                {/* Name */}
                <div className="relative z-30 md:col-span-2">
                    <h1
                        className="
                            hero-name
                            font-display
                            text-[clamp(3.8rem,15vw,6rem)]
                            md:text-[clamp(4.5rem,10vw,6.5rem)]
                            font-extrabold
                            leading-[0.84]
                            tracking-[-0.06em]
                            text-white
                        "
                    >
                        <span className="block">
                            {firstName}
                        </span>

                        {lastName && (
                            <span className="block">
                                {lastName}.
                            </span>
                        )}
                    </h1>

                    <div
                        className="
                            mt-6
                            h-1
                            w-14
                            bg-accent-500
                        "
                    />
                </div>

                {/* Photo */}
                <div
                    className="
                        relative
                        z-20
                        -mt-6
                        flex
                        h-[46vh]
                        min-h-[350px]
                        justify-center
                        overflow-hidden
                        md:mt-0
                        md:h-[52svh]
                        md:min-h-[390px]
                        md:self-end
                    "
                >
                    {profile.avatar ? (
                        <img
                            src={profile.avatar}
                            alt={`Portrait of ${name}`}
                            draggable="false"
                            className="
                                hero-photo
                                h-full
                                w-auto
                                max-w-none
                                object-contain
                                object-bottom
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                font-display
                                text-[10rem]
                                font-black
                                text-accent-500
                            "
                        >
                            {firstName
                                .charAt(0)
                                .toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Mobile Intro */}
                <div
                    className="
                        hero-intro
                        relative
                        z-30
                        border-t
                        border-white/[0.06]
                        py-10
                        md:self-center
                        md:border-l
                        md:border-t-0
                        md:py-0
                        md:pl-8
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            gap-3
                            text-[9px]
                            md:text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.28em]
                            text-gray-500
                        "
                    >
                        <span className="h-px w-7 bg-gray-600" />

                        <span>
                            Introduction
                        </span>
                    </div>

                    <h2
                        className="
                            max-w-lg
                            font-display
                            text-2xl
                            font-semibold
                            leading-[1.15]
                            tracking-[-0.03em]
                            text-white
                            sm:text-3xl
                            md:text-[2rem]
                        "
                    >
                        {title}

                        {location && (
                            <>
                                , based in {location}.
                            </>
                        )}
                    </h2>

                    <p
                        className="
                            mt-5
                            max-w-xl
                            text-sm
                            leading-7
                            text-gray-400
                            md:text-base
                            md:leading-8
                        "
                    >
                        {cleanIntro.length > 180
                            ? `${cleanIntro.slice(0, 180)}...`
                            : cleanIntro}
                    </p>

                    <div
                        className="
                            mt-7
                            flex
                            flex-wrap
                            items-center
                            gap-6
                        "
                    >
                        {hasProjects && (
                            <a
                                href="#projects"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-2
                                    border-b
                                    border-accent-500
                                    pb-1
                                    text-sm
                                    font-semibold
                                    text-accent-500
                                    md:text-base
                                "
                            >
                                My story

                                <ArrowRight className="h-4 w-4" />
                            </a>
                        )}

                        {profile.resume_url && (
                            <a
                                href={profile.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-gray-400
                                    md:text-base
                                "
                            >
                                <Download className="h-4 w-4" />

                                {profile.resume_label ||
                                    'Download CV'}
                            </a>
                        )}
                    </div>

                    {socialLinks.length > 0 && (
                        <div className="mt-9">
                            <SocialLinks
                                links={socialLinks}
                                size="md"
                            />
                        </div>
                    )}

                    {profile.email && (
                        <a
                            href={`mailto:${profile.email}`}
                            className="
                                mt-7
                                inline-flex
                                items-center
                                gap-2
                                text-xs
                                text-gray-500
                                md:text-sm
                            "
                        >
                            <Mail className="h-4 w-4 text-accent-500" />

                            {profile.email}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
