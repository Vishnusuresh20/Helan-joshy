import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Send, MessageCircleHeart, Check } from "lucide-react";
import { weddingData } from "../data/weddingData";

interface Wish {
  id: string;
  name: string;
  message: string;
  reaction: string;
  date: string;
  isNew?: boolean;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: "w-1",
    name: "Thomas & Deepa Mathew",
    message: "May God's infinite grace and peace be the cornerstone of your marriage. Wishing Augustine and Jennifer a lifetime filled with unconditional love and joy!",
    reaction: "🙏 Holy Blessings",
    date: "10 September 2026",
  },
  {
    id: "w-2",
    name: "Dr. Kevin George & Family",
    message: "Heartiest congratulations to the most radiant couple! So thrilled to celebrate this divine union with both families.",
    reaction: "🥂 Cheers & Joy",
    date: "11 September 2026",
  },
  {
    id: "w-3",
    name: "Sneha Kurian",
    message: "Jennifer, you will make the most breathtaking bride! Augustine is truly blessed. Wishing you both endless laughter and adventures together.",
    reaction: "💍 Eternal Love",
    date: "12 September 2026",
  },
  {
    id: "w-4",
    name: "Roshan & Neethu Varghese",
    message: "Two beautiful souls joined in holy matrimony. May Christ remain at the center of your home forever.",
    reaction: "✨ Sparkles & Joy",
    date: "12 September 2026",
  },
];

const EMOJI_OPTIONS = [
  { label: "💍 Eternal Love", emoji: "💍" },
  { label: "🙏 Holy Blessings", emoji: "🙏" },
  { label: "🥂 Cheers & Joy", emoji: "🥂" },
  { label: "✨ Sparkles & Joy", emoji: "✨" },
  { label: "🤍 With All Love", emoji: "🤍" },
];

export const GuestWishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem("augustine_jennifer_wedding_wishes");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedReaction, setSelectedReaction] = useState(EMOJI_OPTIONS[0].label);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Confetti celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#D4AF37", "#C5A059", "#FAF7F2", "#E8C5C8", "#B89745"],
      disableForReducedMotion: true,
    });

    const newWish: Wish = {
      id: "wish-" + Date.now(),
      name: name.trim(),
      message: message.trim(),
      reaction: selectedReaction,
      date: "Just now",
      isNew: true,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    try {
      localStorage.setItem("augustine_jennifer_wedding_wishes", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setName("");
    setMessage("");
    setIsSubmitting(false);
    setJustSubmitted(true);

    setTimeout(() => {
      setJustSubmitted(false);
    }, 4000);
  };

  return (
    <section id="wishes" className="py-20 px-4 bg-[#F5EFEB] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs uppercase tracking-widest font-semibold mb-3">
            <MessageCircleHeart className="w-3.5 h-3.5" />
            <span>Digital Guestbook</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2E2B] font-semibold tracking-wide uppercase">
            BLESSINGS &amp; WISHES
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#5C534E] mt-2 max-w-lg mx-auto">
            Leave a loving prayer or warm congratulations for {weddingData.couple.groomShort} and {weddingData.couple.brideShort} to celebrate their marriage.
          </p>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </motion.div>

        {/* Input Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="paper-card rounded-2xl sm:rounded-3xl border border-[#C5A059]/40 shadow-xl p-6 sm:p-10 mb-14 bg-[#FDFBF7]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1.5">
                  Your Name / Family Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rachel &amp; Matthew"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 text-[#3A2E2B] text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>

              {/* Reaction Tag Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1.5">
                  Blessing Type
                </label>
                <select
                  value={selectedReaction}
                  onChange={(e) => setSelectedReaction(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 text-[#3A2E2B] text-sm focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                >
                  {EMOJI_OPTIONS.map((em) => (
                    <option key={em.label} value={em.label}>
                      {em.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1.5">
                Your Blessing or Message
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your prayers, heartfelt wishes, or favorite memory with Augustine &amp; Jennifer..."
                className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 text-[#3A2E2B] text-sm focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
              />
            </div>

            {/* Submit Button & Notification */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#3A2E2B] text-white hover:bg-[#C5A059] font-medium text-xs tracking-widest uppercase transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Blessing</span>
              </button>

              <AnimatePresence>
                {justSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your blessing has been posted! 🤍</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Wishes Display Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
              Community Prayers &amp; Greetings ({wishes.length})
            </h3>
            <span className="text-[11px] text-[#5C534E] italic font-serif">
              Sorted by latest
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishes.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`paper-card p-5 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                  item.isNew
                    ? "border-[#C5A059] bg-[#FAF5EE] ring-1 ring-[#C5A059]/40"
                    : "border-[#C5A059]/30 bg-[#FDFBF7] hover:border-[#C5A059]/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-semibold text-[#3A2E2B]">
                      {item.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-medium bg-[#C5A059]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.reaction}
                    </span>
                  </div>

                  <p className="font-serif italic text-sm text-[#5C534E] leading-relaxed mb-4">
                    “{item.message}”
                  </p>
                </div>

                <div className="border-t border-[#C5A059]/20 pt-2 flex items-center justify-between text-[10px] text-[#5C534E]/70 font-sans">
                  <span>{item.date}</span>
                  <Heart className="w-3 h-3 text-[#C5A059]/60" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
