import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Inline Button component (using shadcn-like structure if needed, but keeping user's request for now)
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function Component() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { label: "HOME", href: "#", highlight: true },
    { label: "ABOUT", href: "#" },
    { label: "PROJECTS", href: "#" },
    { label: "EXPERIENCE", href: "#" },
    { label: "EDUCATION", href: "#" },
    { label: "WRITING", href: "#" },
    { label: "CONTACT", href: "#" },
  ];

  return (
    <div 
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* Icon removed as requested */}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[240px] md:w-[280px] border-none shadow-2xl mt-2 ml-4 p-6 rounded-xl z-[100]"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 3%)" : "hsl(0 0% 100%)",
                }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-xl md:text-2xl font-bold tracking-tight py-2 px-2 cursor-pointer transition-colors duration-300"
                    style={{
                      color: item.highlight ? "#C3E41D" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C3E41D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight ? "#C3E41D" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>



        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Sidebar / Context Elements (Vertical Text) */}
        <div 
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-12 text-[10px] tracking-[0.5em] text-neutral-600 uppercase pointer-events-none select-none" 
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span>Based in Warangal, India</span>
          <span>Portfolio 2026</span>
        </div>

        {/* Right Decor Element */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 items-center">
          <div className="w-px h-24 bg-neutral-800"></div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C3E41D" }}></div>
          <div className="w-px h-24 bg-neutral-800"></div>
        </div>

        {/* Background Text Accent (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap">
          <span className="text-[20vw] font-bold tracking-tighter uppercase font-mono">
            BUILDER
          </span>
        </div>

        {/* Centered Main Name */}
        <div className="relative z-10 w-full px-4 text-center">
            <div className="flex flex-col items-center gap-0">
              <BlurText
                text="MOHAMMED"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[13vw] sm:text-[11vw] md:text-[10vw] leading-[0.75] tracking-tighter uppercase whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
              <BlurText
                text="SUFYAN"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[13vw] sm:text-[11vw] md:text-[10vw] leading-[0.75] tracking-tighter uppercase whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>


        </div>

        {/* Tagline */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full px-6 max-w-2xl">
          <div className="flex justify-center flex-col items-center gap-6">
            <BlurText
              text="Designing human experiences in code."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-lg md:text-xl font-light tracking-wide text-center transition-colors duration-300 text-neutral-400 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-600">
                <span>AI & Web Dev</span>
                <span>Problem Solver</span>
                <span>Creative Tech</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-neutral-500" />
        </div>
      </main>
    </div>
  );
}
