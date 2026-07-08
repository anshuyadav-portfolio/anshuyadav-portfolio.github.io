"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experience, education, personalInfo } from "@/data/content";
import SectionLabel from "./ui/SectionLabel";
import GlowCard from "./ui/GlowCard";
import Badge from "./ui/Badge";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (lineRef.current && containerRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          }
        }
      );
    }

    const isMobile = window.innerWidth < 768;
    const entries = document.querySelectorAll(".timeline-entry");
    entries.forEach((entry, i) => {
      const isEven = i % 2 === 0;
      gsap.fromTo(entry,
        { opacity: 0, x: isMobile ? -20 : (isEven ? -40 : 40) },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="timeline" className="py-16 md:py-32 px-6 md:px-12 max-w-5xl mx-auto border-t border-border">
      <SectionLabel number="04">Our Process</SectionLabel>
      <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mt-6 mb-10 md:mb-24">
        From Idea to Impact
      </h2>

      <div ref={containerRef} className="relative">
        {/* CENTER LINE */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2">
          <div ref={lineRef} className="w-full h-full bg-white origin-top" />
        </div>

        {/* EXPERIENCE ENTRIES */}
        {experience.map((exp, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={`timeline-entry flex flex-col md:flex-row items-start gap-8 mb-16 md:mb-24 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} ml-4 md:ml-0 border-l-2 border-border md:border-l-0 pl-6 md:pl-0`}
            >
              {/* CENTER DOT */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-8 z-10">
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-white border-2 border-background"
                />
              </div>

              {/* CARD */}
              <div className="w-full md:w-[45%]">
                <GlowCard className="p-5 md:p-8">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg md:text-xl font-medium text-white">{exp.company}</h3>
                    <Badge variant="outline">{exp.type}</Badge>
                  </div>
                  <div className="text-text-muted text-sm mt-1">{exp.role}</div>
                  <div className="font-mono text-xs text-text-muted mt-2 opacity-70">
                    {exp.period} &middot; {exp.location}
                  </div>

                  <hr className="border-border mt-6 mb-4" />

                  <ul className="flex flex-col gap-3">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span className="text-text-muted text-sm leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </div>

              {/* SPACER FOR OPPOSITE SIDE */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}

        {/* EDUCATION ENTRY */}
        <div className="timeline-entry flex justify-center relative mt-12 ml-4 md:ml-0 border-l-2 border-border md:border-l-0 pl-6 md:pl-0">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 z-10">
            <div className="w-3 h-3 rounded-full bg-border border-2 border-background" />
          </div>

          <div className="w-full md:w-[60%] z-10">
            <GlowCard className="p-5 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="text-4xl font-light text-white mb-1">{education.cgpa.split('/')[0]}</div>
                <span className="text-text-muted text-xs font-mono">Founder</span>
              </div>
              <div className="flex-1 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                <h3 className="text-lg font-medium text-white">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-text-secondary transition-colors"
                  >
                    {education.institution} ↗
                  </a>
                </h3>
                <div className="text-text-muted text-sm mt-1">{education.degree}</div>
                <div className="font-mono text-xs text-text-muted mt-2 opacity-70">
                  {education.period} &middot; {education.location}
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                  {education.coursework.map((course, i) => (
                    <Badge key={i} variant="mono">{course}</Badge>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
