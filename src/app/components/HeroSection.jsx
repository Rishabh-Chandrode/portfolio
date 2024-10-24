import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Type_Animation from './animations/HeaderTypeAnimation';
import profileImage from '@/public/images/r2.jpg';


const HeroSection = () => {

  const resumelink = "https://drive.google.com/file/d/1BR4btHC56dYJkHIFWiDUcCn3BlsnfFb8/view?usp=drive_link"

  return (
    <section id='Home' className=' lg:py-20 lg:px-20 ' >
      <div className='flex justify-between flex-col md:flex-row'>
        <div className='col-span-7 place-self-center text-center sm:text-left overflow-hidden transform scale-0 animate-scale-up' >

          <h1 className='text-white mb-4 text-4xl  sm:text-5xl lg:text-6xl font-extrabold' >
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 ' >Hello, I&apos;m </span>
            <br />
            <span>Rishabh Chandrode</span>
            <br />
            <Type_Animation />
          </h1>
          <p className='text-[#ADB7BE] text-base  sm:text-lg  lg:text-xl mb-6  ' >

          </p>
          <div  >
            <Link href={"#EmailSection"} passHref>
              <button className='px-6 py-3 rounded-full w-full sm:w-fit mr-4 bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-200 text-white'>
                Connect
              </button>
            </Link>
            <Link href={resumelink} passHref rel="noopener noreferrer" target="_blank" >
              <button className='px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-r from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-800 text-white  mt-3 ' >
                <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2' >
                  Download Resume
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className='col-span-5 place-self-center transform translate-x-0 opacity-0 animate-fade-in-right' >
          <div className=' mt-9 lg:mt-0 w-[70vw] max-w-[350px] h-[340px] sm:w-[400px] sm:max-w-[400px] md:w-[350px] md:max-w-[450px] lg:w-[400px] lg:h-[400px] relative' >

            <Image
              src={profileImage}
              alt='Rishabh Chandrode Profile Image'
              className='rounded-tl-[20%] rounded-br-[20%] absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 '
              width={800}
              height={800}
              priority
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection