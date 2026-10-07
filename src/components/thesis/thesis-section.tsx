"use client"

import React from "react"
import { motion } from "framer-motion"
import { Activity, Languages, ShieldCheck } from "lucide-react"

interface ThesisPillar {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  highlights: string[]
}

const THESIS_ITEMS: ThesisPillar[] = [
  {
    id: "1",
    title: "Every Call Has Intent",
    description:
      "Patients don't call hospitals for small talk. Every call carries urgent clinical intent, symptom triage, or rescheduling needs that require immediate operational dispatch.",
    icon: Activity,
    highlights: [
      "Real-time clinical intent parsing & symptom triage classification",
      "Direct bidirectional calendar dispatch into hospital EHR/HIS",
      "Zero dropped inquiries or abandoned calls during peak morning surges",
    ],
  },
  {
    id: "2",
    title: "Multilingual is Infrastructure",
    description:
      "Voice AI built for Silicon Valley bolts translation layers onto English models. OperinLabs trains native acoustic phonetics from day one across Indian regional dialects.",
    icon: Languages,
    highlights: [
      "Native acoustic phonetics: Assamese, Bengali, Hindi & English",
      "Dialect-aware clinical terminology and colloquial symptom phrasing",
      "Zero-latency vernacular dispatch with zero cloud translation distortion",
    ],
  },
  {
    id: "3",
    title: "Autonomous Action, Real Privacy",
    description:
      "Copilots still require doctors or front desk staff to babysit them. OperinLabs executes complete clinical workflows end-to-end with 100% on-premise edge privacy.",
    icon: ShieldCheck,
    highlights: [
      "Autonomous workflow execution without constant staff oversight",
      "Sub-second (<340ms) inference runtime on private clinic hardware",
      "100% private hospital perimeter — zero third-party LLM data leakage",
    ],
  },
]

export function ThesisSection() {
  return (
    <section
      id="thesis"
      className="relative w-full shrink-0 flex-none bg-[#0F0F11] text-[#EEF0F6] pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24 px-6 sm:px-12 lg:px-16 overflow-x-clip"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 20%, #0F0F11 50%, #3ca2fa33 100%)",
      }}
    >
      {/* Ambient Lighting Accents matching Footer */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[480px] rounded-full bg-[#3ca2fa]/[0.05] blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-[#3ca2fa]/[0.04] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ── LEFT COLUMN: STICKY MASTHEAD (Exact colors matching The Workforce & Footer) ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start">
          <div className="mb-2.5 text-[11px] font-semibold tracking-wider text-[#3ca2fa] uppercase">
            The thesis
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Software shouldn't record work.{" "}
            <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3ca2fa] bg-clip-text text-transparent">
              It should do it.
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#AEB5CA] leading-relaxed max-w-xl">
            We believe the next generation of healthcare software won't just help teams do their work — it will do the work with them. AI should understand clinical intent, execute workflows, and complete operations 24/7.
          </p>
        </div>

        {/* ── RIGHT COLUMN: VERTICALLY SCROLLABLE CARDS (Reduced width, reasonable vertical gaps) ── */}
        <div className="lg:col-span-7 flex flex-col items-start lg:items-end gap-5 sm:gap-6">
          {THESIS_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[500px] relative flex flex-col justify-between min-h-[380px] sm:min-h-[420px] rounded-3xl border border-white/[0.08] bg-[#121217]/85 p-7 sm:p-9 lg:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)] hover:border-[#3ca2fa]/35 transition-colors duration-200"
              >
                {/* Minimal line icon in electric blue, directly on card */}
                <div className="mb-12 sm:mb-16">
                  <Icon className="size-7 text-[#3ca2fa] stroke-[1.75]" />
                </div>

                {/* Body Content with clean, balanced spacing */}
                <div className="w-full flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#AEB5CA] leading-relaxed mb-5 font-normal">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List without tick icons */}
                  <div className="flex flex-col gap-2.5">
                    {item.highlights.map((point, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-[13px] text-[#CBD5E1]/90 leading-relaxed"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ThesisSection
