import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
    as: Element = 'div',
    children,
    className = '',
    variant = 'rise',
    delay = 0,
    style = {},
    ...props
}) {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) return undefined;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                setIsVisible(true);
                observer.unobserve(entry.target);
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -8% 0px',
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <Element
            ref={elementRef}
            className={`section-reveal section-reveal-${variant} ${isVisible ? 'section-reveal-visible' : ''} ${className}`}
            style={{ ...style, '--section-reveal-delay': `${delay}ms` }}
            {...props}
        >
            {children}
        </Element>
    );
}
