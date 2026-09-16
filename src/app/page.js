import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer";
import AboutMeSection from "@/components/sections/AboutMeSection/AboutMeSection";
import Contact from "@/components/sections/Contact/Contact";
import Hero from "@/components/sections/Hero/Hero";
import Marquee from "@/components/sections/Marquee/Marquee";
import MyExpertise from "@/components/sections/MyExpertise/MyExpertise";
import Projects from "@/components/sections/Projects/Projects";
import SkillsProficiency from "@/components/sections/SkillsProficiency/SkillsProficiency";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Navbar />
      <Hero />
      <Marquee />
      <MyExpertise />
      <AboutMeSection />
      <SkillsProficiency />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
