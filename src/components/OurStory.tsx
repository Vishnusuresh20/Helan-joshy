import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-20 px-4 bg-[#F5EFEB]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-[#C5A059] font-medium uppercase mb-2">
            Grace &amp; Devotion
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2E2B] font-semibold tracking-wide">
            OUR STORY
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </motion.div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {weddingData.story.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="paper-card p-8 rounded-sm text-center border border-[#C5A059]/30 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs tracking-[0.25em] text-[#C5A059] font-semibold uppercase mb-2">
                  {item.title}
                </p>
                <h3 className="font-serif text-xl text-[#3A2E2B] font-medium italic mb-4">
                  {item.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C534E] leading-relaxed">
                  {item.content}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#C5A059]/20 flex justify-center text-[#C5A059] text-xs">
                ✦
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
