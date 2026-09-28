"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { Project, projects } from "@/data/content";
import SectionLabel from "./ui/SectionLabel";

function ServicePanel({ project, index }: { project: Project; index: number }) {
  return (
    <article className="flex min-h-[520px] w-full flex-col bg-[#f5f5f5] px-7 py-10 text-neutral-950 sm:px-9 sm:py-12 md:h-[68dvh] md:min-h-[520px] md:w-[36vw] md:max-w-[520px] md:flex-none md:px-10 lg:w-[32vw] xl:w-[29vw]">
      <span className="font-mono text-sm text-[#b95732]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-8 max-w-[10ch] text-4xl font-light leading-[0.98] tracking-tight sm:text-5xl lg:text-[3.5rem]">
        {project.title}
      </h3>

      <div className="mt-8 h-px w-14 bg-[#c85f36]" aria-hidden="true" />

      <p className="mt-7 max-w-[28ch] text-base leading-relaxed text-neutral-700 sm:text-lg">
        {project.description}
      </p>

      <ul className="mt-auto space-y-2.5 pt-12 text-sm text-neutral-800 sm:text-base">
        {project.tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Projects() {
  const tier1 = projects.filter((p) => p.tier === 1);
  const horizontalSection = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!isDesktop || shouldReduceMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      const section = horizontalSection.current;
      const trackElement = track.current;
      if (!section || !trackElement) return;

      const scrollDistance = () =>
        Math.max(trackElement.scrollWidth - window.innerWidth, 0);

      const animation = gsap.to(trackElement, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    },
    { dependencies: [isDesktop, shouldReduceMotion], scope: horizontalSection }
  );

  const currentPanel = Math.min(
    tier1.length,
    Math.floor(progress * tier1.length) + 1
  );

  return (
    <section id="projects" className="relative bg-white text-neutral-950">
      <div className="relative z-10 bg-white px-6 pb-6 pt-12 md:px-12 md:pb-8 md:pt-20">
        <SectionLabel number="01" className="text-neutral-500">Our Services</SectionLabel>
        <h2 className="mb-4 text-3xl font-light tracking-tight text-neutral-950 sm:text-5xl md:mb-6 md:text-6xl">
          How I Help Brands
        </h2>
        <p className="max-w-md text-base text-neutral-600 md:text-lg">
          I help brands build a strong social media presence through strategic content, founder-led storytelling and meaningful audience engagement.
        </p>
      </div>

      <div
        ref={horizontalSection}
        className="relative min-h-[100dvh] overflow-hidden border-y border-black/10 bg-white"
      >
        {shouldReduceMotion ? (
          <div className="grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2">
            {tier1.map((project, index) => (
              <ServicePanel key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <>
            <div
              ref={track}
              className="hidden min-h-[100dvh] w-max items-center gap-6 px-[8vw] md:flex lg:gap-8"
            >
              {tier1.map((project, index) => (
                <ServicePanel key={project.id} project={project} index={index} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-px bg-black/10 md:hidden">
              {tier1.map((project, index) => (
                <ServicePanel key={project.id} project={project} index={index} />
              ))}
            </div>

            <div className="pointer-events-none absolute bottom-8 left-[8vw] right-[8vw] hidden items-center gap-5 md:flex">
              <span className="w-12 font-mono text-xs text-neutral-500">
                {String(currentPanel).padStart(2, "0")} / {String(tier1.length).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 overflow-hidden bg-black/10">
                <div
                  className="h-full origin-left bg-neutral-950"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
