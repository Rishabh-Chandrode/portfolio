import { EDUCATION_T } from '@Types/resume/education';

const Education = ({Education}: {Education: EDUCATION_T}) => {
	return (
		<>
			<h4 className='degree'>{Education.degree}</h4>
			<h5 className='duration'>{Education.duration}</h5>
			<p className='institution'>
				<em>{Education.institution}</em>
			</p>
		</>
	);
};

export default Education;
