import Image from 'next/image';
import AboutImage from '@Images/AboutMeImg.jpg';

import '@Components/about/AboutSection.scss';


const AboutSection = () => {
	return (
		<section id='AboutSection'>
			<div className='about_section'>

				<div className='image_wrapper' >
					<Image src={AboutImage}
						width={400}
						height={400}
						priority
						placeholder="blur"
						alt='Rishabh Chandrode Portfolio About me Image'
					/>
				</div>

				<div className='content' >
					<h2 className='title' >About Me</h2>
					<p className='text' >
						Hi, I&apos;m Rishabh Chandrode from Khandwa, MP. I&apos;ve earned my bachelor&apos;s degree in Computer Science and Engineering from UIT RGPV, Bhopal, and have been passionate about software development ever since. I&apos;ve had the opportunity to work as a software developer engineer, where I gained hands-on experience building scalable and efficient applications across various tech stacks. Whether it&apos;s frontend, backend, or cloud, I enjoy the entire process of turning ideas into real, working software.
						<br />
						<br />
						I&apos;m always eager to learn new technologies and solve complex problems, especially when they involve making life easier through automation or innovative solutions. When I&apos;m not busy writing code, you&apos;ll often find me strumming my guitar or diving deep into my music playlist—it&apos;s my way of balancing logic with creativity.
						<br />
						<br />
						I&apos;m constantly exploring new challenges and opportunities in the tech world, so if you&apos;re here to learn more about what I do or collaborate on something exciting, feel free to reach out!
					</p>
				</div>

			</div>
		</section>
	);
};

export default AboutSection;