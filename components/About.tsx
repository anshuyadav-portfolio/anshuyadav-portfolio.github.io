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
          Meet Anshu Yadav
        </h2>
        <div className="mt-8 max-w-2xl space-y-7 text-base leading-relaxed text-neutral-600 md:text-lg">
          <p>
            I’m a Social Media Manager and Brand Strategist with <strong className="font-semibold text-neutral-950">1+ year of experience</strong>, building brand presence on Instagram and LinkedIn.
          </p>

          <div>
            <h3 className="mb-1 font-semibold text-neutral-950">Sectors I’ve Worked In</h3>
            <p>
              Architecture, interiors, and furniture, with brands including <strong className="font-semibold text-neutral-950">TOD Innovations and Studio MNT</strong>.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-neutral-950">What I Specialize In</h3>
            <p>
              Content strategy, brand storytelling, founder-led content, copywriting, shoot planning, post design, and reel editing.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-neutral-950">Impact I’ve Helped Create</h3>
            <p>
              Contributed to growing a brand’s Instagram community to <strong className="font-semibold text-neutral-950">10,000 followers in just 5 Months</strong>, with individual reels reaching <strong className="font-semibold text-neutral-950">100,000+ views</strong>.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-neutral-950">Tools &amp; Creative Skills</h3>
            <p>
              Canva, Adobe tools, and Instagram Edits, alongside AI tools for ideation, visual exploration, and AI-led content creation.
            </p>
          </div>

          <p className="border-l border-neutral-300 pl-5 text-neutral-800">
            My approach: understand the brand, find the story, and give people a reason to pay attention.
          </p>
        </div>
      </div>
    </section>
  );
}
