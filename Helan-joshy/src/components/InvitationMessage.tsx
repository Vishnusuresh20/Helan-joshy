import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export const InvitationMessage: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-[#FAF7F2] text-center flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <div className="inline-block w-12 h-[1px] bg-[#C5A059]" />
        
        <h2 className="font-serif text-2xl sm:text-4xl text-[#3A2E2B] font-light leading-relaxed">
          {weddingData.message}
        </h2>
        
        <div className="inline-block w-12 h-[1px] bg-[#C5A059]" />
      </motion.div>
    </section>
  );
};
