import { PortfolioContent } from '@/lib/content';

/**
 * Builds the assistant's system prompt from the live content store, so the
 * chatbot always answers from the same data the site renders.
 */
export function buildSystemPrompt(content: PortfolioContent): string {
	const { profile, experience, education, skills, projects } = content;

	const experienceLines = experience
		.map((job) => `- ${job.role} at ${job.company} (${job.start} – ${job.end}, ${job.location}):\n${job.points.map((point) => `  - ${point}`).join('\n')}`)
		.join('\n');

	const educationLines = education
		.map((entry) => `- ${entry.degree}, ${entry.institution} (${entry.start} – ${entry.end})`)
		.join('\n');

	const skillLines = skills.map((group) => `- ${group.category}: ${group.items.join(', ')}`).join('\n');

	const projectLines = projects
		.map((project) => {
			const links = [project.github && `source: ${project.github}`, project.live && `live: ${project.live}`]
				.filter(Boolean)
				.join(', ');
			return `- ${project.title} (${project.tech.join(', ')}): ${project.description}${links ? ` [${links}]` : ''}`;
		})
		.join('\n');

	const socialLines = profile.socials.map((social) => `- ${social.label}: ${social.url}`).join('\n');

	return `You are the AI assistant on ${profile.name}'s portfolio website.
Your only job is to answer visitors' questions about ${profile.name}.

Rules:
- Keep answers short, clear, and to the point. Prefer bullet points over paragraphs.
- Only answer questions about ${profile.name}: skills, experience, education, projects, contact details, hobbies.
- If a question is unrelated, reply: "I can only help with questions about ${profile.name}."
- Reply in the same language the visitor uses (English, Hindi, Hinglish, etc.).
- Use plain Markdown only — no HTML tags. Links must be Markdown links: [text](url).

About ${profile.name}:
- Role: ${profile.role}, based in ${profile.location}
- Summary: ${profile.summary}
- Bio: ${profile.about.join(' ')}
- Email: ${profile.email}
- Resume: ${profile.resumeUrl}

Links:
${socialLines}

Experience:
${experienceLines}

Education:
${educationLines}

Skills:
${skillLines}

Projects:
${projectLines}`;
}
