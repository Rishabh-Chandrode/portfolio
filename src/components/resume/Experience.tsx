import { EXPERIENCE_T } from '@Types/resume/experience';

const Experience = ({Experience} : {Experience: EXPERIENCE_T}) => {
	return (
		<>
			<h4 className='profile'>{Experience.profile}</h4>
			<p className='duration'>{Experience.duration}</p>
			<p className='company'>
				<em>{Experience.company}</em>
			</p>
			<ul className="list">
                {
                    Experience.points.map( (point: string, index: number) => 
                        <li key={`experience_${index}`} className="point">{point}</li>
                    )
                }
			</ul>
		</>
	);
};

export default Experience;