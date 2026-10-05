"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Product", href: "#product" },
  { label: "Our Thesis", href: "#thesis" },
  { label: "About Us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState("Home")

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="w-full flex h-16 items-center justify-between px-6 lg:px-10">
          {/* Brand Name Text */}
          <a href="#" className="flex items-center select-none py-1 group">
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">
              Operin<span className="text-[#2563EB]">Labs</span>
            </span>
          </a>

          {/* Desktop Navigation & CTA grouped to the right side */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            <nav className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = activeItem === item.label
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    className={`relative py-1 text-sm transition-colors duration-150 ${
                      isActive
                        ? "font-semibold text-[#0F172A]"
                        : "font-normal text-[#475569] hover:text-[#0F172A]"
                    }`}
                  >
                    {item.label}

                    {/* Active Blue Bottom Underline Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-underline"
                        className="absolute -bottom-2 left-0 right-0 h-[2.5px] rounded-full bg-[#0062FF]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                )
              })}
            </nav>

            {/* Book a Demo Button */}
            <button
              type="button"
              className="rounded-full bg-[#0062FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,98,255,0.35)] hover:bg-[#0052e0] hover:shadow-[0_6px_22px_rgba(0,98,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Book a Demo
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b border-slate-200 bg-white px-6 py-4 shadow-lg"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.label)
                    setMobileMenuOpen(false)
                  }}
                  className={`py-2 text-base font-medium transition-colors ${
                    activeItem === item.label
                      ? "text-[#0062FF] font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full rounded-full bg-[#0062FF] py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,98,255,0.3)] hover:bg-[#0052e0]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
  )
}
