'use client';

import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { ThreeDAnimatedHeading } from '@/components/ui/three-d-animated-heading';

const achievements = [
  {
    title: "IdeaSprint 24-Hour Hackathon",
    award: "Runner-Up Position",
    org: "MAAD IoT Solutions",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-[#C3E41D]" />
  },
  {
    title: "SRIX Incubator",
    award: "Runner-Up",
    org: "Innovation Hub",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-[#C3E41D]" />
  },
  {
    title: "HackStorm 2026",
    award: "Top Position",
    org: "Dept of CSE, KITSW",
    icon: <Star className="w-8 h-8 md:w-10 md:h-10 text-[#C3E41D]" />
  },
  {
    title: "Capture The Flag (CTF)",
    award: "Participant",
    org: "Ditto Security Innovation",
    icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-[#C3E41D]" />
  }
];

export function AchievementsStrip() {
  return (
    <section className="bg-black py-24 border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
        <ThreeDAnimatedHeading text="" accentText="ACHIEVEMENTS" className="flex md:justify-start justify-center" />
        <div className="w-24 h-1 bg-[#C3E41D] mt-4 mx-auto md:mx-0"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Vertical Line for timeline feel */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 z-0" />
        
        <div className="flex flex-col gap-12 relative z-10">
          {achievements.map((ach, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
            >
              <div className="flex-1 hidden md:block" />
              
              <div className="relative">
                <div className="p-4 bg-neutral-900 rounded-full border-2 border-neutral-800 group-hover:border-[#C3E41D] transition-colors bg-neutral-900 z-10 relative">
                  {ach.icon}
                </div>
              </div>

              <div className="flex-1 bg-neutral-950 p-6 md:p-8 border border-neutral-800 rounded-2xl hover:border-[#C3E41D]/50 transition-all group">
                <span className="text-[#C3E41D] text-[10px] font-mono tracking-[0.2em] uppercase mb-2 block">
                  {ach.award}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-bold font-mono leading-tight tracking-tighter uppercase mb-2">
                  {ach.title}
                </h3>
                <p className="text-neutral-500 text-xs md:text-sm uppercase tracking-widest">
                  {ach.org}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
