import { Navbar } from "@/components/navbar";
import { GlowyWavesHero } from "@/components/ui/glowy-waves-hero-shadcnui";
import { RadialOrbitalTimeline } from "@/components/radial-orbital-timeline";
import { ThesisSection } from "@/components/thesis/thesis-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-background">
      {/* 1. Navbar with the expanding tubelight attached to its bottom edge */}
      <Navbar />

      {/* 2. Main Hero Section with interactive mouse-reactive canvas waves (Full Screen 100vh) */}
      <GlowyWavesHero />

      {/* 3. The Workforce: Scroll-Driven Radial Orbital Ferris Wheel */}
      <RadialOrbitalTimeline />

      {/* 4. Our Thesis: Clinical Architecture Console */}
      <ThesisSection />

      {/* 5. Footer with TextHoverEffect and CTA Console */}
      <Footer />
    </main>
  );
}
