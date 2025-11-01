import HeroSection from '@Components/hero/HeroSection';
import AboutSection from '@Components/about/AboutSection';
import Skills from '@/src/components/skill/Skills_Section';
import ProjectSection from '@Components/project/ProjectSection';
import EmailSection from '@Components/contact/EmailSection';
import Footer from '@Components/footer/Footer';
import ResumeSection from '@/src/components/resume/ResumeSection';

import '@Styles/app/home.scss';


export default function Home() {
  return (
    <main className="content" id='content'>
      <div className=''>
      <HeroSection />
      <AboutSection/>
      <Skills />
      <ResumeSection/>
      <ProjectSection/>
      <EmailSection/>  
      </div>
      <Footer/>
    </main>
  );
}
