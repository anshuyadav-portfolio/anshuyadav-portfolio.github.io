"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/content";
import SectionLabel from "./ui/SectionLabel";
import ProjectCard from "./projects/ProjectCard";
import ProjectDrawer from "./projects/ProjectDrawer";
import MagneticButton from "./ui/MagneticButton";

export default function Projects() {
  const pinWrapper = useRef<HTMLDivElement>(null);
  const pinContainer = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const tier1 = projects.filter((p) => p.tier === 1);
  const tier3 = projects.filter((p) => p.tier === 3);

  const [progress, setProgress] = useState(0);
  // null = not yet measured; avoids GSAP initialising with wrong height then reinitialising mid-scroll
  const [wrapperHeight, setWrapperHeight] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Measure track width after paint — two rAFs guarantee layout is complete
  useEffect(() => {
    if (!isDesktop) return;
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const scrollDistance = track.scrollWidth - window.innerWidth;
      setWrapperHeight(`${window.innerHeight + scrollDistance}px`);
    };

    requestAnimationFrame(() => requestAnimationFrame(measure));
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  useGSAP(() => {
    // Wait until real height is known — prevents double-init bug
    if (!isDesktop || !wrapperHeight) return;

    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const wrapper = pinWrapper.current;

    if (!track || !wrapper) return;

    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        // scrub: true = instant sync with Lenis scroll position.
        // Lenis already provides easing so no second layer of smoothing is needed.
        scrub: true,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      }
    });

  }, { dependencies: [isDesktop, wrapperHeight] });

  const openDrawer = (project: Project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const currentCardIndex = Math.min(
    tier1.length,
    Math.max(1, Math.ceil(progress * tier1.length))
  );

  return (
    <section id="projects" className="relative bg-white text-neutral-950">

      {/* A. SECTION HEADER */}
      <div className="relative z-10 bg-white px-6 pb-6 pt-12 md:px-12 md:pb-8 md:pt-20">
        <SectionLabel number="01" className="text-neutral-500">Our Services</SectionLabel>
        <h2 className="mb-4 text-3xl font-light tracking-tight text-neutral-950 sm:text-5xl md:mb-6 md:text-6xl">
          How I Help Brands
        </h2>
        <p className="max-w-md text-base text-neutral-600 md:text-lg">
          Strategy, content, and consistent social media care—shaped around your story.
        </p>
      </div>

      {/* B. HORIZONTAL PINNED SCROLL */}
      {isDesktop ? (
        <div ref={pinWrapper} className="relative" style={{ height: wrapperHeight ?? "100vh" }}>
          <div ref={pinContainer} className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-white">
            <div ref={trackRef} className="flex w-fit gap-6 md:gap-8 px-[8vw] will-change-transform items-center h-full">
              {tier1.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onClick={openDrawer}
                />
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-12 left-0 w-full px-[10vw]">
              <div className="mb-4 flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>0{currentCardIndex}</span>
                <span>0{tier1.length}</span>
              </div>
              <div className="relative h-px w-full overflow-hidden bg-black/10">
                <motion.div
                  className="absolute left-0 top-0 h-full origin-left bg-black"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile fallback vertical stack */
        <div className="px-6 py-12 flex flex-col gap-6">
          {tier1.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onClick={openDrawer}
            />
          ))}
        </div>
      )}

      {/* C. OTHER WORK STRIP (Tier 3) */}
      <div className="relative z-10 border-t border-black/10 bg-white px-6 py-12 md:px-12">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-500">
          Built Around Your Brand
        </h3>
        <div className="flex flex-col">
          {tier3.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between border-b border-black/10 py-5 transition-colors duration-300 hover:bg-black/[0.025] sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-light text-neutral-950">{project.title}</span>
                <span className="hidden font-mono text-xs text-neutral-500 sm:inline-block">
                  {project.tech.join(" · ")}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                {project.githubUrl && (
                  <MagneticButton strength={0.3}>
                    <a href={project.githubUrl} target="_blank" className="block p-2 text-neutral-500 transition-colors hover:text-black">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </MagneticButton>
                )}
                {project.liveUrl && (
                  <MagneticButton strength={0.3}>
                    <a href={project.liveUrl} target="_blank" className="block p-2 text-neutral-500 transition-colors hover:text-black">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </MagneticButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
}
