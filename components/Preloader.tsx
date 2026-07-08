"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsLoading(false);
      },
    });

    tl.to(progressRef.current, {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut",
    })
      .to(textRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(overlayRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <section
      ref={overlayRef}
      id="preloader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <h1
        ref={textRef}
        className="font-mono text-6xl tracking-wide text-white mb-8"
      >
        AY
      </h1>
      <div className="w-48 h-[1px] bg-border overflow-hidden">
        <div ref={progressRef} className="h-full w-0 bg-white" />
      </div>
    </section>
  );
}
