"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlowCard({ children, className, glowColor = "rgba(255,255,255,0.1)" }: Readonly<GlowCardProps>) {
  const gradient = glowColor.replace(/[\d.]+\)$/, "0.08)");
  return (
    <div
      className={cn(
        "group relative bg-surface border border-border rounded-2xl transition-all duration-300 hover:border-border-2",
        className
      )}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{ boxShadow: `0 0 50px ${glowColor}` }} />
      {/* Diagonal gradient gloss */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${gradient} 0%, rgba(255,255,255,0.02) 50%, transparent 100%)` }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
