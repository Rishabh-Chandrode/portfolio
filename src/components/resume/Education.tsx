import { Education as Education_T } from '@Types/resume/education';

const Education = ({Education}: {Education: Education_T}) => {
	return (
		<>
			<h4>{Education.degree}</h4>
			<h5>{Education.duration}</h5>
			<p>
				<em>{Education.institution}</em>
			</p>
		</>
	);
};

export default Education;
