import Section from '../UI/Section';

export default function About({ aboutText }) {
    if (!aboutText) return null;

    return (
        <Section
            id="about"
            tag="About Me"
            title="Design Philosophy & Story."
            subtitle="Bridging creativity and engineering to build memorable digital products."
        >
            <div className="bg-dark-700 border border-dark-600/80 rounded-3xl p-8 sm:p-12 text-gray-300 leading-relaxed max-w-4xl">
                <div
                    className="prose prose-invert max-w-none text-gray-300 space-y-4"
                    dangerouslySetInnerHTML={{ __html: aboutText }}
                />
            </div>
        </Section>
    );
}
