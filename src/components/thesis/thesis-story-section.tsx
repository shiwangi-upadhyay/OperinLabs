"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  Languages,
  ShieldCheck,
  Check,
  X,
  Server,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Clock,
  CheckCircle2,
} from "lucide-react"

interface VernacularSample {
  lang: string
  nativeLabel: string
  flag: string
  patientUtterance: string
  translation: string
  clinicalIntent: string
  actionDispatched: string
  latency: string
}

const VERNACULAR_SAMPLES: VernacularSample[] = [
  {
    lang: "Assamese",
    nativeLabel: "অসমীয়া",
    flag: "AS",
    patientUtterance: "মোক কালি ৰাতিৰ পৰা বৰ কাহ হৈছে আৰু বুকুখন গধুৰ লাগিছে",
    translation: "I've had severe coughing since last night and my chest feels heavy",
    clinicalIntent: "Acute Bronchospasm & Thoracic Heaviness (Cardiorespiratory Triage)",
    actionDispatched: "Priority morning OPD slot assigned with Dr. Goswami (Pulmonology)",
    latency: "210ms",
  },
  {
    lang: "Bengali",
    nativeLabel: "বাংলা",
    flag: "BN",
    patientUtterance: "আমার বাচ্চার খুব জ্বর আর কিছু মুখে দিচ্ছে না, কাল সকালের স্লট হবে?",
    translation: "My child has a high fever and isn't eating anything, can I get a morning slot tomorrow?",
    clinicalIntent: "Pediatric Pyrexia with Anorexia (Pediatric Urgent)",
    actionDispatched: "Immediate 10:15 AM pediatric slot reserved + hydration advisory sent via WhatsApp",
    latency: "195ms",
  },
  {
    lang: "Hindi",
    nativeLabel: "हिन्दी",
    flag: "HI",
    patientUtterance: "डॉक्टर साहब की कल की दवाई से थोड़ा चक्कर आ रहा है, क्या डोज़ कम करूँ?",
    translation: "I feel slightly dizzy from yesterday's medicine, should I reduce the dosage?",
    clinicalIntent: "Adverse Drug Symptom Query (Safety Boundary Trigger)",
    actionDispatched: "Strict instruction not to alter dosage + automated urgent callback ticket to Dr. Verma",
    latency: "230ms",
  },
  {
    lang: "English",
    nativeLabel: "English",
    flag: "EN",
    patientUtterance: "I need to reschedule my cardiology review from Thursday to Saturday morning",
    translation: "Reschedule request for existing patient cardiology appointment",
    clinicalIntent: "Direct Calendar Reallocation & Slot Exchange",
    actionDispatched: "Bidirectional hospital HIS swap confirmed + SMS token dispatched",
    latency: "180ms",
  },
]

