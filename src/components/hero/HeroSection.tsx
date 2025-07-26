import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Type_Animation from '@Components/hero/TypeAnimation';
import profileImage from '@Images/r2.jpg';

import '@Components/hero/HeroSection.scss';


const HeroSection = () => {

  const resumelink = 'https://drive.google.com/file/d/1BR4btHC56dYJkHIFWiDUcCn3BlsnfFb8/view?usp=drive_link';

  return (
    <section id="home">
        <div className="hero_text">
          <h1>
            <span className="text_gradient">Hello, I&apos;m</span>
            <span>Rishabh Chandrode</span>
            <span className="animated_text">
              <Type_Animation />
            </span>
          </h1>
          <div className="button_group">
            <Link href={'#EmailSection'} passHref>
              <button className="connect_button">Connect</button>
            </Link>
            <Link href={resumelink} passHref rel="noopener noreferrer" target="_blank">
              <button className="resume_button_outer">
                <span className="resume_button_inner">Download Resume</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="hero_image">
            <Image
              fill
              src={profileImage}
              alt="Rishabh Chandrode Profile Image"
              className="profile_image"
              priority
              placeholder="blur"
              sizes="
                (min-width: 96rem) 400px,
                (min-width: 80rem) 400px,
                (min-width: 64rem) 325px,
                (min-width: 48rem) 275px,
                (min-width: 40rem) 400px,
                100vw
              "
            />
        </div>
    </section>
  );
};

export default HeroSection;