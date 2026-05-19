"use client";

import { MessageSquare, Layout, Cpu, Code, Zap } from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const projectData: TimelineItem[] = [
  {
    id: 1,
    title: "Project Objective",
    date: "Objective",
    content: "Designed and implemented a full-stack AI chatbot application that interacts with users in a natural, conversational manner using modern AI tools and software engineering practices.",
    category: "Planning",
    icon: Layout,
    relatedIds: [2, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "The Tech Stack",
    date: "Infrastructure",
    content: "Built using Python, FastAPI for the backend, Streamlit for the frontend interface, and Large Language Model (LLM) APIs for core intelligence.",
    category: "Tools",
    icon: Code,
    relatedIds: [1, 3],
    status: "completed",
    energy: 95,
  },
  {
    id: 3,
    title: "System Architecture",
    date: "Structure",
    content: "Follows a modular client-server architecture where Streamlit handles user interaction and FastAPI manages logic and LLM communication.",
    category: "Backend",
    icon: Cpu,
    relatedIds: [1, 2, 4],
    status: "completed",
    energy: 90,
  },
  {
    id: 4,
    title: "Functional Workflow",
    date: "Interaction",
    content: "The workflow ensures real-time processing: User input -> FastAPI request -> LLM generation -> Streamlit UI display with minimal latency.",
    category: "Logic",
    icon: Zap,
    relatedIds: [3, 5],
    status: "completed",
    energy: 100,
  },
  {
    id: 5,
    title: "Multi-Language UI",
    date: "Features",
    content: "Provides an interactive chat interface with multi-language support (English, Hindi, Hinglish) and real-time message display.",
    category: "Frontend",
    icon: MessageSquare,
    relatedIds: [4, 1],
    status: "completed",
    energy: 85,
  },
];

export function ProjectsSection() {
  return (
    <section className="bg-black py-24 border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-[0.2em] uppercase text-white">
          <span className="text-[#C3E41D]">PROJECTS</span>
        </h2>
        <div className="w-24 h-1 bg-[#C3E41D] mt-4 mx-auto md:mx-0"></div>
        <p className="mt-6 text-neutral-500 font-mono text-sm max-w-xl">
          <span className="block mt-1 text-[#C3E41D]/60 animate-pulse uppercase tracking-widest font-bold">CLICK A NODE TO EXPAND.</span>
        </p>
      </div>

      <div className="w-full">
         <RadialOrbitalTimeline timelineData={projectData} />
      </div>
    </section>
  );
}
