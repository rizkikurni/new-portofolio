import { ArrowRight } from 'lucide-react';
import SocialLinks from './SocialLinks';

export default function Hero({ profile = {}, socialLinks = [] }) {
    const name = profile.name || 'Carlos Mendoza';
    const title = profile.title || 'Product Designer and Developer';
    const location = profile.location || 'California';

    const rawIntro =
        profile.tagline ||
        profile.about ||
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.';

    const cleanIntro = rawIntro.replace(/<[^>]*>?/gm, '');

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || 'Carlos';
    const lastName = nameParts.slice(1).join(' ') || 'Mendoza';

    return (
        <section
            id="hero"
            className="
                relative
                overflow-hidden
                bg-dark-800
                pt-28
                lg:min-h-[680px]
                lg:pt-32
            "
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div
                    className="
                        grid
                        grid-cols-1
                        lg:min-h-[550px]
                        lg:grid-cols-12
                        lg:gap-8
                    "
                >
                    {/* LEFT AREA */}
                    <div
                        className="
                            relative
                            lg:col-span-7
                            lg:min-h-[550px]
                        "
                    >
                        {/* NAME + SOCIAL */}
                        <div
                            className="
                                relative
                                z-20
                                flex
                                flex-col
                                items-center
                                text-center

                                lg:absolute
                                lg:left-0
                                lg:top-1/2
                                lg:-translate-y-1/2
                                lg:items-start
                                lg:text-left
                            "
                        >
                            <div className="hero-name">
                                <h1
                                    className="
                                        font-display
                                        text-5xl
                                        font-extrabold
                                        leading-[0.92]
                                        tracking-[-0.04em]
                                        text-white
                                        sm:text-6xl
                                        lg:text-[68px]
                                    "
                                >
                                    <span className="block">
                                        {firstName}
                                    </span>

                                    <span className="block">
                                        {lastName}.
                                    </span>
                                </h1>

                                {/* Accent */}
                                <div
                                    className="
                                        hero-accent
                                        mt-6
                                        h-1
                                        w-12
                                        origin-left
                                        bg-accent-500
                                    "
                                />

                                {/* Social */}
                                {socialLinks.length > 0 && (
                                    <div className="hero-social mt-10">
                                        <SocialLinks
                                            links={socialLinks}
                                            size="sm"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PORTRAIT */}
                        <div
                            className="
                                relative
                                z-10
                                mt-12
                                flex
                                justify-center

                                lg:absolute
                                lg:bottom-0
                                lg:right-0
                                lg:mt-0
                                lg:h-full
                                lg:w-[62%]
                                lg:items-end
                            "
                        >
                            {profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt={profile.name || name}
                                    className="
                                        hero-photo
                                        max-h-[430px]
                                        w-auto
                                        max-w-full
                                        object-contain
                                        object-bottom

                                        sm:max-h-[500px]

                                        lg:max-h-[590px]
                                        lg:max-w-none
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        hero-photo
                                        flex
                                        h-[400px]
                                        w-[280px]
                                        items-center
                                        justify-center
                                        text-8xl
                                        font-black
                                        text-accent-500
                                    "
                                >
                                    {firstName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT AREA */}
                    <div
                        className="
                            hero-intro
                            relative
                            z-20
                            flex
                            flex-col
                            items-center
                            py-16
                            text-center

                            lg:col-span-5
                            lg:items-start
                            lg:justify-center
                            lg:py-0
                            lg:pl-12
                            lg:text-left
                        "
                    >
                        {/* Introduction */}
                        <div
                            className="
                                mb-4
                                flex
                                items-center
                                gap-2
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.22em]
                                text-gray-500
                            "
                        >
                            <span className="h-px w-5 bg-gray-500" />
                            <span>Introduction</span>
                        </div>

                        {/* Heading */}
                        <h2
                            className="
                                max-w-[390px]
                                text-xl
                                font-semibold
                                leading-[1.15]
                                text-white
                                sm:text-2xl
                                lg:text-[28px]
                            "
                        >
                            {title}

                            {location && (
                                <>
                                    , based in
                                    <br />
                                    {location}.
                                </>
                            )}
                        </h2>

                        {/* Description */}
                        <p
                            className="
                                mt-5
                                max-w-[390px]
                                text-sm
                                leading-6
                                text-gray-400
                            "
                        >
                            {cleanIntro.length > 180
                                ? `${cleanIntro.slice(0, 180)}...`
                                : cleanIntro}
                        </p>

                        {/* CTA */}
                        <a
                            href="#services"
                            className="
                                group
                                mt-8
                                inline-flex
                                items-center
                                gap-3
                                text-sm
                                font-semibold
                                text-accent-500
                                transition-colors
                                hover:text-accent-400
                            "
                        >
                            <span
                                className="
                                    border-b
                                    border-accent-500/50
                                    pb-1
                                "
                            >
                                My story
                            </span>

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
                    </div>
                </div>
            </div>
        </section>
    );
}