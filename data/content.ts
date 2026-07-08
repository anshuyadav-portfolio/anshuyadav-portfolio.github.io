export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  year: string;
  tier: 1 | 2 | 3;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "web" | "ml" | "systems";
}

export const personalInfo = {
  name: "Anshu Yadav",
  founder: "Anshu Yadav",
  role: "Social Media Strategist & Content Storyteller",
  email: "anspurple16@gmail.com",
  tagline: "I turn brand ideas into social stories people remember.",
  linkedin: "https://www.linkedin.com/in/anshu-yadav-9b21a3158/",
  portfolio: "https://anshuyadav-portfolio.github.io/",
};

export const roles = [
  "Social Strategy",
  "Content Creation",
  "Community Management",
  "Growth Insights",
];

export const projects: Project[] = [
  {
    id: "social-strategy",
    title: "Social Strategy",
    description: "Clear channel plans built around your brand, audience, and goals.",
    longDescription: "Good social content starts with direction. I shape practical channel strategies around your audience, brand voice, content pillars, and business priorities so every post has a clear purpose.",
    tech: ["Audience Research", "Brand Positioning", "Content Pillars", "Channel Planning"],
    year: "Strategy",
    tier: 1,
    featured: true,
    category: "web",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    description: "Platform-ready ideas, copy, and visuals designed to earn attention.",
    longDescription: "I turn strategy into content people can understand, remember, and share. From the first idea to the final caption and creative, each piece is shaped for the channel where it will live.",
    tech: ["Creative Concepts", "Copywriting", "Visual Direction", "Social Formats"],
    year: "Creative",
    tier: 1,
    featured: true,
    category: "web",
  },
  {
    id: "account-management",
    title: "Account Management",
    description: "Consistent publishing, coordination, and day-to-day channel care.",
    longDescription: "I keep social channels organized and active with thoughtful calendars, publishing support, and clear coordination. The result is a steadier presence without losing the personality behind the brand.",
    tech: ["Content Calendars", "Publishing", "Scheduling", "Channel Care"],
    year: "Ongoing",
    tier: 1,
    featured: true,
    category: "web",
  },
  {
    id: "campaign-planning",
    title: "Campaign Planning",
    description: "Focused social campaigns shaped from concept through rollout.",
    longDescription: "I connect a campaign idea to a clear objective, audience, message, and rollout plan. Every stage is designed to feel consistent while leaving room to respond to what the audience tells us.",
    tech: ["Campaign Ideas", "Messaging", "Rollout Plans", "Creative Direction"],
    year: "Campaigns",
    tier: 1,
    featured: true,
    category: "web",
  },
  {
    id: "short-form-video",
    title: "Short-Form Video",
    description: "Concepts and edits for Reels, Shorts, and scroll-first storytelling.",
    longDescription: "I develop short-form video ideas that communicate quickly without feeling disposable. Hooks, structure, pacing, and platform context work together to carry the brand story.",
    tech: ["Reels", "Shorts", "Concepting", "Editing Direction"],
    year: "Video",
    tier: 2,
    featured: false,
    category: "web",
  },
  {
    id: "copy-storytelling",
    title: "Copy & Storytelling",
    description: "Captions and narratives that give your brand a recognizable voice.",
    longDescription: "I find the clearest way to express what makes a brand worth following. That voice carries through captions, campaign narratives, recurring formats, and everyday conversations.",
    tech: ["Brand Stories", "Captions", "Messaging", "Editorial Voice"],
    year: "Copy",
    tier: 2,
    featured: false,
    category: "ml",
  },
  {
    id: "community-engagement",
    title: "Community Engagement",
    description: "Thoughtful conversations that strengthen audience relationships.",
    longDescription: "Social media works best when it feels social. I help brands listen, respond, and participate with a consistent voice that treats every interaction as part of the wider story.",
    tech: ["Community Care", "Responses", "Social Listening", "Engagement"],
    year: "Community",
    tier: 2,
    featured: false,
    category: "web",
  },
  {
    id: "performance-insights",
    title: "Performance Insights",
    description: "Clear reporting and practical lessons for the next round of content.",
    longDescription: "I look beyond surface-level numbers to understand which ideas, formats, and conversations are connecting. Those lessons feed directly into the next content cycle.",
    tech: ["Reporting", "Content Review", "Trend Research", "Optimization"],
    year: "Insights",
    tier: 2,
    featured: false,
    category: "systems",
  },
  {
    id: "brand-voice",
    title: "Brand Voice Development",
    description: "A consistent tone and message your audience can recognize.",
    longDescription: "I define how your brand should sound across social channels, then translate that voice into practical guidance for captions, replies, campaigns, and recurring content.",
    tech: ["Voice Principles", "Tone", "Messaging", "Consistency"],
    year: "Brand",
    tier: 3,
    featured: false,
    category: "ml",
  },
];

export const experience = [
  {
    company: "Discover & Define",
    role: "Build the direction",
    period: "Step 01",
    location: "Strategy",
    type: "discover",
    highlights: [
      "Understand the brand, audience, goals, and current social presence.",
      "Clarify the voice, content pillars, and channels that matter.",
      "Turn the findings into a focused plan everyone can work from.",
    ],
  },
  {
    company: "Create & Refine",
    role: "Shape the story",
    period: "Step 02",
    location: "Creative",
    type: "create",
    highlights: [
      "Develop platform-ready concepts, copy, and creative direction.",
      "Review every piece for clarity, consistency, and brand fit.",
      "Build a content rhythm that is useful and sustainable.",
    ],
  },
  {
    company: "Publish & Learn",
    role: "Keep improving",
    period: "Step 03",
    location: "Insights",
    type: "learn",
    highlights: [
      "Coordinate publishing and support day-to-day channel activity.",
      "Listen to audience response and review meaningful signals.",
      "Carry practical lessons into the next content cycle.",
    ],
  },
];

export const skills = {
  web: ["Audience Research", "Brand Positioning", "Content Strategy", "Campaign Planning"],
  systems: ["Short-Form Video", "Visual Design", "Copywriting", "Content Calendars"],
  ml: ["Publishing", "Scheduling", "Community Management", "Audience Engagement"],
  tools: ["Performance Reporting", "Trend Research", "Social Listening", "Content Optimization"],
};

export const education = {
  institution: "Anshu Yadav",
  degree: "Social Media Strategist & Content Storyteller",
  period: "Founder-led",
  location: "Social Media",
  cgpa: "AY",
  coursework: ["Strategy", "Creative Direction", "Client Collaboration"],
};
