"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setTime(`${istTime} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border py-8 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-text-muted">
            Anshu Yadav
          </div>
          <div className="font-mono text-xs text-text-muted">
            &copy; {new Date().getFullYear()} &middot; Personal portfolio
          </div>
          <div className="font-mono text-xs text-text-muted flex flex-col md:flex-row items-center gap-2">
            {time && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>{time}</span>
                </div>
                <span className="hidden md:inline">&middot;</span>
              </>
            )}
            <span>Stories shaped with intent</span>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-5 text-center font-mono text-[10px] leading-relaxed text-text-muted">
          Tube cursor effect by{" "}
          <a
            href="https://www.framer.com/@kevin-levron/"
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary transition-colors hover:text-white"
          >
            Kevin Levron
          </a>{" "}
          under{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary transition-colors hover:text-white"
          >
            CC BY-NC-SA 4.0
          </a>
        </div>
      </div>
    </footer>
  );
}
