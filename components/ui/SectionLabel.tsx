import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  number?: string;
  className?: string;
}

export default function SectionLabel({ children, number, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4 text-xs font-mono text-text-muted tracking-[0.2em] uppercase mb-8", className)}>
      {number && <span>{number} &mdash;</span>}
      <span>{children}</span>
    </div>
  );
}
