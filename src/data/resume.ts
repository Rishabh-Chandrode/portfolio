import { EXPERIENCE_T } from '@Types/resume/experience';
import { EDUCATION_T } from '@Types/resume/education';

export const Experiences: EXPERIENCE_T[] = [
	{
		profile: 'Software Development Engineer',
		duration: '09/2024 - present',
		company: 'Internshala, Gurugram India',
		points: [
			'Automated workflows with cron jobs, enhanced internal tools, and developed intuitive UIs for marketing campaigns, increasing user engagement by 25%.',
			'Refactored complex SQL queries and transitioned operations to NoSQL using multi-threading, improving database performance by 30%.',
			'Optimized codebase for SEO performance, reducing page load time by 35%, implemented robust API validations, and improved application reliability by resolving 20+ critical issues.',
		],
	},
	{
		profile: 'Software Development Engineer(Intern)',
		duration: '01/2024 - 04/2024',
		company: 'RapidQuest, Pune India',
		points: [
			'Developed a customizable chatbot platform using Python Flask and Jinja templating engine, enabling users to create and personalize their own chatbots in 50% less time compared to traditional methods.',
			'Integrated OpenAI’s ChatGPT 3.5 model for advanced natural language processing, achieving a high user satisfaction rating of 85% on chatbot responses.',
			'Deployed and debugged the chatbot application on the AWS cloud platform, ensuring seamless scalability and reliable performance.',
		],
	},
];

export const Educations: EDUCATION_T[] = [
	{
		degree: 'B.Tech - Computer Science and Engineering',
		duration: '2020 - 2024',
		institution: 'University Institute of Technology, RGPV Bhopal',
	},
	{
		degree: 'HighSchool',
		duration: '2017 - 2019',
		institution: 'Kendriya Vidyalaya Khandwa',
	},
];
