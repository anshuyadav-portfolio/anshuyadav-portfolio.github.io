"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import Badge from "../ui/Badge";
import MagneticButton from "../ui/MagneticButton";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

const CARD_ACCENTS: Record<string, { glow: string; gradient: string; bar: string }> = {
  "social-strategy": {
    glow: "0 8px 60px rgba(251,191,36,0.25), 0 0 0 1px rgba(251,191,36,0.2)",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(255,255,255,0.03) 40%, rgba(249,115,22,0.06) 100%)",
    bar: "linear-gradient(90deg, rgba(251,191,36,0.8), rgba(249,115,22,0.4), transparent)",
  },
  "content-creation": {
    glow: "0 8px 60px rgba(96,165,250,0.25), 0 0 0 1px rgba(96,165,250,0.2)",
    gradient: "linear-gradient(135deg, rgba(96,165,250,0.1) 0%, rgba(255,255,255,0.03) 40%, rgba(6,182,212,0.06) 100%)",
    bar: "linear-gradient(90deg, rgba(96,165,250,0.8), rgba(6,182,212,0.4), transparent)",
  },
  "account-management": {
    glow: "0 8px 60px rgba(52,211,153,0.25), 0 0 0 1px rgba(52,211,153,0.2)",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.1) 0%, rgba(255,255,255,0.03) 40%, rgba(16,185,129,0.06) 100%)",
    bar: "linear-gradient(90deg, rgba(52,211,153,0.8), rgba(16,185,129,0.4), transparent)",
  },
  "campaign-planning": {
    glow: "0 8px 60px rgba(167,139,250,0.25), 0 0 0 1px rgba(167,139,250,0.2)",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.1) 0%, rgba(255,255,255,0.03) 40%, rgba(139,92,246,0.06) 100%)",
    bar: "linear-gradient(90deg, rgba(167,139,250,0.8), rgba(139,92,246,0.4), transparent)",
  },
};

const DEFAULT_ACCENT = {
  glow: "0 8px 40px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.1)",
  gradient: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
  bar: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)",
};

const PASTEL_SURFACES = [
  { card: "#fff4c9", visual: "#f7e4a3", border: "#ead27d" },
  { card: "#e4f0ff", visual: "#cfe2fb", border: "#b7d1ee" },
  { card: "#e2f6ea", visual: "#ccebd8", border: "#b5ddc4" },
  { card: "#f0e8ff", visual: "#ddcff5", border: "#cdb9eb" },
];

interface Highlight {
  icon: string;
  text: string;
  style: string; // Tailwind classes for color
  glow: string;  // inline box-shadow
}

