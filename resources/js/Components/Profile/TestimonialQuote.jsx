export default function TestimonialQuote({ profile = {} }) {
    return (
        <section className="py-16 md:py-20 border-t border-dark-600/40">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-dark-700 border border-dark-600/80 rounded-3xl p-8 sm:p-12">
                {/* 1. Left: Author Portrait in Square Card */}
                <div className="md:col-span-4 flex justify-center md:justify-start">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-dark-600 border border-dark-500/60 overflow-hidden flex items-center justify-center shadow-lg flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                            alt="Jared Warner"
                            className="w-full h-full object-cover grayscale contrast-125"
                        />
                    </div>
                </div>

                {/* 2. Right: Quote Icon, Testimonial Text & Author Attribution */}
                <div className="md:col-span-8 space-y-6">
                    {/* Double Quote Marks Icon */}
                    <div className="text-accent-500 text-3xl font-serif font-black tracking-tighter leading-none select-none">
                        ““
                    </div>

                    {/* Testimonial Statement */}
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed">
                        Amazing! At vero eos et accu samus et iusto odio dignissimosa ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
                    </p>

                    {/* Author Info */}
                    <div className="space-y-1">
                        <h4 className="text-base font-bold text-white">
                            Jared Warner
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">
                            CEO of BeServer
                        </p>
                    </div>

                    {/* Slider Indicator Dashes */}
                    <div className="flex items-center gap-2 pt-2">
                        <div className="w-8 h-1 bg-accent-500 rounded-full" />
                        <div className="w-4 h-1 bg-dark-500 rounded-full" />
                        <div className="w-4 h-1 bg-dark-500 rounded-full" />
                        <div className="w-4 h-1 bg-dark-500 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}
