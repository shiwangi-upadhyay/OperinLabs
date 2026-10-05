"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Our thesis", href: "#thesis" },
  { label: "About us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-5 flex items-center justify-between gap-6 pointer-events-auto">
        {/* OperinLabs Logo */}
        <a href="#" className="flex items-center select-none">
          <img
            src="/assets/logo-light.png"
            alt="OperinLabs"
            className="h-[26px] w-auto block"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = "none"
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = "block"
              }
            }}
          />
          <span
            style={{ display: "none" }}
            className="text-xl font-bold tracking-tight text-[#EEF0F6]"
          >
            Operin<span className="text-[#5B86FF]">Labs</span>
          </span>
        </a>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Book a Demo Pill Button */}
          <a
            href="#book-demo"
            className="text-[#EEF0F6] px-4 py-2.5 rounded-full text-sm font-medium border border-[#EEF0F6]/16 bg-[#070A14]/35 hover:border-[#EEF0F6]/45 transition-colors backdrop-blur-md shadow-sm"
          >
            Book a demo
          </a>

          {/* Circular Hamburger Menu Button (toggles top navbar) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="w-11 h-11 rounded-full border border-[#EEF0F6]/16 bg-[#070A14]/35 hover:border-[#EEF0F6]/45 flex flex-col items-center justify-center gap-[5px] transition-colors cursor-pointer backdrop-blur-md shadow-sm"
          >
            {menuOpen ? (
              <span className="text-[#EEF0F6] text-xl leading-none">×</span>
            ) : (
              <>
                <span className="w-4 h-[1.5px] bg-[#EEF0F6] block rounded-full" />
                <span className="w-4 h-[1.5px] bg-[#EEF0F6] block rounded-full" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Navbar Row (Revealed when hamburger is clicked) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 pb-4 pointer-events-auto"
          >
            <nav className="flex items-center justify-between sm:justify-start gap-5 sm:gap-9 px-6 py-3.5 rounded-2xl bg-[#070A14]/90 border border-[#EEF0F6]/14 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm sm:text-[15px] font-medium text-[#EEF0F6]/85 hover:text-white transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
