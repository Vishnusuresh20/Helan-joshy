import React, { useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { weddingData } from "../data/weddingData";
import { Sparkles, ChevronDown } from "lucide-react";

interface EnvelopeOpeningProps {
  onOpenComplete: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  onOpenComplete,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpenFinished, setIsOpenFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textPromptRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (isOpening || isOpenFinished) return;
    setIsOpening(true);

    // Play background audio automatically on tap
    try {
      const audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0.7;
      audio.play().catch((err) => console.warn("Audio play error:", err));
    } catch (err) {
      console.warn("Audio play error:", err);
    }

    // Trigger golden sparkles confetti burst
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#D4AF37", "#C5A059", "#FAF7F2", "#EBDAC5"],
      disableForReducedMotion: true,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpenFinished(true);
        onOpenComplete();
      },
    });

    // 1. Fade out initial text prompt
    tl.to(textPromptRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.out",
    });

    // 2. Reveal and scale in envelope
    tl.to(
      envelopeRef.current,
      {
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.7,
        ease: "back.out(1.2)",
      },
      "-=0.1"
    );

    // 3. Wax seal dissolves in place
    tl.to(
      sealRef.current,
      {
        opacity: 0,
        scale: 1.1,
        duration: 0.25,
        ease: "none",
      },
      "+=0.1"
    );

    // 4. Envelope flap opens 3D back completely
    tl.to(
      flapRef.current,
      {
        rotateX: -180,
        duration: 0.9,
        ease: "power3.inOut",
        transformOrigin: "top center",
      },
      "-=0.1"
    );

    // Send opened flap behind the card layer
    tl.set(flapRef.current, { zIndex: 0 });

    // 5. Card slides upward out of envelope ON TOP of all flaps
    tl.to(
      cardRef.current,
      {
        y: "-80%",
        zIndex: 50,
        duration: 1.0,
        ease: "power3.out",
      },
      "+=0.05"
    );

    // 6. Card expands toward screen
    tl.to(cardRef.current, {
      scale: 1.12,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // 7. Overall unboxing overlay fades out to reveal main site
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  if (isOpenFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center paper-texture overflow-hidden select-none px-4"
    >
      {/* Background Bride Image Layer (Full visual showcase initially) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bride.png"
          alt={weddingData.couple.bride}
          className="w-full h-full object-cover object-[center_55%] md:object-[center_48%] opacity-95 filter brightness-100 transition-all duration-500"
        />
        {/* Soft Transparent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/10 via-transparent to-[#FAF7F2]/35" />
      </div>

      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial from-amber-50/20 via-transparent to-stone-200/20 pointer-events-none z-0" />

      {/* Decorative Botanical Corners */}
      <div className="absolute top-6 left-6 w-24 h-24 opacity-30 pointer-events-none border-t border-l border-[#C5A059] p-2">
        <div className="w-full h-full border-t border-l border-[#C5A059]/50" />
      </div>
      <div className="absolute top-6 right-6 w-24 h-24 opacity-30 pointer-events-none border-t border-r border-[#C5A059] p-2">
        <div className="w-full h-full border-t border-r border-[#C5A059]/50" />
      </div>
      <div className="absolute bottom-6 left-6 w-24 h-24 opacity-30 pointer-events-none border-b border-l border-[#C5A059] p-2">
        <div className="w-full h-full border-b border-l border-[#C5A059]/50" />
      </div>
      <div className="absolute bottom-6 right-6 w-24 h-24 opacity-30 pointer-events-none border-b border-r border-[#C5A059] p-2">
        <div className="w-full h-full border-b border-r border-[#C5A059]/50" />
      </div>

      {/* INITIAL SHOWCASE: COUPLE NAME, SUBTITLE & TAP BUTTON (Visible before tap) */}
      <div
        ref={textPromptRef}
        className="relative z-40 text-center w-[92%] max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col items-center justify-center px-6 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12 rounded-2xl sm:rounded-3xl bg-[#FDFBF7]/75 backdrop-blur-md border border-[#C5A059]/40 shadow-2xl my-auto"
        style={{
          colorScheme: "only light",
          forcedColorAdjust: "none",
        }}
      >
        <h1
          className="font-calligraphy text-[clamp(2rem,4.2vw,3.35rem)] font-normal text-[#3A2E2B] tracking-normal mb-2 drop-shadow-sm leading-tight text-center max-w-full px-2"
          style={{
            colorScheme: "only light",
            forcedColorAdjust: "none",
          }}
        >
          <span className="inline-block">{weddingData.couple.groomShort}</span>{" "}
          <span className="inline-block text-[#C5A059] px-1 font-normal">&amp;</span>{" "}
          <span className="inline-block">{weddingData.couple.brideShort}</span>
        </h1>

        <p
          className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#C5A059] tracking-wider font-light mb-6 sm:mb-8"
          style={{
            colorScheme: "only light",
            forcedColorAdjust: "none",
          }}
        >
          Inviting You
        </p>

        {/* TAP TO OPEN INTERACTIVE BUTTON */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] text-[#3A2E2B] font-semibold text-xs sm:text-sm tracking-widest uppercase shadow-lg hover:bg-[#C5A059] hover:text-white transition-all duration-300 animate-pulse-glow"
          style={{
            colorScheme: "only light",
            forcedColorAdjust: "none",
          }}
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>Tap To Open</span>
          <ChevronDown className="w-4 h-4 text-[#C5A059] animate-bounce" />
        </button>
      </div>

      {/* ENVELOPE WRAPPER (Hidden initially with opacity: 0; appears smoothly on tap!) */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-none">
        <div
          ref={envelopeRef}
          onClick={handleOpen}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[1.4/1] bg-[#FAF5EE]/90 backdrop-blur-md rounded-sm border border-[#C5A059]/60 shadow-2xl cursor-pointer perspective-1000 opacity-0 scale-90 transition-shadow duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Envelope Pocket Background */}
          <div className="absolute inset-0 bg-[#F3EBE0]/90 backdrop-blur-md rounded-sm overflow-hidden border border-[#E5DACB]">
            {/* Fine gold border detail inside */}
            <div className="absolute inset-2 border border-[#C5A059]/20 rounded-xs pointer-events-none" />
          </div>

          {/* INVITATION CARD (Inside pocket, slides up) */}
          <div
            ref={cardRef}
            className="absolute inset-x-2.5 sm:inset-x-3 bottom-1.5 top-3 sm:top-4 bg-[#FDFBF7] rounded-2xl sm:rounded-3xl border border-[#C5A059]/50 shadow-md p-2.5 sm:p-5 text-center flex flex-col justify-between z-10 transition-shadow duration-300 overflow-hidden"
          >
            {/* Card Content Header */}
            <div>
              <p className="text-[8px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A059] font-medium uppercase mb-0.5 sm:mb-1">
                With the blessings of our families
              </p>
              <div className="w-6 sm:w-8 h-[1px] bg-[#C5A059]/40 mx-auto my-1" />
              <h2 className="font-calligraphy text-lg sm:text-2xl text-[#3A2E2B] font-normal tracking-wide leading-tight">
                {weddingData.couple.groom}
              </h2>
              <p className="font-calligraphy text-base sm:text-xl text-[#C5A059] my-0">&amp;</p>
              <h2 className="font-calligraphy text-lg sm:text-2xl text-[#3A2E2B] font-normal tracking-wide leading-tight">
                {weddingData.couple.bride}
              </h2>
            </div>

            {/* Card Content Middle */}
            <div className="my-1">
              <p className="text-[9px] sm:text-xs font-serif italic text-[#5C534E] leading-tight">
                Request the honour of your presence as they begin their new journey together in Christ.
              </p>
            </div>

            {/* Card Content Footer */}
            <div className="border-t border-[#C5A059]/30 pt-1 sm:pt-2">
              <p className="font-serif text-[10px] sm:text-xs font-bold tracking-wider text-[#3A2E2B] uppercase mb-0.5">
                {weddingData.wedding.date}
              </p>
              <p className="text-[9px] sm:text-xs font-medium text-[#3A2E2B] truncate leading-tight">
                {weddingData.wedding.venue}
              </p>
              <p className="text-[8px] sm:text-[10px] text-[#5C534E] tracking-wide truncate">
                {weddingData.wedding.city}
              </p>
            </div>
          </div>

          {/* Envelope Pocket Front V-Flaps */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-sm">
            {/* Left Triangle Flap */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#F6EFE5]/90 backdrop-blur-sm border-r border-[#E2D5C3]"
              style={{
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
            />
            {/* Right Triangle Flap */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#F6EFE5]/90 backdrop-blur-sm border-l border-[#E2D5C3]"
              style={{
                clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
              }}
            />
            {/* Bottom Triangle Flap */}
            <div
              className="absolute left-0 right-0 bottom-0 h-3/5 bg-[#FAF3E8]/90 backdrop-blur-sm border-t border-[#DECFC0]"
              style={{
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              }}
            />
          </div>

          {/* Envelope Top Flap (Animated opening backwards) */}
          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 h-3/5 bg-[#F4ECDF]/90 backdrop-blur-sm border-b border-[#D8C9B5] z-30 shadow-sm"
            style={{
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
          />

          {/* WAX SEAL STAMP */}
          <div
            ref={sealRef}
            className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-40 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg"
          >
            <img
              src="/images/wax_seal.png"
              alt="A & J Wax Seal"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
