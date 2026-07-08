"use client";

import { useEffect, useRef, useState } from "react";

const TUBES_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

type TubesApp = {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
  dispose?: () => void;
};

type TubesCursorFactory = (
  canvas: HTMLCanvasElement,
  options: {
    tubes: {
      colors: string[];
      lights: {
        intensity: number;
        colors: string[];
      };
    };
  }
) => TubesApp;

function randomColors(count: number) {
  return new Array(count)
    .fill(0)
    .map(
      () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`
    );
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRun, setShouldRun] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const desktopPointer =
          window.innerWidth > 768 && window.matchMedia("(pointer: fine)").matches;
        setShouldRun(entry.isIntersecting && desktopPointer && !document.hidden);
      },
      { rootMargin: "100px" }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldRun) return;

    let app: TubesApp | null = null;
    let cancelled = false;

    const loadTubes = async () => {
      const importRemoteModule = new Function(
        "url",
        "return import(url)"
      ) as (url: string) => Promise<{ default: TubesCursorFactory }>;

      const module = await importRemoteModule(TUBES_MODULE_URL);
      if (cancelled) return;

      app = module.default(canvas, {
        tubes: {
          colors: ["#f967fb", "#53bc28", "#6958d5"],
          lights: {
            intensity: 200,
            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
          },
        },
      });
    };

    const randomizeTubes = () => {
      if (!app) return;
      app.tubes.setColors(randomColors(3));
      app.tubes.setLightsColors(randomColors(4));
    };

    const loadTimer = window.setTimeout(() => {
      loadTubes().catch(() => undefined);
    }, 150);
    document.body.addEventListener("click", randomizeTubes);

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimer);
      document.body.removeEventListener("click", randomizeTubes);
      app?.dispose?.();
      canvas.width = 1;
      canvas.height = 1;
    };
  }, [shouldRun]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
}
