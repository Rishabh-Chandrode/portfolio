import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({project}) => {
    return (
        <div>
           <div className="relative h-52 md:h-72 rounded-t-xl overflow-hidden group">
            <Image
              src={project.imageUrl}
              alt={project.title || 'Project Image'}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="rounded-t-xl"
              placeholder="blur"
              priority={false}
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="overlay  items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0  group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
              <Link
                href={project.giturl}
                className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link  hidden group-hover:flex  "
              >
                <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white   group-hover:flex  transition-all  duration-500 " />
              </Link>
              <Link
                href={project.liveurl}
                className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link   hidden group-hover:flex"
              >
                <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white   group-hover:flex transition-all duration-500 " />
              </Link>
            </div>
          </div>
          <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
            <h5 className="text-xl font-semibold mb-2">{project.title}</h5>
            <p className="text-[#ADB7BE]">{project.description}</p>
          </div>
        </div>
      );
};

export default ProjectCard;