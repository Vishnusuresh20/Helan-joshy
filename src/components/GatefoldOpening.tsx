import React, { useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { weddingData } from "../data/weddingData";
import { startGlobalMusic } from "../utils/audioManager";

interface GatefoldOpeningProps {
  onOpenComplete: () => void;
}

export const GatefoldOpening: React.FC<GatefoldOpeningProps> = ({
  onOpenComplete,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpenFinished, setIsOpenFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const folioRef = useRef<HTMLDivElement>(null);
  const leftFlapRef = useRef<HTMLDivElement>(null);
  const rightFlapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (isOpening || isOpenFinished) return;
    setIsOpening(true);

    // Play synchronized background audio on interaction
    startGlobalMusic();

    // Trigger golden sparkles confetti burst from center seal
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#D4AF37", "#C5A059", "#FAF7F2", "#EBDAC5", "#B8860B"],
      disableForReducedMotion: true,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpenFinished(true);
        onOpenComplete();
      },
    });

    // 1. Fade prompt button & text cue smoothly
    tl.to(promptRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.6,
      ease: "power2.out",
    });

    // 2. Wax seal fades cleanly in-place without moving in any direction
    tl.to(
      sealRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // 3. 3D Gatefold Panels unfold outward slowly, gracefully and majestically
    tl.to(
      leftFlapRef.current,
      {
        rotateY: -165,
        duration: 2.4,
        ease: "power2.inOut",
        transformOrigin: "left center",
      },
      "-=0.3"
    );

    tl.to(
      rightFlapRef.current,
      {
        rotateY: 165,
        duration: 2.4,
        ease: "power2.inOut",
        transformOrigin: "right center",
      },
      "<" // Start simultaneously with left flap
    );

    // 4. Revealed Inner Card emerges & gently scales up toward camera
    tl.to(
      innerCardRef.current,
      {
        scale: 1.08,
        duration: 1.6,
        ease: "power2.out",
      },
      "-=1.0"
    );

    // 5. Deliberate brief pause to let guests view the unveiled stationery
    tl.to({}, { duration: 0.8 });

    // 6. Smooth cinematic fadeout of entrance overlay into main website
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
    });
  };

  if (isOpenFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center paper-texture overflow-hidden select-none px-4"
    >
      {/* Background Bride Photo Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bride.png"
          alt={weddingData.couple.bride}
          className="w-full h-full object-cover object-[center_55%] md:object-[center_48%] opacity-90 filter brightness-100"
        />
        {/* Soft Warm Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/25 via-[#FAF7F2]/40 to-[#FAF7F2]/65" />
      </div>

      {/* Ornate Corner Botanical Accents */}
      <div className="absolute top-6 left-6 w-20 h-20 opacity-30 pointer-events-none border-t border-l border-[#C5A059] p-2">
        <div className="w-full h-full border-t border-l border-[#C5A059]/50" />
      </div>
      <div className="absolute top-6 right-6 w-20 h-20 opacity-30 pointer-events-none border-t border-r border-[#C5A059] p-2">
        <div className="w-full h-full border-t border-r border-[#C5A059]/50" />
      </div>
      <div className="absolute bottom-6 left-6 w-20 h-20 opacity-30 pointer-events-none border-b border-l border-[#C5A059] p-2">
        <div className="w-full h-full border-b border-l border-[#C5A059]/50" />
      </div>
      <div className="absolute bottom-6 right-6 w-20 h-20 opacity-30 pointer-events-none border-b border-r border-[#C5A059] p-2">
        <div className="w-full h-full border-b border-r border-[#C5A059]/50" />
      </div>

      {/* LUXURY TRIPTYCH GATEFOLD CARD CONTAINER */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Main 3-Panel Stationery Folio */}
        <div
          ref={folioRef}
          onClick={handleOpen}
          className="relative w-full aspect-[1.25/1] sm:aspect-[1.38/1] rounded-2xl shadow-2xl cursor-pointer perspective-1200 transition-shadow duration-500 group"
          style={{ perspective: "1200px" }}
        >
          {/* 1. INNER STATIONERY CARD (Revealed when flaps open) */}
          <div
            ref={innerCardRef}
            className="absolute inset-0 bg-[#FDFBF7] rounded-2xl border border-[#C5A059]/60 shadow-xl p-5 sm:p-7 text-center flex flex-col justify-between overflow-hidden z-10"
          >
            {/* Fine Inner Double Gold Borders */}
            <div className="absolute inset-2 border border-[#C5A059]/35 rounded-xl pointer-events-none" />
            <div className="absolute inset-3.5 border border-[#C5A059]/15 rounded-lg pointer-events-none" />

            {/* Top Subtitle */}
            <div className="pt-1">
              <p className="text-[9px] sm:text-xs tracking-[0.25em] text-[#C5A059] font-medium uppercase">
                With the blessings of our families
              </p>
              <div className="w-8 h-[1px] bg-[#C5A059]/40 mx-auto my-1.5" />
            </div>

            {/* Couple Calligraphy Typography */}
            <div className="my-auto py-1">
              <h2 className="font-calligraphy text-2xl sm:text-4xl text-[#3A2E2B] font-normal leading-tight">
                {weddingData.couple.groom}
              </h2>
              <p className="font-calligraphy text-xl sm:text-2xl text-[#C5A059] my-0.5">&amp;</p>
              <h2 className="font-calligraphy text-2xl sm:text-4xl text-[#3A2E2B] font-normal leading-tight">
                {weddingData.couple.bride}
              </h2>
            </div>

            {/* Scripture & Date */}
            <div className="border-t border-[#C5A059]/30 pt-2 pb-1">
              <p className="font-serif italic text-[10px] sm:text-xs text-[#5C534E] mb-1">
                “Two are better than one... A cord of three strands is not quickly broken.”
              </p>
              <p className="font-serif text-xs sm:text-sm font-bold tracking-widest text-[#3A2E2B] uppercase">
                {weddingData.wedding.date}
              </p>
              <p className="text-[9px] sm:text-[11px] text-[#C5A059] font-medium">
                {weddingData.wedding.venue}
              </p>
            </div>
          </div>

          {/* 2. LEFT GATEFOLD PANEL (Unfolds to the Left - Only Groom Name) */}
          <div
            ref={leftFlapRef}
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#FAF5EE] rounded-l-2xl border-y border-l border-r border-[#C5A059]/50 shadow-md z-20 overflow-hidden flex flex-col items-center justify-center p-2 sm:p-3 text-center"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Left panel gold embossed inner border */}
            <div className="absolute inset-2.5 border-y border-l border-[#C5A059]/30 rounded-l-xl pointer-events-none" />
            
            {/* Left Flap: Only Groom Name */}
            <div className="w-full flex items-center justify-center h-full py-4 pr-7 sm:pr-11 pl-2 text-center select-none">
              <h3 className="font-calligraphy text-2xl sm:text-3xl md:text-4xl text-[#3A2E2B] font-normal leading-tight">
                {weddingData.couple.groom}
              </h3>
            </div>
          </div>

          {/* 3. RIGHT GATEFOLD PANEL (Unfolds to the Right - Only Bride Name) */}
          <div
            ref={rightFlapRef}
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#FAF5EE] rounded-r-2xl border-y border-r border-l border-[#C5A059]/50 shadow-md z-20 overflow-hidden flex flex-col items-center justify-center p-2 sm:p-3 text-center"
            style={{
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Right panel gold embossed inner border */}
            <div className="absolute inset-2.5 border-y border-r border-[#C5A059]/30 rounded-r-xl pointer-events-none" />

            {/* Right Flap: Only Bride Name */}
            <div className="w-full flex items-center justify-center h-full py-4 pl-7 sm:pl-11 pr-2 text-center select-none">
              <h3 className="font-calligraphy text-2xl sm:text-3xl md:text-4xl text-[#3A2E2B] font-normal leading-tight">
                {weddingData.couple.bride}
              </h3>
            </div>
          </div>

          {/* 4. CENTRAL GOLDEN & RUBY WAX SEAL MEDALLION (Clasps the two panels together) */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div
              ref={sealRef}
              onClick={handleOpen}
              className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl pointer-events-auto cursor-pointer relative"
            >
              <img
                src="/images/wax_seal.png?v=2"
                alt="Augustine & Jennifer Wax Seal"
                className="w-full h-full object-contain filter drop-shadow-2xl pointer-events-none"
              />
              <div className="absolute inset-0 rounded-full border border-[#C5A059]/40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* INTERACTIVE TAP TO UNFOLD BUTTON & CUE */}
        <div ref={promptRef} className="mt-8 text-center">
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] text-[#3A2E2B] font-semibold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:bg-[#C5A059] hover:text-white transition-all duration-300 animate-pulse-glow cursor-pointer active:scale-95"
          >
            <span>Tap Seal To Unfold</span>
          </button>
          <p className="text-[11px] font-serif italic text-[#5C534E] tracking-wider mt-2">
            Augustine &amp; Jennifer
          </p>
        </div>
      </div>
    </div>
  );
};
