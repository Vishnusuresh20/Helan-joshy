import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const FloatingNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Blessings", href: "#family" },
    { name: "Ceremony", href: "#ceremony" },
    { name: "Reception", href: "#reception" },
    { name: "Timeline", href: "#timeline" },
    { name: "Gallery", href: "#gallery" },
    { name: "Our Story", href: "#story" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Pill Nav Bar */}
      <header
        className={`fixed top-4 inset-x-0 z-40 flex justify-center px-4 transition-all duration-500 ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-90 translate-y-0"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-2.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md border border-[#C5A059]/40 shadow-lg w-full max-w-4xl">
          {/* Logo Monogram */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 font-serif text-lg font-bold text-[#3A2E2B] tracking-wider"
          >
            <span>{weddingData.couple.initials}</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs tracking-widest font-medium text-[#5C534E] hover:text-[#C5A059] uppercase transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#3A2E2B] hover:text-[#C5A059] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#FDFBF7] border border-[#C5A059]/40 rounded-xl shadow-2xl p-6 md:hidden text-center backdrop-blur-lg"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="font-serif text-lg text-[#3A2E2B] hover:text-[#C5A059] transition-colors border-b border-[#C5A059]/10 pb-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
