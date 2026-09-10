import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "../data/weddingData";

const heroImages = [
  {
    src: "/images/og-image.jpg",
    alt: `${weddingData.couple.groom} & ${weddingData.couple.bride} - Romantic portrait`,
    position: "object-[center_60%]",
  },
  {
    src: encodeURI("/images/bride copy.png"),
    alt: `${weddingData.couple.groom} & ${weddingData.couple.bride} - Beach celebration`,
    position: "object-[center_45%]",
  },
  {
    src: "/images/couple.png",
    alt: `${weddingData.couple.groom} & ${weddingData.couple.bride} - Romantic moments`,
    position: "object-[center_35%]",
  },
];

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images for buttery smooth transitions
  useEffect(() => {
    heroImages.forEach((img) => {
      const imageObj = new Image();
      imageObj.src = img.src;
    });
  }, []);

  // Automatic slideshow progression every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAF7F2] py-12 px-4">
      {/* Container Card */}
      <div className="relative w-full max-w-5xl rounded-lg overflow-hidden border border-[#C5A059]/30 shadow-2xl bg-[#FDFBF7]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Couple Image Column (7 cols) - Clean Automatic Changing Frame */}
          <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[600px] w-full h-full overflow-hidden group">
            {/* Animated Image Transition */}
            <AnimatePresence mode="sync">
              <motion.img
                key={currentIndex}
                src={heroImages[currentIndex].src}
                alt={heroImages[currentIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className={`absolute inset-0 w-full h-full object-cover ${heroImages[currentIndex].position} transition-transform duration-1000 group-hover:scale-105`}
              />
            </AnimatePresence>

            {/* Subtle Bottom Shadow Overlay for Mobile Only (Crisp & Clear on Desktop) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/50 via-transparent to-transparent lg:hidden pointer-events-none z-10" />
          </div>

          {/* Typography Column (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center text-center lg:text-left bg-[#FDFBF7] relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="text-xs tracking-[0.3em] font-semibold text-[#C5A059] uppercase mb-4">
                Are Getting Married
              </p>
              
              <h1 className="font-calligraphy text-4xl sm:text-6xl text-[#3A2E2B] font-normal leading-relaxed mb-1 tracking-wide">
                {weddingData.couple.groom}
              </h1>
              
              <p className="font-calligraphy text-4xl sm:text-5xl text-[#C5A059] my-1 lg:ml-6">
                &amp;
              </p>
              
              <h1 className="font-calligraphy text-4xl sm:text-6xl text-[#3A2E2B] font-normal leading-relaxed mt-1 mb-6 tracking-wide">
                {weddingData.couple.bride}
              </h1>

              <div className="w-16 h-[1px] bg-[#C5A059] mx-auto lg:mx-0 my-6" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
