import React, { useState, useEffect } from "react";
import { EnvelopeOpening } from "./components/EnvelopeOpening";
import { InvitationCardReveal } from "./components/InvitationCardReveal";
import { HeroSection } from "./components/HeroSection";
import { BibleVerse } from "./components/BibleVerse";
import { InvitationMessage } from "./components/InvitationMessage";
import { FamilySection } from "./components/FamilySection";
import { WeddingCeremony } from "./components/WeddingCeremony";
import { ReceptionSection } from "./components/ReceptionSection";
import { WeddingTimeline } from "./components/WeddingTimeline";
import { Countdown } from "./components/Countdown";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";
import { ChevronDown } from "lucide-react";

export const App: React.FC = () => {
  const [isUnboxed, setIsUnboxed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#3A2E2B] font-sans antialiased overflow-x-hidden">
      {/* 1. DIGITAL ENVELOPE UNBOXING EXPERIENCE */}
      {!isUnboxed && (
        <EnvelopeOpening onOpenComplete={() => setIsUnboxed(true)} />
      )}

      {/* 2. MAIN WEDDING WEBSITE CONTENT */}
      {isUnboxed && (
        <div className="animate-fadeIn duration-1000">
          <main className="space-y-0">
            <InvitationCardReveal />
            <HeroSection />
            <BibleVerse />
            <InvitationMessage />
            <FamilySection />
            <WeddingCeremony />
            <ReceptionSection />
            <WeddingTimeline />
            <Countdown />
            <Gallery />
          </main>

          <Footer />

          {/* FLOATING BOTTOM SCROLL GUIDE CUE (Disappears once user scrolls) */}
          {!hasScrolled && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500">
              <button
                onClick={handleScrollDown}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3A2E2B] text-[#FAF7F2] border border-[#C5A059] font-medium text-xs tracking-wider uppercase shadow-2xl hover:bg-[#C5A059] transition-all duration-300 animate-bounce cursor-pointer"
              >
                <span>Scroll Down</span>
                <ChevronDown className="w-4 h-4 text-[#C5A059] group-hover:text-white" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
