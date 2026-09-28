"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import { useLenisContext } from "@/providers/LenisProvider";
import { useScrollspy } from "@/hooks/useScrollspy";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Creators Feed", id: "sample-reels" },
  { label: "Services", id: "projects" },
  { label: "About", id: "about" },
  { label: "Capabilities", id: "skills" },
  { label: "Process", id: "timeline" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lenis = useLenisContext();
  const activeId = useScrollspy(NAV_LINKS.map(l => l.id), -100);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP refresh on resize
    let resizeTimer: NodeJS.Timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 200);
    });
    observer.observe(document.body);

    const handleResize = () => {
      if (lenis) lenis.resize();
    };
    window.addEventListener("resize", handleResize);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [lenis]);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        setTimeout(() => {
          const headings = document.querySelectorAll("h2");
          headings.forEach((h2) => {
            if (h2.querySelector('.word') || h2.classList.contains('animated-h2')) return;
            h2.classList.add('animated-h2'); // Prevent double animation
            gsap.fromTo(h2,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: h2,
                  start: "top 85%"
                }
              }
            );
          });
        }, 500); // Wait for DOM to settle
      });
    });
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [menuOpen, lenis]);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navVariants: any = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 2, duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed top-6 left-0 right-0 flex justify-center z-50 pointer-events-none px-4"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-8 px-6 py-3 rounded-full bg-neutral-950/90 backdrop-blur-xl border transition-colors duration-300 w-full md:w-fit",
            scrolled ? "border-white/20" : "border-white/5"
          )}
        >
          <div className="font-mono text-sm font-medium tracking-wider text-white">
            AY
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <MagneticButton key={link.id} strength={0.2}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={cn(
                    "text-sm transition-colors duration-300 relative group",
                    activeId === link.id ? "text-white" : "text-text-muted hover:text-white"
                  )}
                >
                  {link.label}
                  <motion.span
                    className="absolute inset-0 bg-white/10 rounded-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              </MagneticButton>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-8 right-8 text-white p-2"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavClick(link.id)}
                  className="text-4xl font-bold text-white tracking-wider"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
