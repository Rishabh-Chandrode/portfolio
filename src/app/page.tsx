import HeroSection from '@Components/hero/HeroSection';
import Navbar from '@Components/navbar/Navbar';
import Chatbot from '@Components/chatbot/Chatbot';
import AboutSection from '@Components/about/AboutSection';
import Skills from '@Components/skill/Skills';
import EducationSection from '@Components/education/EducationSection';
import ProjectSection from '@Components/project/ProjectSection';
import EmailSection from '@Components/contact/EmailSection';
import Footer from '@Components/footer/Footer';


export default function Home() {
  return (
    <main
    style={{'backgroundImage': 'linear-gradient(200deg, rgba(171, 171, 171,0.05) 0%, rgba(171, 171, 171,0.05) 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 48%,rgba(65, 65, 65,0.05) 48%, rgba(65, 65, 65,0.05) 61%,rgba(232, 232, 232,0.05) 61%, rgba(232, 232, 232,0.05) 100%),linear-gradient(126deg, rgba(194, 194, 194,0.05) 0%, rgba(194, 194, 194,0.05) 11%,rgba(127, 127, 127,0.05) 11%, rgba(127, 127, 127,0.05) 33%,rgba(117, 117, 117,0.05) 33%, rgba(117, 117, 117,0.05) 99%,rgba(248, 248, 248,0.05) 99%, rgba(248, 248, 248,0.05) 100%),linear-gradient(144deg, rgba(64, 64, 64,0.05) 0%, rgba(64, 64, 64,0.05) 33%,rgba(211, 211, 211,0.05) 33%, rgba(211, 211, 211,0.05) 50%,rgba(53, 53, 53,0.05) 50%, rgba(53, 53, 53,0.05) 75%,rgba(144, 144, 144,0.05) 75%, rgba(144, 144, 144,0.05) 100%),linear-gradient(329deg, hsl(148,0%,0%),hsl(148,0%,0%))'}}
    className="flex min-h-screen flex-col bg-[#121212] scroll-smooth no-scrollbar">
        <Navbar/>
        <Chatbot/> 
      <div className='container mt-24  mx-auto px-12 py-4 sm:px-2 '>
      <HeroSection />
      <AboutSection/>
      <Skills />
      <EducationSection/>
      <ProjectSection/>
      <EmailSection/> 
      </div>
      <Footer/>
    </main>
  );
}
