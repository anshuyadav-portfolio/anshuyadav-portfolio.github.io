"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 w-[2px] h-[60vh] bg-border z-50 hidden md:block">
      <motion.div
        className="w-full bg-white origin-top"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}