const CARD_HIGHLIGHTS: Record<string, Highlight[]> = {
  "social-strategy": [
    {
      icon: "◎",
      text: "Audience-first planning",
      style: "bg-amber-500/15 border-amber-700/25 text-amber-900",
      glow: "inset 0 1px 0 rgba(251,191,36,0.2), 0 0 10px rgba(251,191,36,0.1)",
    },
    {
      icon: "✦",
      text: "Built around your brand voice",
      style: "bg-orange-500/15 border-orange-700/20 text-orange-900",
      glow: "inset 0 1px 0 rgba(249,115,22,0.2), 0 0 10px rgba(249,115,22,0.08)",
    },
  ],
  "account-management": [
    {
      icon: "✓",
      text: "Consistent from idea to publish",
      style: "bg-emerald-500/15 border-emerald-700/25 text-emerald-900",
      glow: "inset 0 1px 0 rgba(52,211,153,0.2), 0 0 10px rgba(52,211,153,0.1)",
    },
  ],
};

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const accent = CARD_ACCENTS[project.id] || DEFAULT_ACCENT;
  const surface = PASTEL_SURFACES[index % PASTEL_SURFACES.length];
  const renderVisual = () => {
    if (project.id === "social-strategy") {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-5 gap-3 overflow-hidden" style={{ backgroundColor: surface.visual }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 bg-amber-400/20 blur-3xl pointer-events-none"
          />
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="relative z-10 bg-[#1a1200] border border-amber-500/25 rounded-2xl p-4 w-full"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-amber-400 tracking-widest uppercase">Content Plan</span>
              <span className="flex items-center gap-1 font-mono text-[9px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                Ready
              </span>
            </div>
            {[
              { icon: "◎", label: "Brand Direction", sub: "Voice and audience" },
              { icon: "✦", label: "Content Pillars", sub: "Themes that stay consistent" },
              { icon: "↗", label: "Channel Rhythm", sub: "A practical publishing plan" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                viewport={{ once: false }}
                className="flex items-start gap-2 py-2 border-b border-amber-500/10 last:border-0"
              >
                <span className="text-sm leading-none mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-white text-[11px] font-medium">{item.label}</div>
                  <div className="text-amber-400/60 text-[9px] font-mono mt-0.5">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: false }}
            className="relative z-10 flex items-center gap-2 w-full bg-amber-950/40 border border-amber-500/15 rounded-xl px-3 py-2"
          >
            <span className="text-base">✎</span>
            <div>
              <div className="text-white text-[10px] font-medium">Strategy before posting</div>
              <div className="text-amber-400/60 text-[9px] font-mono">Every story has a reason</div>
            </div>
          </motion.div>
        </div>
      );
    }
    if (project.id === "account-management") {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-5 gap-3 overflow-hidden" style={{ backgroundColor: surface.visual }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0 bg-emerald-500/15 blur-3xl pointer-events-none"
          />
          <div className="relative z-10 flex gap-1.5 w-full">
            {[
              { label: "Ideas", dot: "bg-blue-400", count: 12, items: ["Insights", "Trends", "+10"] },
              { label: "In Review", dot: "bg-amber-400", count: 4, items: ["Reels", "+3"] },
              { label: "Ready", dot: "bg-emerald-400", count: 1, items: ["Publish ✓"] },
            ].map((col, ci) => (
              <motion.div
                key={ci}
                initial={{ y: 14, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: ci * 0.15 }}
                viewport={{ once: false }}
                className="flex-1 bg-[#0f150f] border border-white/5 rounded-xl p-2"
              >
                <div className="flex items-center gap-1 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                  <span className="font-mono text-[8px] text-text-muted uppercase tracking-wide flex-1">{col.label}</span>
                  <span className="font-mono text-[9px] text-text-muted">{col.count}</span>
                </div>
                {col.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + ci * 0.15 + i * 0.08 }}
                    viewport={{ once: false }}
                    className={`text-[9px] px-2 py-1 rounded mb-1 last:mb-0 font-medium ${item.includes("✓") ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-text-muted border border-white/5"}`}
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: false }}
            className="relative z-10 flex items-center gap-1.5 w-full bg-emerald-950/50 border border-emerald-800/30 rounded-full px-3 py-1.5 justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] text-emerald-400">Copy · Creative · Calendar</span>
          </motion.div>
        </div>
      );
    }
    if (project.id === "campaign-planning") {
      return (
        <div className="relative w-full h-full p-6 flex flex-col justify-center" style={{ backgroundColor: surface.visual }}>
          <div className="bg-[#182c4a] border border-white/10 rounded-lg p-4 font-mono text-xs shadow-2xl">
            <div className="flex gap-2 mb-4 border-b border-border pb-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="text-gray-300"
            >
              <span className="text-blue-400">const</span> <span className="text-yellow-300">campaign</span> = {'{'}
              <br/>&nbsp;&nbsp;objective: <span className="text-orange-300">&quot;Brand awareness&quot;</span>,
              <br/>&nbsp;&nbsp;voice: <span className="text-orange-300">&quot;Consistent&quot;</span>,
              <br/>&nbsp;&nbsp;ready: <span className="text-blue-400">true</span>
              <br/>{'}'};
            </motion.div>
          </div>
        </div>
      );
    }
    if (project.id === "content-creation") {
      return (
        <div className="relative w-full h-full p-6 flex flex-col justify-center gap-4" style={{ backgroundColor: surface.visual }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-600 text-white p-3 rounded-2xl rounded-tl-sm w-3/4 text-sm shadow-md"
          >
            Let&apos;s turn this insight into a story.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#29476f] text-text-primary p-3 rounded-2xl rounded-tr-sm w-2/3 self-end text-sm border border-white/10 shadow-md"
          >
            Great. I&apos;ll shape it for the right channel.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-600/20 text-blue-400 p-3 rounded-2xl rounded-tl-sm w-16 text-sm flex gap-1 justify-center items-center h-10 shadow-md"
          >
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          </motion.div>
        </div>
      );
    }
    if (project.id === "short-form-video") {
      const bars = [40, 65, 50, 80, 55, 90, 70, 85, 60, 95];
      return (
        <div className="relative w-full h-full bg-[#10213a] p-6 flex flex-col justify-center gap-4 overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs text-emerald-400">CONTENT SIGNALS</span>
            <span className="font-mono text-xs text-emerald-400">LEARN &amp; REFINE</span>
          </div>
          <div className="flex items-end gap-1 h-24">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ backgroundColor: i % 3 === 0 ? "#ef4444" : "#22c55e" }}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                viewport={{ once: false }}
              />
            ))}
          </div>
          <svg viewBox="0 0 200 60" className="w-full h-12 mt-1">
            <motion.polyline
              points="0,50 20,40 40,45 60,25 80,30 100,15 120,20 140,10 160,18 180,5 200,8"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: false }}
            />
          </svg>
          <div className="flex justify-between font-mono text-[10px] text-text-muted">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span>
          </div>
        </div>
      );
    }
    if (project.id === "copy-storytelling") {
      return (
        <div className="relative w-full h-full bg-[#0a0f0a] flex flex-col items-center justify-center gap-4 p-6 overflow-hidden">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl"
            />
            <svg width="72" height="72" viewBox="0 0 72 72" className="relative z-10">
              <motion.path
                d="M36 64 C36 64 12 48 12 28 C12 16 22 8 36 8 C50 8 60 16 60 28 C60 48 36 64 36 64Z"
                fill="#16a34a"
                opacity="0.9"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
              />
              <motion.path
                d="M36 64 C36 64 36 30 36 8"
                stroke="#4ade80"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: false }}
              />
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: false }}
            className="bg-emerald-950/60 border border-emerald-800/50 rounded-lg px-4 py-2 text-center"
          >
            <div className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase mb-1">Content Review</div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-white">On Brand</span>
              <span className="font-mono text-xs text-emerald-400 ml-auto">Ready</span>
            </div>
          </motion.div>
        </div>
      );
    }
    if (project.id === "community-engagement") {
      const grid = [
        ["S","T","O","R","Y"],
        ["B","R","A","N","D"],
        ["S","H","A","R","E"],
      ];
      const colors = [
        ["correct","absent","present","correct","absent"],
        ["present","correct","absent","correct","present"],
        ["absent","present","correct","absent","default"],
      ];
      const colorMap: Record<string, string> = {
        correct: "bg-emerald-600 border-emerald-600",
        present: "bg-yellow-600 border-yellow-600",
        absent: "bg-[#3a3a3c] border-[#3a3a3c]",
        default: "bg-transparent border-border",
      };
      return (
        <div className="relative w-full h-full bg-[#121213] flex flex-col items-center justify-center gap-2 p-6">
          {grid.map((row, ri) => (
            <div key={ri} className="flex gap-2">
              {row.map((letter, ci) => (
                <motion.div
                  key={ci}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: ri * 0.15 + ci * 0.06, type: "spring", stiffness: 300 }}
                  viewport={{ once: false }}
                  className={`w-10 h-10 border-2 flex items-center justify-center font-mono font-bold text-sm text-white rounded ${colorMap[colors[ri][ci]]}`}
                >
                  {letter === "_" ? "" : letter}
                </motion.div>
              ))}
            </div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-mono text-[10px] text-text-muted mt-2 tracking-widest"
          >
            STORY IDEAS IN MOTION
          </motion.div>
        </div>
      );
    }
    if (project.id === "performance-insights") {
      const heights = [85, 30, 65, 15, 50, 75, 25, 55, 40, 70];
      const sorted = [...heights].sort((a, b) => a - b);
      return (
        <div className="relative w-full h-full bg-[#10213a] flex flex-col items-center justify-center gap-4 p-6">
        <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-2">Trend Signals</div>
          <div className="flex items-end gap-1.5 h-28 w-full">
            {heights.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ background: `hsl(${200 + i * 12}, 80%, 60%)` }}
                initial={{ height: `${h}%` }}
                whileInView={{ height: `${sorted[i]}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeInOut" }}
                viewport={{ once: false }}
              />
            ))}
          </div>
          <div className="flex gap-3 font-mono text-[10px]">
            <span className="text-blue-400">Listen</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">Learn · Adapt</span>
          </div>
        </div>
      );
    }
    return <div className="w-full h-full bg-[#10213a]" />;
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01, boxShadow: accent.glow }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onClick(project)}
      className="w-full md:w-[42vw] max-w-[620px] md:h-[65vh] flex-shrink-0 border transition-colors duration-300 rounded-3xl overflow-hidden cursor-pointer flex flex-col md:flex-row group relative"
      style={{ backgroundColor: surface.card, borderColor: surface.border }}
      data-cursor="hover"
    >
      {/* Glossy gradient overlay — appears on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ background: accent.gradient }}
      />

      {/* Mobile accent bar — colored top stripe replacing visual panel on small screens */}
      <div className="block md:hidden h-[3px] w-full flex-shrink-0" style={{ background: accent.bar }} />

      {/* Left Panel — Visual (enters viewport first as card scrolls in from right) */}
      <div className="hidden md:block w-[40%] border-r relative overflow-hidden" style={{ backgroundColor: surface.visual, borderColor: surface.border }}>
        {renderVisual()}
      </div>

      {/* Right Panel — Text */}
      <div className="flex-1 p-5 md:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
          <Badge variant="outline" className="border-black/15 bg-white/35 text-slate-600">{project.year}</Badge>
        </div>

        <div className="mt-6 md:mt-0">
          <h3 className="text-3xl md:text-4xl font-light tracking-tight text-slate-950">{project.title}</h3>
          <p className="text-slate-600 leading-relaxed mt-4 max-w-sm line-clamp-3">
            {project.description}
          </p>
          {CARD_HIGHLIGHTS[project.id] && (
            <div className="flex flex-col gap-2 mt-5">
              {CARD_HIGHLIGHTS[project.id].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono border w-fit backdrop-blur-sm ${h.style}`}
                  style={{ boxShadow: h.glow }}
                >
                  <span>{h.icon}</span>
                  {h.text}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
            {project.tech.slice(0, 4).map((t, i) => (
              <Badge key={i} variant="mono" className="bg-black/[0.06] text-slate-600">{t}</Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="mono" className="bg-black/[0.06] text-slate-600">+{project.tech.length - 4}</Badge>
            )}
          </div>

          <div className="flex items-center gap-6">
            {project.githubUrl && (
              <MagneticButton strength={0.1}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-500 hover:text-slate-950 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
}
