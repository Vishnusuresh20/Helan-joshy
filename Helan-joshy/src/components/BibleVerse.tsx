import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export const BibleVerse: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-[#FAF7F2] flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-xl bg-[#FDFBF7] border border-[#C5A059]/30 rounded-sm p-8 sm:p-12 text-center shadow-sm relative overflow-hidden"
      >
        {/* Delicate Corner Ornaments */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#C5A059]/40" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#C5A059]/40" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#C5A059]/40" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#C5A059]/40" />

        {/* Bible Verse Text */}
        <blockquote className="font-serif text-xl sm:text-2xl italic text-[#3A2E2B] leading-relaxed mb-4">
          {weddingData.verse.text}
        </blockquote>

        {/* Reference */}
        <cite className="not-italic text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#C5A059] uppercase block">
          — {weddingData.verse.reference}
        </cite>
      </motion.div>
    </section>
  );
};
