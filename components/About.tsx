"use client";

import { motion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white px-6 py-16 text-neutral-950 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="02" className="text-neutral-500">About</SectionLabel>
        <h2 className="mt-6 max-w-2xl text-3xl font-light tracking-tight text-neutral-950 md:text-5xl">
          The Story Behind Anshu Yadav
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-neutral-600">
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
              className="w-fit rounded-full border border-black/10 bg-neutral-100 px-4 py-2 font-mono text-sm text-neutral-600"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
