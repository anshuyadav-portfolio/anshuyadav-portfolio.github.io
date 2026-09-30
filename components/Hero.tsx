"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateChars = (ref: React.RefObject<HTMLElement>, delay: number) => {
        if (!ref.current) return;
        const chars = ref.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { opacity: 0, y: 60, rotateX: -30 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, duration: 0.8, ease: "power3.out", delay }
        );
      };

      animateChars(headline1Ref, 2.2);
      animateChars(headline2Ref, 2.5);

      if (sublineRef.current) {
        gsap.fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 3.0, ease: "power2.out" }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderSplitText = (text: string) => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block opacity-0">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-border bg-background md:bg-transparent"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-background to-background md:hidden" />

      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <HeroScene />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 md:px-12 md:pt-0 flex flex-col justify-center h-full">

        <p className="mb-5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.3em] text-white/45 md:mb-7 md:text-xs">
          Social Media. Elevated.
        </p>

        <div className="flex flex-col relative z-20 text-center md:text-left">
          <h1
            ref={headline1Ref}
            className="mb-1 text-[2.55rem] font-normal leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[5.5rem]"
            style={{ perspective: "1000px" }}
          >
            {renderSplitText("Stories that")}
            <span className="inline-block italic text-white/70">
              {renderSplitText("connect.")}
            </span>
          </h1>
          <h2
            ref={headline2Ref}
            className="text-[2.55rem] font-normal leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[5.5rem]"
            style={{ perspective: "1000px" }}
          >
            {renderSplitText("Content that")}
            <span className="inline-block italic text-white/70">
              {renderSplitText("converts.")}
            </span>
          </h2>
        </div>

        <p
          ref={sublineRef}
          className="mx-auto mt-7 w-full max-w-xl text-center text-base leading-relaxed text-text-muted opacity-0 md:mx-0 md:mt-9 md:text-left md:text-lg"
        >
          I help brands turn ideas into scroll-stopping content and meaningful communities through strategy, creativity, and data-driven storytelling.
        </p>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <span className="font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-30 opacity-[0.03] pointer-events-none noise" />
    </section>
  );
}
