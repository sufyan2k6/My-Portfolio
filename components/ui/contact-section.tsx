'use client';

import React from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { ThreeDAnimatedHeading } from '@/components/ui/three-d-animated-heading';

const contactLinks = [
  {
    name: "GitHub",
    label: "sufyan2k6",
    href: "https://github.com/sufyan2k6",
    icon: <Github className="w-6 h-6" />,
    color: "hover:text-white"
  },
  {
    name: "LinkedIn",
    label: "Mohammed Sufyan",
    href: "https://www.linkedin.com/in/mohammed-sufyan-b25cs257/",
    icon: <Linkedin className="w-6 h-6" />,
    color: "hover:text-[#0077B5]"
  },
  {
    name: "Email",
    label: "mohammedsufyan2911@gmail.com",
    href: "mailto:mohammedsufyan2911@gmail.com",
    icon: <Mail className="w-6 h-6" />,
    color: "hover:text-[#EA4335]"
  },
  {
    name: "Phone",
    label: "+91 7893108150",
    href: "tel:+917893108150",
    icon: <Phone className="w-6 h-6" />,
    color: "hover:text-[#C3E41D]"
  }
];

export function ContactSection() {
  return (
    <section className="bg-black py-24 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C3E41D] rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 w-full flex flex-col items-center"
          >
            <ThreeDAnimatedHeading text="GET IN" accentText="TOUCH" className="text-5xl md:text-8xl font-bold font-mono tracking-tighter uppercase text-white mb-6 flex justify-center text-center" />
            <div className="w-32 h-2 bg-[#C3E41D] mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== "Phone" && link.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:border-[#C3E41D] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(195,228,29,0.05)]"
              >
                <div className={`p-4 rounded-xl bg-neutral-900 text-neutral-400 group-hover:bg-[#C3E41D] group-hover:text-black transition-colors duration-300 ${link.color}`}>
                  {link.icon}
                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-1 block">
                    {link.name}
                  </span>
                  <p className="text-white font-mono break-all text-sm group-hover:text-[#C3E41D] transition-colors">
                    {link.label}
                  </p>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-700 group-hover:text-[#C3E41D] absolute top-4 right-4" />
              </motion.a>
            ))}
          </div>

          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-32 pt-12 border-t border-neutral-900 w-full flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Copyright and attribution removed as requested */}
          </motion.footer>
        </div>
      </div>
    </section>
  );
}
