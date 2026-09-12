import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, Heart } from "lucide-react";
import { weddingData } from "../data/weddingData";

interface StoryMoment {
  id: number;
  image: string;
  tag: string;
  title: string;
  position: string;
  offsetClass: string;
  rotationClass: string;
}

const STORY_MOMENTS: StoryMoment[] = [
  {
    id: 1,
    image: "/images/og-image.jpg",
    tag: "Chapter 01",
    title: "The First Glance",
    position: "object-[center_60%]",
    offsetClass: "sm:translate-y-0",
    rotationClass: "-rotate-1 hover:rotate-0",
  },
  {
    id: 2,
    image: "/images/couple.png",
    tag: "Chapter 02",
    title: "Walking in Grace",
    position: "object-[center_35%]",
    offsetClass: "sm:translate-y-8",
    rotationClass: "rotate-2 hover:rotate-0",
  },
  {
    id: 3,
    image: "/images/preview.png",
    tag: "Chapter 03",
    title: "Forever & Always",
    position: "object-center",
    offsetClass: "sm:-translate-y-4",
    rotationClass: "-rotate-2 hover:rotate-0",
  },
];

export const OurStory: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<StoryMoment | null>(null);

  return (
    <section id="story" className="py-20 px-4 bg-[#F5EFEB] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs uppercase tracking-widest font-semibold mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>Visual Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2E2B] font-semibold tracking-wide uppercase">
            OUR STORY
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#5C534E] mt-2">
            Moments captured along our path to forever
          </p>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </motion.div>

        {/* Horizontal Staggered Image Row (Clean, without arrow buttons) */}
        <div
          className="flex items-center sm:justify-center gap-5 sm:gap-8 overflow-x-auto scroll-smooth pb-12 pt-6 px-4 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {STORY_MOMENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              onClick={() => setSelectedImage(item)}
              className={`shrink-0 w-64 sm:w-72 cursor-pointer transition-all duration-500 hover:-translate-y-2 group ${item.offsetClass} ${item.rotationClass}`}
            >
              {/* Luxury Frame Container */}
              <div className="paper-card rounded-2xl p-3 sm:p-4 border border-[#C5A059]/40 shadow-lg group-hover:shadow-2xl bg-[#FDFBF7] relative overflow-hidden transition-all duration-500">
                {/* Decorative corner gold accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C5A059]/60" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C5A059]/60" />

                {/* Photo Space with Aspect Ratio */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 border border-[#C5A059]/20">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover ${item.position} transition-transform duration-700 group-hover:scale-108`}
                  />

                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#3A2E2B] shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-4 h-4 text-[#C5A059]" />
                    </div>
                  </div>
                </div>

                {/* Minimal Label Strip */}
                <div className="pt-3 pb-1 text-center">
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.25em] text-[#C5A059] block">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#3A2E2B] mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 p-4 sm:p-8 flex items-center justify-center backdrop-blur-md cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-[#FDFBF7] p-4 sm:p-6 rounded-2xl border border-[#C5A059]/40 shadow-2xl text-center"
            >
              <div className="relative aspect-[3/4] max-h-[70vh] rounded-xl overflow-hidden border border-[#C5A059]/30 mb-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className={`w-full h-full object-cover ${selectedImage.position}`}
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
                {selectedImage.tag} • {weddingData.couple.groomShort} &amp; {weddingData.couple.brideShort}
              </p>
              <h4 className="font-serif text-2xl text-[#3A2E2B] font-semibold mt-1">
                {selectedImage.title}
              </h4>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
