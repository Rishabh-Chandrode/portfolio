import Image from 'next/image';
import AboutImage from "@/public/images/AboutMeImg.jpg";


const AboutSection = () => {
	return (
		<section id='AboutSection' className='text-white'>
			<div className=' md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 '>

				<div className='overflow-hidden hidden md:block transition-transform transform duration-500 ease-in-out -translate-x-52 opacity-0 animate-fade-in-right' >
					<Image src={AboutImage}
						width={400}
						height={400}
						priority
						placeholder="blur"
						alt='Rishabh Chandrode Portfolio About me Image'
					/>
				</div>

				<div className='mt-4 md:mt-0 text-left flex flex-col h-full animate-scale-fade-in' >
					<h2 className='text-4xl font-bold text-white mb-4' >About Me</h2>
					<p className='text-base lg:text-lg ' align="justify" >
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
	)
}

export default AboutSection