"use client"

import React from "react"
import { Activity, Languages, ShieldCheck } from "lucide-react"
import { CircularCarousel, type CarouselItem } from "@/components/ui/circular-carousel"

const THESIS_ITEMS: CarouselItem[] = [
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
      aria-label="The Thesis"
      className="relative w-full bg-[#0F0F11] text-[#EEF0F6] min-h-screen lg:min-h-[100dvh] flex flex-col justify-start pt-14 sm:pt-20 pb-16 sm:pb-22 px-6 sm:px-10 lg:px-14 overflow-hidden"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 20%, #0F0F11 50%, #3ca2fa33 100%)",
      }}
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[480px] rounded-full bg-[#3ca2fa]/[0.05] blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-[#3ca2fa]/[0.04] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start w-full">
        {/* ── LEFT: HEADING (Anchored firmly at the top-left of the section) ── */}
        <div className="lg:col-span-5 flex flex-col items-start pt-0">
          <div className="mb-3 text-[11px] font-mono font-bold tracking-[0.25em] text-[#3ca2fa] uppercase">
            THE THESIS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Software shouldn't record work.{" "}
            <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3ca2fa] bg-clip-text text-transparent">
              It should do it.
            </span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-xl">
            We believe the next generation of healthcare software won't just help teams do their work — it will do the work with them. AI should understand clinical intent, execute workflows, and complete operations 24/7.
          </p>
        </div>

        {/* ── RIGHT: CARDS (Balanced vertically with equal top and bottom margins) ── */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center w-full pt-6 sm:pt-10 lg:pt-16">
          <CircularCarousel items={THESIS_ITEMS} />
        </div>
      </div>
    </section>
  )
}

export default ThesisSection
