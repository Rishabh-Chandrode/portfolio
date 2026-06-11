import { getContent } from '@/lib/content';
import Nav from '@/components/site/Nav';
import Hero from '@/components/site/Hero';
import About from '@/components/site/About';
import Experience from '@/components/site/Experience';
import Projects from '@/components/site/Projects';
import Skills from '@/components/site/Skills';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';
import ChatWidget from '@/components/site/ChatWidget';

export default async function Home() {
	const content = await getContent();
	const { profile } = content;

	return (
		<>
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
			<ChatWidget name={profile.name} />
		</>
	);
}
