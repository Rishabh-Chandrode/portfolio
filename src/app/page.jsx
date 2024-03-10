import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import Chatbot from './components/Chatbot'
import AboutSection from './components/AboutSection'
import Skills from './components/Skills'
import EducationSection from './components/EducationSection'
import ProjectSection from './components/ProjectSection'
import EmailSection from './components/EmailSection'
import Footer from './components/Footer'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] scroll-smooth no-scrollbar">
        <Navbar/>
        <Chatbot/> 
      <div className='container mt-24  mx-auto px-12 py-4 '>
      <HeroSection />
      <AboutSection/>
      <Skills />
      <EducationSection/>
      <ProjectSection/>
      <EmailSection/> 
      </div>
      <Footer/>
    </main>
  )
}
