import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const WeddingCeremony: React.FC = () => {
  return (
    <section id="ceremony" className="py-20 px-4 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="paper-card rounded-sm overflow-hidden border border-[#C5A059]/40 grid grid-cols-1 md:grid-cols-12 shadow-xl"
        >
          {/* Illustration Column */}
          <div className="md:col-span-6 bg-[#FDFBF7] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#C5A059]/20">
            <div className="w-full max-w-sm aspect-square relative flex items-center justify-center p-4">
              <img
                src="/images/church_art.png"
                alt="St. Thomas Mar Thoma Church"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-between text-center md:text-left bg-[#FDFBF7]">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#C5A059] font-medium uppercase mb-2">
                Sacred Nuptial Covenant
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2E2B] font-semibold tracking-wide mb-6 uppercase">
                THE WEDDING CEREMONY
              </h2>

              <div className="space-y-4 mb-8 text-[#3A2E2B]">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Calendar className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-serif text-lg font-medium">
                    {weddingData.wedding.date}
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Clock className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-sans text-sm font-semibold tracking-wider uppercase text-[#C5A059]">
                    {weddingData.wedding.time}
                  </span>
                </div>

                <div className="flex items-start justify-center md:justify-start gap-3 pt-2">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#3A2E2B]">
                      {weddingData.wedding.venue}
                    </h3>
                    <p className="text-sm text-[#5C534E]">
                      {weddingData.wedding.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Link Button */}
            <a
              href={weddingData.wedding.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[#3A2E2B] font-medium text-xs tracking-widest uppercase hover:bg-[#C5A059] hover:text-white transition-all duration-300 shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>View Church Location</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
