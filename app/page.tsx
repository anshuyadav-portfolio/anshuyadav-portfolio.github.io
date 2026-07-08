import dynamic from "next/dynamic";
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VideoCarousel from "@/components/VideoCarousel";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navigation />
      <ScrollProgress />
      <main>
        <Hero />
        <VideoCarousel />
        <Projects />
        <About />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
