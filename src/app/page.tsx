import { getContent } from '@/lib/content';
import Nav from '@/components/site/Nav';
import Hero from '@/components/site/Hero';
import About from '@/components/site/About';
import Experience from '@/components/site/Experience';
import Projects from '@/components/site/Projects';
import Skills from '@/components/site/Skills';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';
import Spotlight from '@/components/site/Spotlight';
import ScrollProgress from '@/components/site/ScrollProgress';
import Cursor from '@/components/site/Cursor';
import BackToTop from '@/components/site/BackToTop';

export default async function Home() {
	const content = await getContent();
	const { profile } = content;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': 'https://rishabhchandrode.com/#person',
				name: profile.name,
				jobTitle: profile.role,
				description: profile.summary,
				url: 'https://rishabhchandrode.com',
				email: profile.email,
				image: {
					'@type': 'ImageObject',
					url: 'https://rishabhchandrode.com/images/avatar.jpg',
				},
				sameAs: profile.socials.map((s) => s.url),
				knowsAbout: ['Software Engineering', 'Web Development', 'Full Stack Development', 'React', 'Next.js', 'Node.js', 'TypeScript'],
			},
			{
				'@type': 'WebSite',
				'@id': 'https://rishabhchandrode.com/#website',
				url: 'https://rishabhchandrode.com',
				name: profile.name,
				description: profile.headline,
				author: { '@id': 'https://rishabhchandrode.com/#person' },
			},
			{
				'@type': 'WebPage',
				'@id': 'https://rishabhchandrode.com/#webpage',
				url: 'https://rishabhchandrode.com',
				name: `${profile.name} — ${profile.role}`,
				isPartOf: { '@id': 'https://rishabhchandrode.com/#website' },
				about: { '@id': 'https://rishabhchandrode.com/#person' },
				description: profile.summary,
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Spotlight />
			<ScrollProgress />
			<Cursor />
			<Nav name={profile.name} resumeUrl={profile.resumeUrl} />
			<main>
				<Hero profile={profile} />
				<About profile={profile} />
				<Experience experience={content.experience} education={content.education} />
				<Projects projects={content.projects} />
				<Skills skills={content.skills} />
				<Contact email={profile.email} />
			</main>
			<Footer name={profile.name} socials={profile.socials} />
			<BackToTop />
		</>
	);
}
