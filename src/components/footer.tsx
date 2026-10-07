"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string
  duration?: number
  automatic?: boolean
  className?: string
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 450 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  )
}

export function Footer() {
  // Footer link sections populated strictly from the provided image
  const footerSections = [
    {
      title: "PRODUCT",
      links: [
        { label: "AI Receptionist", href: "#workforce" },
        { label: "AI Patient Care Coordinator", href: "#workforce" },
        { label: "AI Scribe", href: "#workforce" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Thesis", href: "#thesis" },
      ],
    },
    {
      title: "GET STARTED",
      links: [
        { label: "Pricing", href: "#pricing" },
        {
          label: "Book a Demo",
          href: "#book-demo",
          pulse: true,
        },
        { label: "Talk to your Receptionist", href: "#workforce" },
      ],
    },
  ]

  // Contact info data populated from the provided image
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "hello@operinlabs.com",
      href: "mailto:hello@operinlabs.com",
    },
  ]

  // Social media link from image
  const socialLinks = [
    {
      icon: (
        <svg className="size-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com/company/operinlabs",
    },
    {
      icon: <Globe size={18} />,
      label: "OperinLabs",
      href: "#",
    },
  ]

  return (
    <footer className="bg-[#0F0F11]/40 border border-white/[0.08] relative h-fit rounded-3xl overflow-hidden m-4 sm:m-8 text-[#EEF0F6]">
      <div className="max-w-7xl mx-auto p-8 sm:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/assets/logo-light.png"
                alt="OperinLabs"
                className="h-7 w-auto block select-none"
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
                className="text-white text-2xl font-bold"
              >
                Operin<span className="text-[#3ca2fa]">Labs</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Autonomous AI employees for clinics and hospitals — answering calls, scheduling appointments, and managing patient care 24/7.
            </p>
          </div>

          {/* Footer link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-[#3ca2fa] transition-colors"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1 -right-3.5 w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Support section */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">
              SUPPORT
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-zinc-400 hover:text-[#3ca2fa] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-zinc-400 hover:text-[#3ca2fa] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-700/60 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 space-y-4 md:space-y-0">
          {/* Social icons & Back to top */}
          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[#3ca2fa] transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
            {/* Copyright */}
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} OperinLabs. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Text hover effect using user component structure */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36 justify-center">
        <TextHoverEffect text="OperinLabs" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  )
}

export default Footer
