import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export const WeddingTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 px-4 bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-[#C5A059] font-medium uppercase mb-2">
            Schedule of Events
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2E2B] font-semibold tracking-wide">
            WEDDING DAY TIMELINE
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l border-[#C5A059]/40 ml-4 sm:ml-40 space-y-12 text-left pl-8 sm:pl-12">
          {weddingData.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-[#C5A059]" />
              </div>

              {/* Time Label (Positioned cleanly on Desktop with zero overlap) */}
              <div className="sm:absolute sm:-left-56 sm:top-1.5 text-xs sm:text-sm font-bold tracking-widest text-[#C5A059] uppercase mb-1 sm:mb-0 sm:w-36 sm:text-right whitespace-nowrap">
                {item.time}
              </div>

              {/* Event Content Card */}
              <div className="paper-card p-6 rounded-sm border border-[#C5A059]/30 relative shadow-sm">
                <h3 className="font-serif text-2xl text-[#3A2E2B] font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-[#C5A059] mb-2">
                  {item.venue}
                </p>
                <p className="text-xs sm:text-sm text-[#5C534E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
