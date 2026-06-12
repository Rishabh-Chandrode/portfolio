'use client';

import { useEffect, useRef, useState } from 'react';
import Decode from '@/components/site/Decode';

/**
 * Section heading that scrambles its text in and draws its rule line the
 * first time it scrolls into view.
 */
export default function SectionHeading({ title }: { title: string }) {
	const ref = useRef<HTMLHeadingElement>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node || typeof IntersectionObserver === 'undefined') {
			setInView(true);
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<h2 ref={ref} className={`section-heading ${inView ? 'is-inview' : ''}`}>
			<Decode text={title} active={inView} />
		</h2>
	);
}
