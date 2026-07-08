"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "./ui/SectionLabel";

const sampleVideos = [
  {
    tag: "Social",
    title: "Sample Reel 01",
    src: "/videos/sample-reel-01.mp4",
  },
  {
    tag: "Creative",
    title: "Sample Reel 02",
    src: "/videos/sample-reel-02.mp4",
  },
  {
    tag: "Behind the Scenes",
    title: "Sample Reel 03",
    src: "/videos/sample-reel-03.mp4",
  },
  {
    tag: "Introduction",
    title: "Sample Reel 04",
    src: "/videos/sample-reel-04.mp4",
  },
  {
    tag: "Social",
    title: "Sample Reel 05",
    src: "/videos/sample-reel-05.mp4",
  },
];

function ReelVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px", threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${title} sample video`}
    >
      Your browser does not support video playback.
    </video>
  );
}

export default function VideoCarousel() {
  const reelRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "200px" }
    );
    visibilityObserver.observe(reel);

    let frameId = 0;
    let previousTime = performance.now();

    const moveReels = (time: number) => {
      const elapsed = Math.min(time - previousTime, 32);
      previousTime = time;

      if (
        isVisibleRef.current &&
        !isPausedRef.current &&
        !prefersReducedMotionRef.current &&
        !document.hidden
      ) {
        reel.scrollLeft += elapsed * 0.035;

        const loopPoint = reel.scrollWidth / 2;
        if (reel.scrollLeft >= loopPoint) {
          reel.scrollLeft -= loopPoint;
        }
      }

      frameId = requestAnimationFrame(moveReels);
    };

    frameId = requestAnimationFrame(moveReels);
    return () => {
      cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
    };
  }, []);

  const scrollReels = (direction: number) => {
    const reel = reelRef.current;
    if (!reel) return;

    reel.scrollBy({
      left: direction * reel.clientWidth * 0.72,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="sample-reels"
      className="overflow-hidden border-y border-border bg-background py-16 md:py-24"
    >
      <div className="mb-10 flex w-full flex-col gap-7 px-6 md:mb-12 md:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <SectionLabel>Sample Videos</SectionLabel>
          <h2 className="mb-0 text-3xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
            Creators Feed
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollReels(-1)}
            className="min-h-11 rounded-full border border-border-2 px-5 text-sm text-text-secondary transition-colors hover:border-white/40 hover:text-white active:scale-[0.98]"
            aria-label="Scroll to previous videos"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => scrollReels(1)}
            className="min-h-11 rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/90 active:scale-[0.98]"
            aria-label="Scroll to next videos"
          >
            Next
          </button>
        </div>
      </div>

      <div
        ref={reelRef}
        className="reel-strip flex gap-3 overflow-x-auto pb-2 pr-3 md:gap-4 md:pr-4"
        aria-label="Sample social video carousel"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
        onPointerDown={() => {
          isPausedRef.current = true;
        }}
        onPointerUp={() => {
          isPausedRef.current = false;
        }}
      >
        {[...sampleVideos, ...sampleVideos].map((video, index) => (
          <article
            key={`${video.title}-${index}`}
            className="group relative aspect-[9/16] w-[76vw] flex-none overflow-hidden bg-surface sm:w-[44vw] lg:w-[23vw] lg:max-w-[430px]"
            aria-hidden={index >= sampleVideos.length ? "true" : undefined}
          >
            <ReelVideo src={video.src} title={video.title} />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

            <span className="absolute left-4 top-4 bg-[#73e6d0] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-black md:left-5 md:top-5 md:text-xs">
              {video.tag}
            </span>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-4 md:p-5">
              <span className="grid h-7 w-7 flex-none place-items-center bg-white font-mono text-[9px] font-bold text-black">
                PLAY
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
