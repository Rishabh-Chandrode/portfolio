import { Experience as Experience_T } from '@Types/resume/experience';

const Experience = ({Experience} : {Experience: Experience_T}) => {
	return (
		<>
			<h4>{Experience.profile}</h4>
			<h5>{Experience.duration}</h5>
			<p>
				<em>{Experience.company}</em>
			</p>
			<ul className="list-disc pl-2 pt-2 text-justify ">
                {
                    Experience.points.map( (point: string, index: number) => 
                        <li key={`experience_${index}`} className="leading-6">{point}</li>
                    )
                }
			</ul>
		</>
	);
};

export default Experience;