"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PhoneCall,
  FileText,
  ShieldCheck,
  HeartPulse,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Stethoscope,
  Sparkles,
  Check,
  Send,
  RefreshCw,
  MessageSquare,
  Lock,
} from "lucide-react"
import { ReceptionistSimulator } from "@/components/workforce/receptionist-simulator"
import { NODES_DATA } from "@/data/workforce-data"

interface ClinicStage {
  id: string
  time: string
  location: string
  role: string
  title: string
  tagline: string
  story: string
  impactMetric: { value: string; label: string }
  features: string[]
  icon: React.ElementType
  badge: string
}

const CLINIC_STAGES: ClinicStage[] = [
  {
    id: "front-desk",
    time: "02:08 AM",
    location: "Guwahati Clinic · Front Desk",
    role: "AI Receptionist",
    title: "The 2:07 AM Call Answered",
    tagline: "Front desk closed. Emergency call answered in 2 rings.",
    story:
      "When the mother calls from Guwahati with a sick child in the middle of the night, the lights in the clinic lobby are off — but Operin is active. In native Assamese, the AI calms her, notes the child's high-grade fever, checks Dr. Barua's morning pediatric schedule, reserves Slot #4 at 10:30 AM, and instantly sends clinic directions and appointment token via WhatsApp.",
    impactMetric: { value: "100%", label: "Calls picked up in <2 seconds" },
    features: [
      "Vernacular triage in Assamese, Bengali, Hindi & English",
      "Direct integration into hospital HIS calendar",
      "Automated WhatsApp confirmation with token & map",
      "Instant emergency escalation to on-call duty medical officer",
    ],
    icon: PhoneCall,
    badge: "Live in 6+ hospitals",
  },
  {
    id: "consultation",
    time: "10:35 AM",
    location: "Pediatric OPD · Consultation Cabin 3",
    role: "Clinical AI Scribe",
    title: "Doctor Looks at the Child, Not a Screen",
    tagline: "Ambient listening drafts complete SOAP clinical notes in real time.",
    story:
      "Dr. Barua enters Cabin 3 to examine 4-year-old Aarav. In standard practice, doctors spend 15 minutes of every visit typing symptoms into clunky software while barely making eye contact. With Operin, an ambient microphone listens to the natural conversation in Hindi and Assamese. As Dr. Barua examines the throat and chest, a structured SOAP note with ICD-10 codes is drafted on the tablet, ready for a single-tap sign-off.",
    impactMetric: { value: "15 min", label: "Typing saved per consultation" },
    features: [
      "Ambient vernacular dialogue listening (no dictation cues)",
      "Automated SOAP note generation (Subjective, Objective, Assessment, Plan)",
      "ICD-10 diagnostic mapping & prescription auto-formatting",
      "One-click physician review & direct hospital EHR synchronization",
    ],
    icon: FileText,
    badge: "In Pilot",
  },
  {
    id: "billing",
    time: "11:15 AM",
    location: "Discharge & TPA Counter · Lobby Desk",
    role: "AI Claims & TPA Associate",
    title: "45-Minute Insurance Wait Reduced to 30 Seconds",
    tagline: "Instant insurance verification, claim scrubbing & pre-authorization.",
    story:
      "After the consultation, the family reaches the billing counter. In typical Indian hospitals, insurance verification (Ayushman Bharat / PM-JAY / Private TPA) causes agonizing 45-minute waits with physical papers. Operin's Claims Associate has already matched Dr. Barua's diagnosis against policy exclusions, scrubbed the claim, and cleared pre-authorization before the family even leaves the cabin.",
    impactMetric: { value: "30 sec", label: "TPA pre-authorization turnaround" },
    features: [
      "Instant ABHA ID & Ayushman Bharat eligibility verification",
      "Automated claim error scrubbing with 0% denial risk pre-check",
      "Direct bidirectional portal submission to Star Health, Care, HDFC Ergo",
      "Zero paperwork delay for patients at discharge",
    ],
    icon: ShieldCheck,
    badge: "In Pilot",
  },
  {
    id: "post-care",
    time: "Day 3 · 08:30 PM",
    location: "Patient's Home · WhatsApp Follow-Up",
    role: "AI Patient Care Coordinator",
    title: "Cared For at Home, Without Extra Staff",
    tagline: "Proactive recovery check-ins, medication adherence & nurse escalation.",
    story:
      "Post-visit care is where hospitals traditionally lose touch with patients. On Day 3, Operin automatically checks in with Mrs. Das on WhatsApp in Assamese: 'How is Aarav's fever tonight?' When Mrs. Das asks about adjusting medication dosage, Operin's safety guardrails engage — preventing unsafe self-medication and instantly notifying Dr. Barua's pediatric duty nurse.",
    impactMetric: { value: "84%", label: "Post-visit follow-up completion rate" },
    features: [
      "Scheduled recovery check-in over WhatsApp & interactive voice",
      "Medication adherence prompts & refill coordination",
      "Clinical boundary guardrails: no hallucinated medical advice",
      "Smart triage flag to duty nurse when red-flag symptoms arise",
    ],
    icon: HeartPulse,
    badge: "In Pilot",
  },
]

