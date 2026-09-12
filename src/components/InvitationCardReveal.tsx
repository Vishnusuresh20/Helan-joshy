import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export const InvitationCardReveal: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-20 px-4 flex justify-center bg-[#FAF7F2]">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-[#FDFBF7] border border-[#C5A059]/40 p-8 sm:p-14 rounded-2xl sm:rounded-3xl shadow-xl text-center paper-card overflow-hidden"
      >
        {/* Fine Inner Double Gold Border */}
        <div className="absolute inset-3 border border-[#C5A059]/30 rounded-xl pointer-events-none" />
        <div className="absolute inset-5 border border-[#C5A059]/15 rounded-lg pointer-events-none" />

        {/* Top Subtitle */}
        <div className="flex flex-col items-center justify-center mb-6">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-[#C5A059] font-medium uppercase">
            With the Blessings of Our Families
          </p>
        </div>

        {/* Couple Names */}
        <div className="my-8">
          <h1 className="font-calligraphy text-4xl sm:text-6xl text-[#3A2E2B] font-normal tracking-wide leading-relaxed mb-1">
            {weddingData.couple.groom}
          </h1>
          <p className="font-calligraphy text-3xl sm:text-5xl text-[#C5A059] my-1">
            &amp;
          </p>
          <h1 className="font-calligraphy text-4xl sm:text-6xl text-[#3A2E2B] font-normal tracking-wide leading-relaxed mt-1">
            {weddingData.couple.bride}
          </h1>
        </div>

        {/* Invitation Text */}
        <div className="max-w-md mx-auto my-8">
          <p className="font-serif text-sm sm:text-lg italic text-[#5C534E] leading-relaxed">
            Request the honour of your presence as they begin their new journey together in Christ.
          </p>
        </div>

        {/* Divider with Bespoke Wax Seal */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="w-12 sm:w-16 h-[1px] bg-[#C5A059]/40" />
          <div className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md shrink-0">
            <img
              src="/images/wax_seal.png?v=2"
              alt="Augustine & Jennifer Wax Seal"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-12 sm:w-16 h-[1px] bg-[#C5A059]/40" />
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          <p className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#3A2E2B]">
            {weddingData.wedding.date.toUpperCase()}
          </p>
          <p className="text-xs sm:text-sm tracking-wider text-[#C5A059] font-semibold uppercase">
            {weddingData.wedding.time}
          </p>
          <p className="font-serif text-base sm:text-xl text-[#3A2E2B] font-medium pt-2">
            {weddingData.wedding.venue}
          </p>
          <p className="text-xs sm:text-sm text-[#5C534E] tracking-wide">
            {weddingData.wedding.location}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
