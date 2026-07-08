"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, type Project } from "@/data/content";
import Badge from "../ui/Badge";
import { useLenisContext } from "@/providers/LenisProvider";

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const lenis = useLenisContext();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 z-[110] h-[92vh] md:h-[88vh] bg-[#111] border-t border-border rounded-t-3xl flex flex-col overflow-hidden"
          >
            {/* ── Top bar: drag handle + close ── */}
            <div className="relative flex items-center justify-between px-6 md:px-10 pt-4 pb-3 flex-shrink-0 border-b border-border/40">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/10 rounded-full" />
              <span className="opacity-0 text-xs select-none">x</span>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-border text-text-muted hover:text-white hover:border-white/20 transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Scrollable body — single scroll container, always works ── */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
              <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">

                {/* Title + year */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3 className="text-3xl md:text-4xl font-light text-white leading-tight">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-text-muted border border-border px-2 py-1 rounded-md flex-shrink-0 mt-1">
                    {project.year}
                  </span>
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <Badge key={i} variant="mono">{t}</Badge>
                  ))}
                </div>

                {/* Service details */}
                <div className="flex flex-col md:flex-row gap-8 md:items-start">
                  {/* Description + CTAs */}
                  <div className="flex-1 flex flex-col gap-6">
                    <p className="text-text-secondary leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                      {project.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`${project.title} enquiry`)}`}
                        className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                      >
                        Start a conversation
                      </a>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-border text-text-secondary px-6 py-2.5 rounded-full text-sm hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                      >
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom padding so last item isn't flush with edge */}
                <div className="h-8" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
