import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(weddingData.wedding.rawDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 bg-[#F5EFEB] text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.3em] text-[#C5A059] font-medium uppercase mb-2">
            The Celebration Begins In
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2E2B] font-semibold tracking-wide">
            COUNTING DOWN TO OUR SPECIAL DAY
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </motion.div>

        {timeLeft.isToday ? (
          /* COMPLETION MESSAGE DISPLAYED WHEN COUNTDOWN ENDS */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="paper-card p-10 sm:p-14 rounded-2xl border border-[#C5A059]/40 shadow-xl max-w-xl mx-auto text-center relative overflow-hidden"
          >
            <div className="absolute inset-3 border border-[#C5A059]/30 rounded-xl pointer-events-none" />
            <div className="absolute inset-5 border border-[#C5A059]/15 rounded-lg pointer-events-none" />

            <p className="text-xs sm:text-sm tracking-[0.25em] text-[#C5A059] font-medium uppercase mb-3">
              Happily Ever After! 🤍
            </p>

            <h3 className="font-calligraphy text-4xl sm:text-6xl text-[#3A2E2B] font-normal leading-tight mb-3">
              {weddingData.couple.groomShort} &amp; {weddingData.couple.brideShort} are Married
            </h3>

            <div className="w-12 h-[1px] bg-[#C5A059]/50 mx-auto my-4" />

            <p className="font-serif italic text-base sm:text-xl text-[#5C534E] tracking-wider font-light">
              And so, their beautiful forever begins…
            </p>
          </motion.div>
        ) : (
          /* LIVE COUNTDOWN TIMER */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* Days */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="paper-card p-6 rounded-sm border border-[#C5A059]/30 text-center"
            >
              <span className="font-serif text-4xl sm:text-5xl font-medium text-[#3A2E2B] block">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase mt-2 block">
                Days
              </span>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="paper-card p-6 rounded-sm border border-[#C5A059]/30 text-center"
            >
              <span className="font-serif text-4xl sm:text-5xl font-medium text-[#3A2E2B] block">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase mt-2 block">
                Hours
              </span>
            </motion.div>

            {/* Minutes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="paper-card p-6 rounded-sm border border-[#C5A059]/30 text-center"
            >
              <span className="font-serif text-4xl sm:text-5xl font-medium text-[#3A2E2B] block">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase mt-2 block">
                Minutes
              </span>
            </motion.div>

            {/* Seconds */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="paper-card p-6 rounded-sm border border-[#C5A059]/30 text-center"
            >
              <span className="font-serif text-4xl sm:text-5xl font-medium text-[#3A2E2B] block">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase mt-2 block">
                Seconds
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
