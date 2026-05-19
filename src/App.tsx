/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import PortfolioHero from "@/components/ui/portfolio-hero";
import { StaggerJourney } from "@/components/ui/stagger-testimonials";
import { SkillsGallery } from "@/components/ui/skills-gallery";
import { AchievementsStrip } from "@/components/ui/achievements";
import { ProjectsSection } from "@/components/ui/projects-section";
import { ContactSection } from "@/components/ui/contact-section";

export default function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Antic&family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <div className="w-full bg-black min-h-screen">
        <PortfolioHero />
        <StaggerJourney />
        <SkillsGallery />
        <AchievementsStrip />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
}
