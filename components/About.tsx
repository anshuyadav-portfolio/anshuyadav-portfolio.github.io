"use client";

import { motion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto flex max-w-6xl flex-col justify-center px-6 py-16 md:px-12 md:py-32"
    >
      <div className="max-w-2xl">
        <SectionLabel number="02">About</SectionLabel>
        <h2 className="mt-6 text-3xl font-light tracking-tight text-white md:text-5xl">
          The Story Behind Anshu Yadav
        </h2>
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
          <p>
            Anshu Yadav works with brands that have something to say but need the right way to say it.
          </p>
          <p>
            I work with founders, brand owners, product teams, and growing businesses to shape content that feels sharp, human, and worth remembering.
          </p>
          <p>
            I don&apos;t believe in posting for the sake of posting.
          </p>
          <p>
            I build brand stories, social media narratives, and content ideas that help businesses show up with clarity, character, and confidence.
          </p>
          <p>
            Because today, attention is earned through stories that feel real.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {["Founder-led", "Story-first", "Strategy-backed"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-fit rounded-full border border-border bg-surface px-4 py-2 font-mono text-sm text-text-muted"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
