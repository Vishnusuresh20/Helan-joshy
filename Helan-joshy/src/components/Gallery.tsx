import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 px-4 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-[#C5A059] font-medium uppercase mb-2">
            Moments &amp; Memories
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2E2B] font-semibold tracking-wide">
            WEDDING GALLERY
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </motion.div>

        {/* Luxury Album Grid Layout with 2 Selected Photos */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Couple Feature Photo (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onClick={() => setSelectedImage("/images/couple.png")}
            className="md:col-span-7 relative aspect-[4/3] rounded-sm overflow-hidden border border-[#C5A059]/30 shadow-md group cursor-pointer"
          >
            <img
              src="/images/couple.png"
              alt="Jehan Mary Jacob & Sherin Stephen"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#3A2E2B]">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="font-serif text-xl font-medium">
                Jehan Mary Jacob &amp; Sherin Stephen
              </h3>
              <p className="text-xs text-white/80">Pre-wedding Couple Portrait</p>
            </div>
          </motion.div>

          {/* Bride Solo Portrait (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onClick={() => setSelectedImage("/images/bride.png")}
            className="md:col-span-5 relative aspect-[4/3] sm:aspect-[3/4] rounded-sm overflow-hidden border border-[#C5A059]/30 shadow-md group cursor-pointer"
          >
            <img
              src="/images/bride.png"
              alt="Jehan Mary Jacob"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#3A2E2B]">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="font-serif text-lg font-medium">The Bride</h3>
              <p className="text-xs text-white/80">Jehan Mary Jacob</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 p-4 sm:p-8 flex items-center justify-center backdrop-blur-md cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged photo"
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
