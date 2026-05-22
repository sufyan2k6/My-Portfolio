"use client";
import React, { useState, useEffect, useRef, ElementType } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.75,
      Math.min(1, 0.75 + 0.25 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-[600px] flex flex-col items-center justify-center bg-black overflow-hidden relative border border-neutral-900 rounded-3xl"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Subtle Radial Spoke Lines (Grid System) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <div
              key={angle}
              className="absolute w-[460px] h-px bg-gradient-to-r from-transparent via-neutral-900/40 to-transparent"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            />
          ))}

          {/* Central Technical Core (3D Spherical Glow & Tech Rings) */}
          <div className="absolute w-16 h-16 rounded-full bg-neutral-950 border border-[#C3E41D]/30 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(195,228,29,0.3)]">
            {/* Pulsing Radial Aura */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#C3E41D_0%,_transparent_70%)] opacity-30 animate-pulse" />
            
            {/* Spinning Holographic tech details */}
            <div className="absolute -inset-2 rounded-full border border-dashed border-[#C3E41D]/40 animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-4 rounded-full border border-[#C3E41D]/10 animate-[spin_20s_linear_infinite_reverse]" />
            
            {/* Ping Animations */}
            <div className="absolute w-20 h-20 rounded-full border border-[#C3E41D]/20 animate-ping opacity-40" />
            <div
              className="absolute w-24 h-24 rounded-full border border-[#C3E41D]/10 animate-ping opacity-30"
              style={{ animationDelay: "0.5s" }}
            />
            
            {/* Dynamic Core Jewel */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#C3E41D] to-white shadow-[0_0_15px_#C3E41D] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
            </div>
          </div>

          {/* Concentric Orbital Tracks */}
          {/* 1. Inside decorative faint target ring */}
          <div className="absolute w-[180px] h-[180px] rounded-full border border-[#C3E41D]/5 bg-neutral-950/20 backdrop-blur-[2px]" />
          <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-neutral-900/60 animate-[spin_120s_linear_infinite]" />

          {/* 2. Inner detailed tech ring with tick marks */}
          <div className="absolute w-[320px] h-[320px] rounded-full border border-neutral-800/50 flex items-center justify-center">
            {/* Tick marks */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C3E41D]/20 animate-[spin_60s_linear_infinite]" />
          </div>

          {/* 3. Main Pathway Orbit (radius 200 = 400px diameter) */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-[#C3E41D]/10 shadow-[0_0_30px_rgba(195,228,29,0.03)]" />
          <div className="absolute w-[400px] h-[400px] rounded-full border-2 border-dashed border-neutral-800/40 animate-[spin_90s_linear_infinite_reverse]" />

          {/* 4. Outer Accent Orbit Track */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-neutral-900/80 animate-[spin_180s_linear_infinite]" />
          <div className="absolute w-[480px] h-[480px] rounded-full border border-dotted border-[#C3E41D]/5" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer group/node"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 transition-transform duration-500 group-hover/node:scale-125 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(195,228,29,0.3) 0%, rgba(195,228,29,0) 70%)`,
                    width: `${item.energy * 0.5 + 45}px`,
                    height: `${item.energy * 0.5 + 45}px`,
                    left: `-${(item.energy * 0.5 + 45 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 45 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-11 h-11 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#C3E41D] text-black"
                      : isRelated
                      ? "bg-[#C3E41D]/70 text-black font-bold"
                      : "bg-neutral-900 text-white group-hover/node:bg-[#C3E41D] group-hover/node:text-black"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-[0_0_20px_#C3E41D]"
                      : isRelated
                      ? "border-[#C3E41D] animate-pulse shadow-[0_0_12px_rgba(195,228,29,0.5)]"
                      : "border-neutral-700 group-hover/node:border-white shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : "group-hover/node:scale-125"}
                `}
                >
                  <Icon size={18} className="transition-transform duration-300 group-hover/node:rotate-12" />
                </div>

                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-mono font-bold tracking-wider uppercase
                  px-3 py-1 rounded-full border bg-neutral-950/95 backdrop-blur-md
                  transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.8)]
                  ${
                    isExpanded 
                      ? "text-[#C3E41D] border-[#C3E41D] scale-110 shadow-[0_0_15px_rgba(195,228,29,0.4)]" 
                      : isRelated
                      ? "text-white border-[#C3E41D]/50 scale-105"
                      : "text-neutral-200 border-neutral-800 group-hover/node:text-white group-hover/node:border-neutral-600 group-hover/node:scale-105"
                  }
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-28 left-1/2 -translate-x-1/2 w-80 bg-neutral-950/95 border-neutral-700 backdrop-blur-lg shadow-2xl shadow-black overflow-hidden z-[300]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#C3E41D] shadow-[0_0_10px_#C3E41D]"></div>
                    <CardHeader className="pb-3 border-b border-neutral-900/60">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-3 py-0.5 text-[10px] font-mono leading-none tracking-widest ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status.toUpperCase()}
                        </Badge>
                        <span className="text-[10px] font-mono text-neutral-400 font-bold tracking-wider">
                          {item.date.toUpperCase()}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-mono tracking-tighter uppercase text-[#C3E41D] mt-2 font-black">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-neutral-300 mt-3 space-y-4">
                      <p className="leading-relaxed text-neutral-300 font-sans">
                        {item.content}
                      </p>

                      <div className="mt-4 pt-4 border-t border-neutral-900">
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono mb-1.5">
                          <span className="flex items-center text-neutral-400 font-bold">
                            <Zap size={11} className="mr-1 text-[#C3E41D]" />
                            PROJECT ENERGY
                          </span>
                          <span className="text-[#C3E41D] font-bold">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#C3E41D] to-white"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-neutral-900">
                          <div className="flex items-center mb-2.5">
                            <Link size={11} className="text-neutral-400 mr-1.5" />
                            <h4 className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 font-bold">
                              Connected Elements
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <button
                                  key={relatedId}
                                  className="flex items-center h-7 px-2.5 text-[11px] font-mono border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-[#C3E41D] rounded text-neutral-300 hover:text-[#C3E41D] transition-all cursor-pointer font-semibold"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={9}
                                    className="ml-1 opacity-70"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
