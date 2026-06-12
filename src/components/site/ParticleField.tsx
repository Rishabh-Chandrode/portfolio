'use client';

import { useEffect, useRef } from 'react';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
}

const LINK_DIST = 110;
const POINTER_DIST = 160;
const ACCENT = '76, 195, 138';

/**
 * Drifting particle constellation for the hero background. Particles link to
 * close neighbours and to the cursor, and gently scatter away from it.
 * Animation pauses while off-screen or when the tab is hidden.
 */
export default function ParticleField() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!canvas || !ctx) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let particles: Particle[] = [];
		let width = 0;
		let height = 0;
		let frame = 0;
		let visible = false;
		const pointer = { x: -9999, y: -9999 };

		function resize() {
			if (!canvas || !ctx) return;
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.min(80, Math.floor((width * height) / 16000));
			particles = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
			}));
		}

		function draw(animate: boolean) {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			for (const p of particles) {
				if (animate) {
					p.x += p.vx;
					p.y += p.vy;
					// scatter away from the cursor
					const dx = p.x - pointer.x;
					const dy = p.y - pointer.y;
					const dist = Math.hypot(dx, dy);
					if (dist < POINTER_DIST && dist > 0) {
						const force = ((POINTER_DIST - dist) / POINTER_DIST) * 0.6;
						p.x += (dx / dist) * force;
						p.y += (dy / dist) * force;
					}
					if (p.x < 0) p.x = width;
					if (p.x > width) p.x = 0;
					if (p.y < 0) p.y = height;
					if (p.y > height) p.y = 0;
				}
				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${ACCENT}, 0.45)`;
				ctx.fill();
			}

			for (let i = 0; i < particles.length; i++) {
				const a = particles[i];
				for (let j = i + 1; j < particles.length; j++) {
					const b = particles[j];
					const dist = Math.hypot(a.x - b.x, a.y - b.y);
					if (dist < LINK_DIST) {
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.strokeStyle = `rgba(${ACCENT}, ${((1 - dist / LINK_DIST) * 0.16).toFixed(3)})`;
						ctx.stroke();
					}
				}
				// link to the cursor
				const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
				if (pd < POINTER_DIST) {
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(pointer.x, pointer.y);
					ctx.strokeStyle = `rgba(${ACCENT}, ${((1 - pd / POINTER_DIST) * 0.25).toFixed(3)})`;
					ctx.stroke();
				}
			}
		}

		function loop() {
			draw(true);
			frame = requestAnimationFrame(loop);
		}

		function setRunning(run: boolean) {
			cancelAnimationFrame(frame);
			if (run && !reducedMotion) frame = requestAnimationFrame(loop);
		}

		function onPointerMove(event: PointerEvent) {
			const rect = canvas!.getBoundingClientRect();
			pointer.x = event.clientX - rect.left;
			pointer.y = event.clientY - rect.top;
		}

		resize();
		if (reducedMotion) {
			draw(false); // static constellation, no movement
		}

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			setRunning(visible && !document.hidden);
		});
		observer.observe(canvas);

		const onVisibility = () => setRunning(visible && !document.hidden);
		document.addEventListener('visibilitychange', onVisibility);
		window.addEventListener('resize', resize);
		window.addEventListener('pointermove', onPointerMove, { passive: true });

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			document.removeEventListener('visibilitychange', onVisibility);
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', onPointerMove);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
		/>
	);
}
