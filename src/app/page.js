import Navbar from "@/components/layout/Navbar/Navbar";
import AboutMeSection from "@/components/sections/AboutMeSection/AboutMeSection";
import Hero from "@/components/sections/Hero/Hero";
import Marquee from "@/components/sections/Marquee/Marquee";
import MyExpertise from "@/components/sections/MyExpertise/MyExpertise";
import Projects from "@/components/sections/Projects/Projects";
import SkillsProficiency from "@/components/sections/SkillsProficiency/SkillsProficiency";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <MyExpertise />
      <AboutMeSection />
      <SkillsProficiency />
      <Projects />
    </main>
  );
}
