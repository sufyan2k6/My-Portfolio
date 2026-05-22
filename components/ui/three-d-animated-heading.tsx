'use client';

import React from 'react';
import { motion } from 'motion/react';

interface ThreeDAnimatedHeadingProps {
  text: string;
  className?: string;
  accentText?: string;
  accentColor?: string; // e.g. "#C3E41D" or "text-[#C3E41D]"
}

export function ThreeDAnimatedHeading({
  text,
  className = "",
  accentText = "",
  accentColor = "text-[#C3E41D]",
}: ThreeDAnimatedHeadingProps) {
  // Split primary text and accent text into characters for letter-by-letter staggering inside a 3D perspective wrapper
  const mainWords = text.split(" ");
  const accentWords = accentText ? accentText.split(" ") : [];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      z: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative select-none ${className}`}
      style={{ perspective: "1000px" }}
    >
      <h2 className="text-4xl md:text-6xl font-extrabold font-mono tracking-[0.2em] uppercase text-white flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
        {/* Main Text */}
        <span className="flex flex-wrap gap-x-2">
          {mainWords.map((word, wordIdx) => (
            <span key={`word-${wordIdx}`} className="inline-flex whitespace-nowrap overflow-visible">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={`char-${charIdx}`}
                  variants={letterVariants}
                  className="inline-block transform-gpu origin-bottom text-white hover:text-[#C3E41D] hover:scale-110 transition-colors duration-200 cursor-default"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>

        {/* Accent Text */}
        {accentWords.length > 0 && (
          <span className={`flex flex-wrap gap-x-2 ${accentColor}`}>
            {accentWords.map((word, wordIdx) => (
              <span key={`accent-word-${wordIdx}`} className="inline-flex whitespace-nowrap overflow-visible">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={`accent-char-${charIdx}`}
                    variants={letterVariants}
                    className="inline-block transform-gpu origin-bottom hover:text-white hover:scale-110 transition-colors duration-200 cursor-default"
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
        )}
      </h2>
    </motion.div>
  );
}

// Special smaller subheading animation
export function ThreeDSubHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const letters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateY: 90,
      z: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative select-none ${className}`}
      style={{ perspective: "800px" }}
    >
      <h3 className="text-2xl md:text-4xl font-bold font-mono tracking-wider text-neutral-300 uppercase flex flex-wrap justify-center md:justify-start">
        {letters.map((char, idx) => (
          <motion.span
            key={idx}
            variants={letterVariants}
            className="inline-block transform-gpu origin-center hover:text-[#C3E41D] hover:scale-105 transition-colors duration-200 cursor-default"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </h3>
    </motion.div>
  );
}
