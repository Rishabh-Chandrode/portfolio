import { ImageResponse } from 'next/og';
import { getContent } from '@/lib/content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
	const { profile } = await getContent();

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '80px',
					background: '#0a0a0a',
					fontFamily: 'sans-serif',
				}}
			>
				{/* Subtle grid background */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage:
							'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
						backgroundSize: '60px 60px',
					}}
				/>
				{/* Glow */}
				<div
					style={{
						position: 'absolute',
						top: '-100px',
						left: '-100px',
						width: '500px',
						height: '500px',
						borderRadius: '50%',
						background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
					}}
				/>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
					<div
						style={{
							fontSize: '18px',
							color: '#6366f1',
							letterSpacing: '0.15em',
							textTransform: 'uppercase',
							fontWeight: 600,
						}}
					>
						rishabhchandrode.com
					</div>
					<div
						style={{
							fontSize: '72px',
							fontWeight: 800,
							color: '#ffffff',
							lineHeight: 1.05,
							letterSpacing: '-0.02em',
						}}
					>
						{profile.name}
					</div>
					<div
						style={{
							fontSize: '28px',
							color: '#a1a1aa',
							fontWeight: 400,
							marginTop: '4px',
						}}
					>
						{profile.role}
					</div>
					<div
						style={{
							fontSize: '22px',
							color: '#71717a',
							maxWidth: '700px',
							lineHeight: 1.5,
							marginTop: '8px',
						}}
					>
						{profile.headline}
					</div>
				</div>
			</div>
		),
		{ ...size },
	);
}
