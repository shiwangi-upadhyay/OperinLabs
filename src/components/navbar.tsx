"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Our thesis", href: "#thesis" },
  { label: "About us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  const { scrollY } = useScroll()

  // Detect scroll direction to slide entire navbar up (on scroll down) or down (on scroll up)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current
    const diff = latest - previous

    // When near the very top of the page, always keep navbar visible
    if (latest <= 30) {
      setHidden(false)
    } else if (diff > 8 && latest > 80) {
      // User is scrolling DOWN -> slide the whole navbar (logo, button, icon) up and out of view
      setHidden(true)
      if (menuOpen) setMenuOpen(false)
    } else if (diff < -8) {
      // User is scrolling UP -> slide the navbar back down into view
      setHidden(false)
    }

    lastScrollY.current = latest
  })

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  return (
    <motion.header
      initial={false}
      animate={{
        y: hidden ? "-100%" : "0%",
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none bg-transparent"
    >
      {/* Main Top Row */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-4 sm:py-5 flex items-center justify-between gap-4 sm:gap-6 pointer-events-auto">
        {/* Left: OperinLabs Logo */}
        <a href="#" className="flex items-center select-none shrink-0">
          <img
            src="/assets/logo-light.png"
            alt="OperinLabs"
            className="h-[24px] sm:h-[26px] w-auto block"
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

        {/* Right Section: Nav Items (slides down from top next to button) + Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-7 shrink-0">
          {/* Desktop/Tablet Nav Links (positioned to the right, next to Book a demo button) */}
          <motion.nav
            initial={false}
            animate={{
              opacity: menuOpen ? 1 : 0,
              y: menuOpen ? 0 : -28,
            }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "hidden sm:flex items-center gap-4 md:gap-5 lg:gap-7",
              !menuOpen && "pointer-events-none invisible"
            )}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs md:text-sm font-medium text-zinc-300 hover:text-white transition-colors py-1 relative group tracking-wide whitespace-nowrap"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#3ca2fa] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </motion.nav>

          {/* Action Buttons: Book a demo + Toggle Button (remain in exact same position) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Book a Demo Pill Button */}
            <a
              href="#book-demo"
              className="text-[#EEF0F6] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border border-[#EEF0F6]/16 bg-[#070A14]/35 hover:border-[#EEF0F6]/45 transition-colors backdrop-blur-md shadow-sm whitespace-nowrap"
            >
              Book a demo
            </a>

            {/* Circular Hamburger / Close Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#EEF0F6]/16 bg-[#070A14]/35 hover:border-[#EEF0F6]/45 flex flex-col items-center justify-center gap-[5px] transition-colors cursor-pointer backdrop-blur-md shadow-sm shrink-0"
            >
              {menuOpen ? (
                <X className="size-5 text-[#EEF0F6]" />
              ) : (
                <>
                  <span className="w-4 h-[1.5px] bg-[#EEF0F6] block rounded-full" />
                  <span className="w-4 h-[1.5px] bg-[#EEF0F6] block rounded-full" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links (< sm: slides down from top, sticking to top, right-aligned, transparent) */}
      <motion.nav
        initial={false}
        animate={{
          opacity: menuOpen ? 1 : 0,
          y: menuOpen ? 0 : -20,
        }}
        transition={{
          duration: 0.32,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "sm:hidden max-w-[1440px] mx-auto px-5 flex items-center justify-end gap-3.5 pt-0 pb-3 pointer-events-auto bg-transparent",
          !menuOpen && "pointer-events-none invisible"
        )}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="text-xs font-medium text-zinc-300 hover:text-white transition-colors py-1 relative group tracking-wide whitespace-nowrap"
          >
            <span>{item.label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#3ca2fa] transition-all duration-200 group-hover:w-full" />
          </a>
        ))}
      </motion.nav>
    </motion.header>
  )
}

export default Navbar
