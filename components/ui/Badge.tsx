import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "mono";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white/80 rounded-full px-3 py-1 text-xs font-mono",
    outline: "border border-border text-text-muted rounded-full px-3 py-1 text-xs",
    mono: "bg-surface font-mono text-xs text-text-muted px-2 py-0.5 rounded",
  };

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  );
}
