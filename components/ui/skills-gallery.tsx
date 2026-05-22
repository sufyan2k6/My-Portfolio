'use client';

import React from 'react';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import { Badge } from '@/components/ui/badge';
import { Code, FileCode, Github, Zap, Users, Binary } from 'lucide-react';
import { ThreeDAnimatedHeading } from '@/components/ui/three-d-animated-heading';

const skills = [
  { id: 1, title: "C Programming", cat: "Programming", icon: <Binary className="w-16 h-16 md:w-20 md:h-20" /> },
  { id: 2, title: "HTML & CSS", cat: "Web Design", icon: <FileCode className="w-16 h-16 md:w-20 md:h-20" /> },
  { id: 3, title: "Git & GitHub", cat: "DevOps", icon: <Github className="w-16 h-16 md:w-20 md:h-20" /> },
  { id: 4, title: "Problem Solving", cat: "Soft Skill", icon: <Zap className="w-16 h-16 md:w-20 md:h-20" /> },
  { id: 5, title: "Team Collaboration", cat: "Soft Skill", icon: <Users className="w-16 h-16 md:w-20 md:h-20" /> },
];

export function SkillsGallery() {
  return (
    <section className="bg-black py-24 text-white overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-4">
          <ThreeDAnimatedHeading text="MY" accentText="SKILLS" className="flex md:justify-start justify-center" />
          <div className="w-24 h-1 bg-[#C3E41D] mx-auto md:mx-0"></div>
        </div>
        <div className="hidden md:block animate-bounce text-neutral-500 text-xs font-mono uppercase tracking-widest mt-8 md:mt-0">
          ↓ Scroll to rotate
        </div>
      </div>

      <RadialScrollGallery
        className="!min-h-[700px] bg-neutral-950/20"
        baseRadius={450}
        mobileRadius={280}
        visiblePercentage={55}
        scrollDuration={2500}
      >
        {(activeIndex, hoveredIndex) =>
          skills.map((skill, index) => {
            const isActive = activeIndex === index || hoveredIndex === index;
            return (
              <div 
                key={skill.id} 
                className="group relative w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] overflow-hidden rounded-2xl bg-neutral-900 border-2 border-neutral-800 flex flex-col items-center justify-center p-8 transition-all duration-500"
                style={{
                    boxShadow: isActive ? "0px 0px 60px rgba(195, 228, 29, 0.2)" : "none",
                    borderColor: isActive ? "#C3E41D" : "rgb(38 38 38)"
                }}
              >
                {/* Icon Container */}
                <div className={`transition-all duration-500 flex items-center justify-center mb-8 ${isActive ? 'scale-125 text-[#C3E41D]' : 'scale-100 text-neutral-400'}`}>
                  {skill.icon}
                </div>

                <div className="text-center">
                  <h3 className={`text-2xl font-bold leading-tight font-mono tracking-tighter uppercase transition-colors duration-500 ${isActive ? 'text-[#C3E41D]' : 'text-white'}`}>
                      {skill.title}
                  </h3>
                  <div className={`h-1 bg-[#C3E41D] mt-4 mx-auto transition-all duration-700 ease-out ${isActive ? 'w-24 opacity-100' : 'w-0 opacity-0'}`} />
                </div>
              </div>
            );
          })
        }
      </RadialScrollGallery>

      <div className="py-12 flex items-center justify-center">
        <span className="text-[10px] font-mono tracking-[0.5em] text-neutral-700 uppercase">
          Continuous Learning
        </span>
      </div>
    </section>
  );
}
