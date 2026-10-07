import { Navbar } from "@/components/navbar";
import { StoryHero } from "@/components/story/story-hero";
import { LanguageSection } from "@/components/story/language-section";
import { WorkforceSection } from "@/components/workforce/workforce-section";
import { ThesisSection } from "@/components/thesis/thesis-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-background">
      {/* 1. Navbar with the expanding tubelight attached to its bottom edge */}
      <Navbar />

      {/* 2. Story hero: Chapter 01 - The missed call (pinned, scroll-scrubbed) */}
      <StoryHero />

      {/* 3. Chapter 02: It speaks the patient's language */}
      <LanguageSection />

      {/* 4. Chapter 03: The Autonomous Workforce (Display with clarity, seriousness & good work) */}
      <WorkforceSection />

      {/* 5. Chapter 04: Our Thesis (Clinical Architecture Console - Same as before) */}
      <ThesisSection />

      {/* 6. Footer with TextHoverEffect and CTA Console */}
      <Footer />
    </main>
  );
}