export function ThesisStorySection() {
  const [activeLangIdx, setActiveLangIdx] = useState<number>(0)
  const currentSample = VERNACULAR_SAMPLES[activeLangIdx]

  return (
    <section
      id="thesis"
      aria-label="OperinLabs Thesis"
      className="relative w-full bg-[#0F0F11] text-[#EEF0F6] py-24 sm:py-32 px-6 sm:px-12 lg:px-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F11 50%, #0b1224 100%)",
      }}
    >
      {/* Ambient Lighting Gradients matching Footer */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] rounded-full bg-[#3ca2fa]/[0.05] blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-[#2563eb]/[0.05] blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto">
        {/* ── SECTION HEADER: CHAPTER 04 ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[#3ca2fa]"
          >
            Chapter 04 · The Thesis
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Healthcare software shouldn't just record work.{" "}
            <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3ca2fa] bg-clip-text text-transparent">
              It should do it.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl"
          >
            For thirty years, hospitals were sold passive databases that turned doctors into data clerks and left patients waiting on hold. We founded OperinLabs on three foundational convictions.
          </motion.p>
        </div>

        {/* ── THREE PILLARS STORY BREAKDOWN ── */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {/* ── PILLAR 1: ACTION OVER RECORDING (THE OLD WAY VS THE OPERIN SHIFT) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-[#121217]/90 p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-mono mb-4">
                  <Activity className="size-3.5 text-[#3ca2fa]" />
                  <span>Principle 01 · Autonomous Execution</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                  Hospitals don't need another dashboard. They need workers.
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal mb-5">
                  Legacy healthcare IT requires humans to click 18 times just to book a slot, and forces doctors to spend 2 hours typing EHR charts for every 1 hour with patients. Operin reverses this: software shouldn't ask humans to log what happened — it should do the work itself.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-[#3ca2fa]">
                  <Sparkles className="size-3.5" />
                  <span>Sub-second autonomous execution directly into hospital HIS</span>
                </div>
              </div>

              {/* The Visual Comparison */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Legacy Way */}
                <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase tracking-wider mb-3">
                      <X className="size-4" />
                      <span>The Legacy IT Way</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-200 mb-3">
                      Passive Recording Software
                    </h4>
                    <div className="flex flex-col gap-2.5 text-xs text-zinc-400">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 font-mono mt-0.5">✕</span>
                        <span>18 manual clicks per appointment booking</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 font-mono mt-0.5">✕</span>
                        <span>15 min typing clinical notes after every consultation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 font-mono mt-0.5">✕</span>
                        <span>40%+ incoming patient calls go unanswered at night</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 font-mono mt-0.5">✕</span>
                        <span>45-minute lines at insurance TPA discharge counter</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-red-500/15 text-[11px] font-mono text-red-400/90">
                    High physician burnout · Patient dissatisfaction
                  </div>
                </div>

                {/* Operin Shift */}
                <div className="rounded-2xl border border-[#3ca2fa]/40 bg-[#3ca2fa]/10 p-5 flex flex-col justify-between shadow-[0_0_30px_rgba(60,162,250,0.12)]">
                  <div>
                    <div className="flex items-center gap-2 text-[#3ca2fa] text-xs font-mono uppercase tracking-wider mb-3">
                      <Check className="size-4" />
                      <span>The Operin Shift</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-3">
                      Autonomous Action Infrastructure
                    </h4>
                    <div className="flex flex-col gap-2.5 text-xs text-zinc-200">
                      <div className="flex items-start gap-2">
                        <span className="text-[#3ca2fa] font-mono mt-0.5">✓</span>
                        <span>0 clicks: Voice &amp; WhatsApp calendar dispatch</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#3ca2fa] font-mono mt-0.5">✓</span>
                        <span>Ambient listening drafts SOAP notes for 1-tap sign-off</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#3ca2fa] font-mono mt-0.5">✓</span>
                        <span>100% calls answered within 2 rings, 24/7/365</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#3ca2fa] font-mono mt-0.5">✓</span>
                        <span>30-second automated pre-authorization with 0% denials</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#3ca2fa]/25 text-[11px] font-mono text-[#3ca2fa]">
                    2.5 hours returned to doctor daily · 0 missed calls
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── PILLAR 2: VERNACULAR AS INFRASTRUCTURE (NOT TRANSLATION) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-[#121217]/90 p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-mono mb-4">
                  <Languages className="size-3.5 text-[#3ca2fa]" />
                  <span>Principle 02 · Vernacular Infrastructure</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                  Translation fails in healthcare. Native phonetics is required.
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal mb-5">
                  Silicon Valley voice bots translate English prompts with generic cloud APIs. But in India, patients describe chest tightness, acute fever, or abdominal pain with colloquial idioms and code-switched dialects. Translation delay causes distortion; Operin trains native acoustic phonetics directly on regional vernacular speech.
                </p>
                <div className="flex flex-wrap gap-2">
                  {VERNACULAR_SAMPLES.map((s, idx) => (
                    <button
                      key={s.lang}
                      type="button"
                      onClick={() => setActiveLangIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        activeLangIdx === idx
                          ? "bg-[#3ca2fa]/20 border border-[#3ca2fa]/50 text-white font-semibold"
                          : "border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {s.lang} ({s.nativeLabel})
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Dialect & Intent Inspector Console */}
              <div className="lg:col-span-7 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSample.lang}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl border border-white/10 bg-[#16161d] p-5 sm:p-6 shadow-xl flex flex-col gap-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {currentSample.flag}
                        </span>
                        <span className="text-xs font-semibold text-white">
                          Native Speech Stream · {currentSample.lang}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {currentSample.latency} direct dispatch
                      </span>
                    </div>

                    {/* Patient Utterance */}
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
                        Patient Colloquial Utterance
                      </span>
                      <p className="text-base sm:text-lg font-medium text-white">
                        "{currentSample.patientUtterance}"
                      </p>
                      <p className="text-xs text-zinc-400 italic mt-1.5">
                        "{currentSample.translation}"
                      </p>
                    </div>

                    {/* Parsed Clinical Intent */}
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/25 p-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#3ca2fa] font-semibold block mb-1">
                        Parsed Clinical Intent (Zero Cloud Translation)
                      </span>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {currentSample.clinicalIntent}
                      </div>
                    </div>

                    {/* Autonomous Action Dispatched */}
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                        Autonomous Action Dispatched to HIS
                      </span>
                      <div className="text-xs sm:text-sm text-emerald-200 font-medium">
                        {currentSample.actionDispatched}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ── PILLAR 3: EDGE SOVEREIGNTY & ABSOLUTE PRIVACY ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-[#121217]/90 p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-mono mb-4">
                  <ShieldCheck className="size-3.5 text-[#3ca2fa]" />
                  <span>Principle 03 · Edge Sovereignty</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                  A patient's medical data must never leave the hospital walls.
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal mb-5">
                  Most voice AI platforms pipe medical voice recordings to foreign commercial LLMs. We believe clinical privacy is non-negotiable. Operin deploys a private edge inference stack directly on hospital perimeter hardware — sub-second response times with 100% data sovereignty.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Lock className="size-3.5 text-emerald-400" />
                  <span>Compliant with Indian DPDP Act 2023 &amp; HIPAA standards</span>
                </div>
              </div>

              {/* Edge Architecture Security Card */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
                  <div>
                    <Server className="size-6 text-[#3ca2fa] mb-3" />
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                      &lt; 340ms
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Local edge voice inference runtime on clinic hardware
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
                  <div>
                    <ShieldCheck className="size-6 text-emerald-400 mb-3" />
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                      0 Bytes
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Audio data sent to external public LLM training corpuses
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
                  <div>
                    <Lock className="size-6 text-amber-400 mb-3" />
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                      100%
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Air-gapped on-premise perimeter deployment ready
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
                  <div>
                    <Zap className="size-6 text-blue-400 mb-3" />
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                      AES-256
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      End-to-end encrypted storage &amp; hospital HIS transmission
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── THE IMPACT IN NUMBERS & CLINICAL SYNTHESIS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 sm:mt-24 rounded-3xl border border-[#3ca2fa]/30 bg-gradient-to-b from-[#3ca2fa]/10 to-transparent p-8 sm:p-12 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#3ca2fa] mb-3">
            The Human Outcome
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            When technology does the work, doctors can look patients in the eyes again.
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-10 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">100%</div>
              <div className="text-xs text-zinc-400 mt-1">Calls answered within 2 rings</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#3ca2fa] font-mono">2.5 hrs</div>
              <div className="text-xs text-zinc-400 mt-1">Daily clinical time saved per doctor</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">4</div>
              <div className="text-xs text-zinc-400 mt-1">Native Indian vernacular languages</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#3ca2fa] font-mono">6+</div>
              <div className="text-xs text-zinc-400 mt-1">Hospitals piloting across India</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(59,130,246,0.6)]"
            >
              <span>Schedule a Hospital Pilot</span>
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#workforce"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold tracking-wide text-zinc-200 transition-all hover:bg-white/[0.08] hover:text-white"
            >
              <span>Explore The Clinic Floor</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ThesisStorySection
