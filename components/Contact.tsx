"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsEnvelope, BsLinkedin } from "react-icons/bs";
import SectionLabel from "./ui/SectionLabel";
import Badge from "./ui/Badge";
import MagneticButton from "./ui/MagneticButton";
import { personalInfo } from "@/data/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-[70vh] flex flex-col items-center justify-center py-16 md:py-32 px-6 text-center border-t border-border relative z-10"
    >
      <SectionLabel number="05">Contact</SectionLabel>

      <div ref={headlineRef} className="mt-6 flex flex-col items-center gap-2">
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white flex flex-wrap justify-center gap-[0.2em]">
          {"Let's build your".split(" ").map((word, i) => (
            <span key={i} className="word inline-block">{word}</span>
          ))}
        </h2>
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-text-secondary flex flex-wrap justify-center gap-[0.2em]">
          {"brand's next story.".split(" ").map((word, i) => (
            <span key={i} className="word inline-block">{word}</span>
          ))}
        </h2>
      </div>

      <div className="mt-12 relative flex items-center gap-4 group">
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-sm sm:text-lg md:text-2xl font-mono text-text-muted hover:text-white transition-colors relative break-all sm:break-normal"
          data-cursor="text"
        >
          {personalInfo.email}
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
        </a>

        <button
          onClick={handleCopy}
          className="p-2 text-text-muted hover:text-white transition-colors relative"
          aria-label="Copy email"
        >
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 10 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-border px-3 py-1 rounded text-xs font-mono text-white pointer-events-none"
          >
            Copied!
          </motion.div>
        </button>
      </div>

      <div className="mt-12 flex justify-center gap-6">
        <MagneticButton strength={0.3}>
          <a
            href={`mailto:${personalInfo.email}`}
            className="border border-border rounded-full p-5 md:p-4 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-colors text-text-muted hover:text-white"
            data-cursor="hover"
            aria-label="Email Anshu Yadav"
          >
            <BsEnvelope size={20} />
          </a>
        </MagneticButton>
        <MagneticButton strength={0.3}>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="border border-border rounded-full p-5 md:p-4 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-colors text-text-muted hover:text-white"
            data-cursor="hover"
            aria-label="LinkedIn"
          >
            <BsLinkedin size={20} />
          </a>
        </MagneticButton>
      </div>

      <div className="mt-12">
        <Badge variant="outline">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulse_2s_ease-in-out_infinite] mr-2 inline-block" />
          Open to brand collaborations
        </Badge>
      </div>
    </section>
  );
}
