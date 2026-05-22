"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, School, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThreeDAnimatedHeading } from '@/components/ui/three-d-animated-heading';

const SQRT_5000 = Math.sqrt(5000);

const journeyData = [
  {
    tempId: 0,
    title: "B.Tech in Computer Science",
    subtitle: "KITSW",
    description: "Currently pursuing a Bachelor of Technology in Computer Science. Focusing on AI, web development, and competitive programming.",
    date: "2025 - Present",
    imgSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    tempId: 1,
    title: "Intermediate (MPC)",
    subtitle: "Resonance Junior College",
    description: "Completed my intermediate education with a focus on Mathematics, Physics, and Chemistry. Achieved a score of 960/1000.",
    date: "Warangal | Score: 960/1000",
    imgSrc: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop",
    icon: <School className="w-6 h-6" />
  },
  {
    tempId: 2,
    title: "SSC / Schooling",
    subtitle: "Rishi High School",
    description: "Foundational schooling completed with academic excellence. Achieved a CGPA of 9.8/10.0.",
    date: "Warangal | CGPA: 9.8/10.0",
    imgSrc: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400&auto=format&fit=crop",
    icon: <BookOpen className="w-6 h-6" />
  }
];

interface JourneyCardProps {
  position: number;
  item: typeof journeyData[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ 
  position, 
  item, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-neutral-900 text-white border-[#C3E41D]" 
          : "z-0 bg-white/5 backdrop-blur-sm text-neutral-400 border-neutral-800 hover:border-[#C3E41D]/30"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 30px rgba(195, 228, 29, 0.1)" : "none"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-[#C3E41D]/20"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1
        }}
      />
      <div className="flex items-start justify-between mb-6">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="h-16 w-14 object-cover"
          style={{
            boxShadow: isCenter ? "4px 4px 0px #C3E41D" : "4px 4px 0px #333"
          }}
        />
        <div className={cn(
            "p-2 rounded-md",
            isCenter ? "bg-[#C3E41D] text-black" : "bg-neutral-800 text-neutral-400"
        )}>
            {item.icon}
        </div>
      </div>
      
      <h3 className={cn(
        "text-xl sm:text-2xl font-bold font-mono tracking-tighter uppercase",
        isCenter ? "text-[#C3E41D]" : "text-neutral-200"
      )}>
        {item.title}
      </h3>
      <p className={cn(
          "text-sm font-medium uppercase tracking-widest mt-1",
          isCenter ? "text-white" : "text-neutral-500"
      )}>
        {item.subtitle}
      </p>
      
      <p className={cn(
        "mt-6 text-sm leading-relaxed",
        isCenter ? "text-neutral-300" : "text-neutral-600"
      )}>
        {item.description}
      </p>

      <p className={cn(
        "absolute bottom-8 left-8 right-8 text-[10px] font-mono uppercase tracking-[0.2em]",
        isCenter ? "text-[#C3E41D]" : "text-neutral-700"
      )}>
        {item.date}
      </p>
    </div>
  );
};

export const StaggerJourney: React.FC = () => {
  const [cardSize, setCardSize] = useState(380);
  const [journeyList, setJourneyList] = useState(journeyData);

  const handleMove = (steps: number) => {
    const newList = [...journeyList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setJourneyList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 380 : 310);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-20">
        <ThreeDAnimatedHeading text="MY" accentText="JOURNEY" className="flex md:justify-start justify-center mb-4" />
        <div className="w-24 h-1 bg-[#C3E41D] mx-auto md:mx-0"></div>
      </div>

      <div
        className="relative w-full overflow-visible"
        style={{ height: 600 }}
      >
        {journeyList.map((item, index) => {
          const position = journeyList.length % 2
            ? index - (journeyList.length - 1) / 2
            : index - journeyList.length / 2;
          return (
            <JourneyCard
              key={item.tempId}
              item={item}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-6 z-30">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-16 w-16 items-center justify-center text-2xl transition-all duration-300",
              "bg-black border border-neutral-700 text-white hover:bg-[#C3E41D] hover:text-black hover:border-black shadow-lg"
            )}
            aria-label="Previous step"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-16 w-16 items-center justify-center text-2xl transition-all duration-300",
              "bg-black border border-neutral-700 text-white hover:bg-[#C3E41D] hover:text-black hover:border-black shadow-lg"
            )}
            aria-label="Next step"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
