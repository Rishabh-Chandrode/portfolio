import Image from 'next/image';
import AboutImage from '@Images/AboutMeImg.jpg';
import { about as about_D  } from '@Data/about';

import '@Components/about/AboutSection.scss';


const AboutSection = () => {
	return (
		<section id='about_section'>
			<h3 className='title' >About Me</h3>
			<div className='image_wrapper' >
				<Image src={AboutImage}
					fill
					priority
					placeholder="blur"
					alt='Rishabh Chandrode Portfolio About me Image'
				/>
			</div>

			<div className='content' >
				
				<p className='text' >
					{
						about_D.map( (about_point:string, index:number) => (
							<span key={index}>{about_point}</span>
						) )
					}
				</p>
			</div>
		</section>
	);
};

export default AboutSection;