import React from "react";
import { weddingData } from "../data/weddingData";

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 bg-[#FAF7F2] border-t border-[#C5A059]/30 text-center">
      <div className="max-w-xl mx-auto space-y-4">
        <p className="text-xs tracking-[0.3em] text-[#C5A059] font-medium uppercase">
          With Love
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#3A2E2B] font-semibold tracking-wide uppercase">
          {weddingData.couple.groom} &amp; {weddingData.couple.bride}
        </h2>

        <p className="font-serif text-sm tracking-widest text-[#3A2E2B] font-medium">
          {weddingData.wedding.date.toUpperCase()}
        </p>

        <p className="font-script text-xl sm:text-2xl text-[#C5A059] pt-2">
          “Two hearts, one journey, blessed by God.”
        </p>

        <div className="w-12 h-[1px] bg-[#C5A059]/40 mx-auto mt-6" />
        
        <p className="text-[10px] text-[#5C534E]/70 uppercase tracking-widest pt-4">
          {weddingData.wedding.venue} &amp; {weddingData.reception.venue} • {weddingData.wedding.state}
        </p>
      </div>
    </footer>
  );
};
