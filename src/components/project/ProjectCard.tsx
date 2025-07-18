import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { PROJECT_T } from "@Types/project/project";

import { motion } from "framer-motion";

const cardVariants = {
	initial: { y: 50, opacity: 0 },
	animate: { y: 0, opacity: 1 },
};

const ProjectCard = ({
	index,
	project,
	isInView,
}: {
	project: PROJECT_T;
	index: number;
	isInView: boolean;
}) => {
	return (
		<motion.div
			variants={cardVariants}
			initial="initial"
			animate={isInView ? "animate" : "initial"}
			transition={{ duration: 0.5, delay: index * 0.2 }}
			key={index + project.title}
			className="project_card"
		>
			<div className="image_container">
				<Image
					src={project.imageUrl}
					alt={project.title || "Project Image"}
					fill
					className="project_image"
					placeholder="blur"
					priority={false}
				/>
			</div>
			<div className="content">
				<div className="info">
					<h5 className="project_title">{project.title}</h5>
					<p className="project_description">{project.description}</p>
				</div>
				<div className="links">
					<Link href={project.giturl} className="icon_button">
						<div className="icon_text">source</div>
						<CodeBracketIcon className="icon" />
					</Link>
					<Link href={project.liveurl} className="icon_button">
						<div className="icon_text">Live</div>
						<EyeIcon className="icon" />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
