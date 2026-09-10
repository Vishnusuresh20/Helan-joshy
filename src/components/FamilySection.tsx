import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export const FamilySection: React.FC = () => {
  return (
    <section id="family" className="py-20 px-4 bg-[#F5EFEB]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-[#C5A059] font-medium uppercase mb-2">
            Family Blessings
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2E2B] font-semibold tracking-wide">
            WITH THE BLESSINGS OF OUR FAMILIES
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </motion.div>

        {/* Two Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Groom Parents Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="paper-card p-8 rounded-sm text-center border border-[#C5A059]/30 relative"
          >
            <p className="text-xs tracking-[0.2em] text-[#C5A059] font-medium uppercase mb-4">
              Groom's Parents
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#3A2E2B] font-medium leading-snug">
              {weddingData.family.groomFather}
            </h3>
            <p className="font-script text-2xl text-[#C5A059] my-1">&amp;</p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#3A2E2B] font-medium leading-snug">
              {weddingData.family.groomMother}
            </h3>
          </motion.div>

          {/* Bride Parents Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="paper-card p-8 rounded-sm text-center border border-[#C5A059]/30 relative"
          >
            <p className="text-xs tracking-[0.2em] text-[#C5A059] font-medium uppercase mb-4">
              Bride's Parents
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#3A2E2B] font-medium leading-snug">
              {weddingData.family.brideFather}
            </h3>
            <p className="font-script text-2xl text-[#C5A059] my-1">&amp;</p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#3A2E2B] font-medium leading-snug">
              {weddingData.family.brideMother}
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
