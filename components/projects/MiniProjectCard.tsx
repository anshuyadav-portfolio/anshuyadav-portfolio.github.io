"use client";

import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import Badge from "../ui/Badge";
import type { Project } from "@/data/content";

function MiniVisual({ id }: { id: string }) {
  if (id === "short-form-video") {
    const bars = [40, 65, 30, 80, 55, 70, 45, 90, 60, 75];
    return (
      <div className="w-full h-20 bg-[#0a0a0a] rounded-lg px-3 pt-3 pb-1 flex flex-col gap-1 overflow-hidden">
        <div className="flex items-end gap-0.5 h-12">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ backgroundColor: i % 3 === 0 ? "#ef4444" : "#22c55e" }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              viewport={{ once: false }}
            />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[8px] text-emerald-500">
          <span>HOOKS</span><span>FORMATS</span>
        </div>
      </div>
    );
  }
  if (id === "copy-storytelling") {
    return (
      <div className="w-full h-20 bg-[#0a0f0a] rounded-lg flex items-center justify-center gap-4 overflow-hidden relative">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-lg bg-emerald-500/10"
        />
        <svg width="36" height="36" viewBox="0 0 72 72" className="relative z-10 flex-shrink-0">
          <motion.path
            d="M36 64 C36 64 12 48 12 28 C12 16 22 8 36 8 C50 8 60 16 60 28 C60 48 36 64 36 64Z"
            fill="#16a34a" opacity="0.9"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          />
          <motion.path
            d="M36 64 C36 64 36 30 36 8"
            stroke="#4ade80" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: false }}
          className="relative z-10 text-left"
        >
          <div className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase">Voice Check</div>
          <div className="font-mono text-xs text-white font-bold">On Brand</div>
          <div className="font-mono text-[10px] text-emerald-400">Ready</div>
        </motion.div>
      </div>
    );
  }
  if (id === "community-engagement") {
    const row = [
      { l: "S", c: "correct" },
      { l: "T", c: "absent" },
      { l: "O", c: "present" },
      { l: "R", c: "correct" },
      { l: "Y", c: "absent" },
    ];
    const colorMap: Record<string, string> = {
      correct: "bg-emerald-600",
      present: "bg-yellow-500",
      absent: "bg-[#3a3a3c]",
    };
    return (
      <div className="w-full h-20 bg-[#121213] rounded-lg flex flex-col items-center justify-center gap-1.5 overflow-hidden">
        <div className="flex gap-1.5">
          {row.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              viewport={{ once: false }}
              className={`w-8 h-8 rounded flex items-center justify-center font-mono font-bold text-xs text-white ${colorMap[tile.c]}`}
            >
              {tile.l}
            </motion.div>
          ))}
        </div>
        <div className="font-mono text-[9px] text-text-muted tracking-widest">MAKE IT MEMORABLE</div>
      </div>
    );
  }
  if (id === "performance-insights") {
    const unsorted = [85, 20, 65, 10, 50, 75, 30, 55, 40, 90];
    const sorted = [...unsorted].sort((a, b) => a - b);
    return (
      <div className="w-full h-20 bg-[#0a0a0a] rounded-lg px-3 pt-2 pb-1 flex flex-col gap-1 overflow-hidden">
        <div className="flex items-end gap-0.5 h-12">
          {unsorted.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ background: `hsl(${200 + i * 15}, 75%, 58%)` }}
              initial={{ height: `${h}%` }}
              whileInView={{ height: `${sorted[i]}%` }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: "easeInOut" }}
              viewport={{ once: false }}
            />
          ))}
        </div>
        <div className="font-mono text-[9px] text-blue-400 text-center">LISTEN · LEARN · ADAPT</div>
      </div>
    );
  }
  return null;
}

const MINI_ACCENTS: Record<string, string> = {
  "short-form-video": "rgba(52,211,153,0.25)",
  "copy-storytelling": "rgba(74,222,128,0.25)",
  "community-engagement": "rgba(251,191,36,0.25)",
  "performance-insights": "rgba(96,165,250,0.25)",
};

interface MiniProjectCardProps {
  project: Project;
}

export default function MiniProjectCard({ project }: MiniProjectCardProps) {
  const hasVisual = ["short-form-video", "copy-storytelling", "community-engagement", "performance-insights"].includes(project.id);
  const glowColor = MINI_ACCENTS[project.id] || "rgba(255,255,255,0.1)";

  return (
    <GlowCard glowColor={glowColor} className="p-6 flex flex-col justify-between min-h-[280px]">
      {hasVisual && (
        <div className="mb-4">
          <MiniVisual id={project.id} />
        </div>
      )}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-light text-white">{project.title}</h4>
          <span className="font-mono text-xs text-text-muted">{project.year}</span>
        </div>
        {project.id === "community-engagement" && (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border border-yellow-400/20 bg-yellow-500/8 text-yellow-300 mb-2"
            style={{ boxShadow: "inset 0 1px 0 rgba(253,224,71,0.15), 0 0 8px rgba(253,224,71,0.08)" }}
          >
            ✦ Community-first conversations
          </span>
        )}
        <p className="text-text-muted text-sm leading-relaxed mt-2">
          {project.description}
        </p>
      </div>

      <div className="mt-auto pt-4 flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {project.tech.slice(0, 3).map((t, i) => (
            <Badge key={i} variant="mono">{t}</Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge variant="mono">+{project.tech.length - 3}</Badge>
          )}
        </div>
        <div className="flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" className="text-text-muted hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" className="text-text-muted hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