export function ClinicFloorSection() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0)
  const [scribeSigned, setScribeSigned] = useState<boolean>(false)
  const [claimsScrubbed, setClaimsScrubbed] = useState<boolean>(false)
  const [nurseAlertSent, setNurseAlertSent] = useState<boolean>(false)

  const stage = CLINIC_STAGES[activeStageIdx]

  return (
    <section
      id="workforce"
      aria-label="The 24-Hour Clinic Shift"
      className="relative w-full bg-[#0F0F11] text-[#EEF0F6] py-24 sm:py-32 px-6 sm:px-12 lg:px-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 15%, #0F0F11 50%, #0a0e1a 100%)",
      }}
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#3ca2fa]/[0.04] blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] rounded-full bg-[#2563eb]/[0.05] blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto">
        {/* ── SECTION HEADER: CHAPTER 03 ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[#3ca2fa]"
          >
            Chapter 03 · The Clinic Floor
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            One patient. One clinic day.{" "}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Handled without missing a beat.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl"
          >
            Follow what happens after that 2:07 AM call is answered. From the dark front desk to the doctor's consultation room, billing counter, and recovery at home.
          </motion.p>

          {/* ── INTERACTIVE TIMELINE STEP NAVIGATOR ── */}
          <div className="mt-10 w-full max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {CLINIC_STAGES.map((s, idx) => {
                const isActive = activeStageIdx === idx
                const Icon = s.icon
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStageIdx(idx)}
                    className={`group relative flex flex-col items-start p-3 sm:p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#3ca2fa]/15 border border-[#3ca2fa]/50 shadow-[0_0_24px_rgba(60,162,250,0.18)]"
                        : "border border-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span
                        className={`font-mono text-[11px] font-semibold tracking-wider ${
                          isActive ? "text-[#3ca2fa]" : "text-zinc-500 group-hover:text-zinc-400"
                        }`}
                      >
                        {s.time}
                      </span>
                      <Icon
                        className={`size-3.5 sm:size-4 ${
                          isActive ? "text-[#3ca2fa]" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-semibold truncate w-full ${
                        isActive ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {s.role}
                    </span>
                    <span className="text-[10px] text-zinc-500 truncate w-full mt-0.5">
                      {idx === 0 ? "Front Desk" : idx === 1 ? "OPD Cabin" : idx === 2 ? "Billing" : "At Home"}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── STAGE MAIN CHOREOGRAPHY: STORY CARD + LIVE CLINICAL CONSOLE ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* ── LEFT COLUMN: THE CLINICAL STORY ── */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Timing & Location Ribbon */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-zinc-300 mb-5">
                <Clock className="size-3.5 text-[#3ca2fa]" />
                <span className="text-white font-semibold">{stage.time}</span>
                <span className="text-zinc-500">·</span>
                <span>{stage.location}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2">
                {stage.title}
              </h3>
              <p className="text-sm font-medium text-[#3ca2fa] mb-5">
                {stage.tagline}
              </p>

              {/* Narrative Story */}
              <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed mb-6 font-normal">
                {stage.story}
              </p>

              {/* Impact Statistic Card */}
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {stage.impactMetric.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {stage.impactMetric.label}
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30 bg-blue-500/10 text-blue-300">
                  {stage.badge}
                </span>
              </div>

              {/* Operational Capabilities List */}
              <div className="w-full flex flex-col gap-2.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold mb-1">
                  How Operin Handles This
                </span>
                {stage.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="size-4 text-[#3ca2fa] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Quick switch to next chapter */}
              <button
                type="button"
                onClick={() => setActiveStageIdx((activeStageIdx + 1) % CLINIC_STAGES.length)}
                className="mt-8 inline-flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>NEXT CLINICAL STAGE</span>
                <ArrowRight className="size-3.5 text-[#3ca2fa]" />
              </button>
            </div>

            {/* ── RIGHT COLUMN: THE LIVE CLINICAL INTERFACE ── */}
            <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
              {/* STAGE 0: RECEPTIONIST SIMULATOR */}
              {activeStageIdx === 0 && (
                <div className="w-full max-w-[520px]">
                  <ReceptionistSimulator node={NODES_DATA[0]} inFocus={true} />
                </div>
              )}

              {/* STAGE 1: CLINICAL AI SCRIBE TABLET */}
              {activeStageIdx === 1 && (
                <div className="w-full max-w-[540px] rounded-3xl border border-white/10 bg-[#141419] p-5 sm:p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] text-[#EEF0F6]">
                  {/* Tablet Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Stethoscope className="size-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Dr. Barua · Cabin 3</div>
                        <div className="text-[11px] text-zinc-400">Pediatric OPD · Patient: Aarav Das (4y)</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Ambient Scribing</span>
                    </div>
                  </div>

                  {/* Ambient Audio Equalizer Bar */}
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Sparkles className="size-3.5 text-[#3ca2fa]" />
                      <span>Listening in Hindi &amp; Assamese</span>
                    </div>
                    <div className="flex items-center gap-1 h-4">
                      {[12, 24, 16, 28, 20, 32, 14, 22, 18, 26, 12].map((height, i) => (
                        <span
                          key={i}
                          className="w-1 bg-[#3ca2fa]/70 rounded-full animate-pulse"
                          style={{
                            height: `${height}px`,
                            animationDelay: `${i * 120}ms`,
                            animationDuration: "900ms",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* SOAP Note Drafting View */}
                  <div className="flex flex-col gap-3.5 text-xs sm:text-[13px] leading-relaxed">
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#3ca2fa] font-bold block mb-1">
                        S · Subjective
                      </span>
                      <p className="text-zinc-300">
                        4-year-old male brought by mother with high-grade fever (102.4°F) for 3 days, nocturnal dry cough, and mild loss of appetite. No vomiting or convulsions reported.
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#3ca2fa] font-bold block mb-1">
                        O · Objective
                      </span>
                      <p className="text-zinc-300">
                        Temp: 102.1°F · Pulse: 108 bpm · SpO2: 98% room air. Chest clear on bilateral auscultation. Pharyngeal erythema present. No lymphadenopathy.
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#3ca2fa] font-bold block mb-1">
                        A · Assessment &amp; ICD-10
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-mono">
                          ICD-10: J06.9 (Acute Upper Respiratory Infection)
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-zinc-300 text-[11px] font-mono">
                          ICD-10: R50.9 (Fever, unspecified)
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#3ca2fa] font-bold block mb-1">
                        P · Plan &amp; Prescription
                      </span>
                      <p className="text-zinc-300">
                        1. Syp. Paracetamol 250mg/5ml — 5ml SOS (max 4 doses/24h)<br />
                        2. Nasal Saline drops — 2 drops each nostril TDS<br />
                        3. Review in 48 hours or SOS if fever persists.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Physician Sign-Off Button */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500">
                      {scribeSigned ? "Synced with Apollo HIS at 10:39 AM" : "Ready for physician sign-off"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setScribeSigned(!scribeSigned)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        scribeSigned
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                      }`}
                    >
                      {scribeSigned ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Approved &amp; Synced to EHR</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-3.5" />
                          <span>1-Tap Sign &amp; Sync EHR</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2: TPA CLAIMS TERMINAL */}
              {activeStageIdx === 2 && (
                <div className="w-full max-w-[540px] rounded-3xl border border-white/10 bg-[#141419] p-5 sm:p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] text-[#EEF0F6]">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#3ca2fa] font-bold">
                        Hospital TPA Gateway · Operin Claims Engine
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                        Pre-Authorization &amp; Insurance Scrub
                      </h4>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono">
                      Sub-second Scrub
                    </div>
                  </div>

                  {/* Patient & Policy Profile */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                      <span className="text-[10px] text-zinc-500 block">Patient Name</span>
                      <span className="text-xs font-semibold text-white">Aarav Das (Minor)</span>
                    </div>
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                      <span className="text-[10px] text-zinc-500 block">Insurance Provider</span>
                      <span className="text-xs font-semibold text-white">Ayushman Bharat (PM-JAY)</span>
                    </div>
                  </div>

                  {/* Pre-Scrub Checks Checklist */}
                  <div className="flex flex-col gap-2.5 mb-5">
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-white">ABHA ID #91-4820-1923 Verified</div>
                          <div className="text-[10px] text-zinc-400">Authenticated directly with National Health Authority registry</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Valid</span>
                    </div>

                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-white">ICD-10 J06.9 OPD Package Mapped</div>
                          <div className="text-[10px] text-zinc-400">Approved for pediatric consultation + medication bundle</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Mapped</span>
                    </div>

                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-white">Denial Risk Pre-Check: 0.0%</div>
                          <div className="text-[10px] text-zinc-400">Zero policy exclusion triggers found in claim payload</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Clean</span>
                    </div>
                  </div>

                  {/* Pre-Auth Approval Card */}
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 mb-5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold block">
                        Pre-Authorization Approved
                      </span>
                      <span className="text-xl font-mono font-extrabold text-white">
                        ₹3,850.00
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block">Wait time saved</span>
                      <span className="text-xs font-bold text-emerald-300 font-mono">45 min → 28 sec</span>
                    </div>
                  </div>

                  {/* Interactive Scrub Action */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Ref: TPA-PMJAY-2026-9812
                    </span>
                    <button
                      type="button"
                      onClick={() => setClaimsScrubbed(!claimsScrubbed)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        claimsScrubbed
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                      }`}
                    >
                      {claimsScrubbed ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Dispatched to Insurer Portal</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="size-3.5" />
                          <span>Simulate Pre-Auth Dispatch</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 3: POST-CARE AT HOME WHATSAPP */}
              {activeStageIdx === 3 && (
                <div className="w-full max-w-[540px] rounded-3xl border border-white/10 bg-[#141419] p-5 sm:p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] text-[#EEF0F6]">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <MessageSquare className="size-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Mrs. Das (Aarav's Mother)</div>
                        <div className="text-[11px] text-zinc-400">WhatsApp Follow-Up · Day 3 Post-Visit</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Assamese &amp; English
                    </span>
                  </div>

                  {/* Chat Dialogue Thread */}
                  <div className="flex flex-col gap-3 my-2 text-xs sm:text-[13px]">
                    {/* Bot Message 1 */}
                    <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.08] p-3.5 max-w-[90%] self-start">
                      <p className="text-zinc-200">
                        নমস্কাৰ Mrs. Das! Dr. Barua's clinic is checking in on Aarav. Is his fever coming down after the Paracetamol?
                      </p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">08:30 PM · Sent automatically</span>
                    </div>

                    {/* Patient Message */}
                    <div className="rounded-2xl rounded-tr-sm bg-blue-600/25 border border-blue-500/40 p-3.5 max-w-[85%] self-end">
                      <p className="text-white">
                        Fever is 100.2°F tonight. He is still crying. Can I give him Ibuprofen syrup also?
                      </p>
                      <span className="text-[10px] text-blue-300 mt-1 block text-right">08:32 PM · Mrs. Das</span>
                    </div>

                    {/* Bot Safety Guardrail Response */}
                    <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] border border-[#3ca2fa]/40 p-3.5 max-w-[92%] self-start">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#3ca2fa] mb-1">
                        <ShieldCheck className="size-3.5" />
                        <span>Clinical Safety Boundary Guardrail</span>
                      </div>
                      <p className="text-zinc-200">
                        Please do not give Ibuprofen without doctor's guidance. I have immediately flagged this question to Dr. Barua's pediatric duty nurse, Sangita, who will review Aarav's chart right now.
                      </p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">08:32 PM · Zero hallucination safety</span>
                    </div>

                    {/* Nurse Alert Card */}
                    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex items-start gap-2.5">
                      <AlertCircle className="size-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-semibold text-amber-300 block">Nurse Alert Dispatch</span>
                        <span className="text-zinc-300">
                          Medication question routed to Pediatric Duty Nurse Sangita. Patient chart link attached.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500">
                      Safety Protocol: 100% human nurse escalation
                    </span>
                    <button
                      type="button"
                      onClick={() => setNurseAlertSent(!nurseAlertSent)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        nurseAlertSent
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                      }`}
                    >
                      {nurseAlertSent ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Nurse Sangita Connected</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-3.5" />
                          <span>Simulate Duty Nurse Callback</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── CHAPTER 03 TO 04 STORY BRIDGE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-28 flex flex-col items-center text-center"
        >
          <p className="max-w-xl text-sm sm:text-base text-zinc-400 italic">
            "When software does the work, hospitals stop losing patients to silence."
          </p>
          <div className="mt-6 flex flex-col items-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#3ca2fa]">
              Now discover the architectural thesis behind OperinLabs
            </p>
            <div className="mt-3 h-12 w-px bg-gradient-to-b from-[#3ca2fa] to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ClinicFloorSection
