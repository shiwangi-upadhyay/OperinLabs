"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import {
  Mic,
  RefreshCw,
  FileAudio,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export interface TeamNode {
  id: number
  title: string
  role: string
  status: "Live" | "Coming soon"
  icon: React.ElementType
  shortDesc: string
  description: string
  capabilities: string[]
  metrics: { label: string; value: string }[]
  initialAngle: number // degrees on circle (0 = right, 90 = bottom, 180 = left/9 o'clock, 270 = top/12 o'clock)
}

const teamNodes: TeamNode[] = [
  {
    id: 1,
    title: "AI Receptionist",
    role: "Autonomous Front Desk & Voice Operations",
    status: "Live",
    icon: Mic,
    shortDesc: "Answers calls, schedules appointments, and answers FAQs 24/7.",
    description:
      "OperinLabs AI Receptionist acts as your clinic's primary voice front desk. It answers inbound phone calls with sub-400ms natural conversational latency, speaks fluent Assamese, Bengali, Hindi, and English, directly books slots in your EHR, and triages urgent symptoms.",
    capabilities: [
      "Sub-400ms natural conversational latency",
      "Assamese, Bengali, Hindi & English fluency",
      "Direct bi-directional EHR scheduling",
      "24/7 after-hours call routing & triage",
    ],
    metrics: [
      { label: "Call Resolution", value: "99.4%" },
      { label: "Response Latency", value: "<400ms" },
      { label: "Languages", value: "4 Dialects" },
    ],
    initialAngle: 180, // Starts at 9 o'clock (Left)
  },
  {
    id: 2,
    title: "AI Patient Care Coordinator",
    role: "Pre & Post Care Workflow Automation",
    status: "Coming soon",
    icon: RefreshCw,
    shortDesc: "Proactive care follow-ups, pre-op prep, and post-discharge recovery check-ins.",
    description:
      "Engages patients between visits with automated pre-procedure preparation reminders, fasting instructions, and post-discharge symptom recovery follow-ups. Reduces surgical no-shows and flags complications back to your clinical staff.",
    capabilities: [
      "Proactive automated WhatsApp & SMS check-ins",
      "Pre-procedure fasting & medication prep",
      "Post-op recovery symptom questionnaires",
      "Escalation directly to on-call nursing staff",
    ],
    metrics: [
      { label: "No-Show Drop", value: "-42%" },
      { label: "Follow-up Reach", value: "98%" },
      { label: "Delivery Channels", value: "Omnichannel" },
    ],
    initialAngle: 270, // Starts at 12 o'clock (Top)
  },
  {
    id: 3,
    title: "AI Scribe",
    role: "Ambient Clinical Consultation Listening & EHR Documentation",
    status: "Coming soon",
    icon: FileAudio,
    shortDesc: "Ambiently listens to patient-doctor consultations to produce real-time SOAP notes.",
    description:
      "Listens in the background during patient consultations, extracting medical context to automatically generate structured SOAP notes, ICD-10 codes, and clinical summaries ready for one-click physician sign-off in your EHR.",
    capabilities: [
      "Ambient hands-free clinical listening",
      "Structured SOAP note & ICD-10 generation",
      "Multilingual doctor-patient transcription",
      "One-click EHR synchronization",
    ],
    metrics: [
      { label: "Doctor Time Saved", value: "2.5 hrs/day" },
      { label: "Documentation Accuracy", value: "99.1%" },
      { label: "Compliance", value: "HIPAA & SOC-2" },
    ],
    initialAngle: 0, // Starts at 3 o'clock (Right)
  },
  {
    id: 4,
    title: "AI Claims Associate",
    role: "Autonomous Revenue Cycle & Prior Authorizations",
    status: "Coming soon",
    icon: ShieldCheck,
    shortDesc: "Real-time eligibility verification, prior auth submissions, and claim denial scrubbing.",
    description:
      "Eliminates administrative revenue delays by automating pre-authorization requests, verifying insurance coverage in real time, and scrubbing claims against payer rules before submission to prevent costly claim denials.",
    capabilities: [
      "Instant real-time insurance eligibility checks",
      "Autonomous prior authorization packet submissions",
      "Predictive denial claim scrubbing",
      "Direct clearinghouse & payer API integration",
    ],
    metrics: [
      { label: "Denial Reduction", value: "-68%" },
      { label: "Auth Turnaround", value: "<15 mins" },
      { label: "Audit Trail", value: "100% Logged" },
    ],
    initialAngle: 90, // Starts at 6 o'clock (Bottom)
  },
]

export function RadialOrbitalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0)

  // Track scroll progress through the multi-screen container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Use low stiffness and high damping as requested for a smooth shock absorber feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  })

  // Phase 1: Diagonal Translation (Scroll 0% to 25%)
  // Moves the orbital circle downwards and to the right so its right hemisphere moves offscreen
  const orbitTranslateX = useTransform(smoothProgress, [0, 0.25, 1], ["0%", "36%", "36%"])
  const orbitTranslateY = useTransform(smoothProgress, [0, 0.25, 1], ["0px", "60px", "60px"])

  // Phase 2: Ferris Wheel Rotation (Scroll 25% to 100%)
  // Counter-clockwise rotation by 270 degrees
  const wheelRotation = useTransform(smoothProgress, [0, 0.25, 1], [0, 0, -270])

  // Content fade-in on the left side as the circle shifts right
  const leftContentOpacity = useTransform(smoothProgress, [0, 0.18, 0.28], [0, 0.4, 1])
  const leftContentTranslateX = useTransform(smoothProgress, [0, 0.25], [-40, 0])

  // Track which node is at 9 o'clock based on scroll rotation
  useEffect(() => {
    const unsubscribe = wheelRotation.on("change", (rot) => {
      // Rotation starts at 0° (Node 1 active at 9 o'clock)
      // Rotates counter-clockwise: -90° (Node 2), -180° (Node 3), -270° (Node 4)
      const absRot = Math.abs(rot)
      let idx = 0
      if (absRot < 45) {
        idx = 0
      } else if (absRot >= 45 && absRot < 135) {
        idx = 1
      } else if (absRot >= 135 && absRot < 225) {
        idx = 2
      } else {
        idx = 3
      }
      setActiveNodeIndex(idx)
    })
    return () => unsubscribe()
  }, [wheelRotation])

  const activeNode = teamNodes[activeNodeIndex]
  const radius = 260 // radius of the orbit ring in px

  return (
    <section
      ref={containerRef}
      className="relative h-[380vh] w-full bg-[#03050a] text-white"
      id="workforce"
    >
      {/* Sticky Fullscreen Presentation Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-8 pb-10">
        {/* Background Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/[0.08] blur-[140px]" />
        </div>

        {/* 1. Header Area (Top-Left Fixed) */}
        <div className="relative z-30 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-950/40 px-3 py-1 text-xs font-medium tracking-wider text-blue-400 uppercase backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            The workforce
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            Meet your AI team.{" "}
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              Built for Healthcare.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
            OperinLabs is a team of AI employees that runs your clinic's front desk and patient care
            operations — around the clock.
          </p>
        </div>

        {/* Main Stage: Left Dynamic Content + Right Ferris Wheel Orbit */}
        <div className="relative flex-1 w-full flex items-center justify-between mt-4">
          {/* ── LEFT: Dynamic Active Member Detail Card (Fades in during Phase 1) ── */}
          <motion.div
            style={{
              opacity: leftContentOpacity,
              x: leftContentTranslateX,
            }}
            className="relative z-20 w-full max-w-md lg:max-w-lg pr-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6 lg:p-7 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden"
              >
                {/* Glowing Top Seam Accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                {/* Status + Step Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase border ${
                      activeNode.status === "Live"
                        ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                        : "border-blue-500/30 bg-blue-950/40 text-blue-300"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        activeNode.status === "Live" ? "bg-emerald-400 animate-ping" : "bg-blue-400"
                      }`}
                    />
                    {activeNode.status}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    0{activeNode.id} / 04
                  </span>
                </div>

                {/* Title & Role */}
                <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
                  {activeNode.title}
                </h3>
                <p className="text-xs font-medium text-blue-400 tracking-wide uppercase mb-3">
                  {activeNode.role}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                  {activeNode.description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-2 mb-6">
                  {activeNode.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0 stroke-[2.5]" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.08] mb-5">
                  {activeNode.metrics.map((m, i) => (
                    <div key={i} className="rounded-lg bg-white/[0.02] p-2 text-center border border-white/[0.04]">
                      <div className="text-sm font-bold text-white font-mono">{m.value}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 tracking-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  size="sm"
                  className="w-full gap-2 rounded-full bg-blue-600 py-4 text-xs font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all cursor-pointer"
                >
                  {activeNode.status === "Live" ? "Talk to AI Receptionist" : "Request Early Pilot Access"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: The Scroll-Driven Orbital Wheel Container ── */}
          <div className="relative flex-1 flex items-center justify-center h-full">
            <motion.div
              style={{
                x: orbitTranslateX,
                y: orbitTranslateY,
              }}
              className="relative flex items-center justify-center"
            >
              {/* 1. Decorative Infinite Slow Spin Rings (Continuous independent background rotation) */}
              <div
                className="absolute rounded-full border border-blue-500/10 pointer-events-none animate-[spin_60s_linear_infinite]"
                style={{ width: `${radius * 2 + 100}px`, height: `${radius * 2 + 100}px` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-400/40 blur-[1px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-blue-400/40 blur-[1px]" />
              </div>

              {/* Main Visible Orbit Guide Ring */}
              <div
                className="absolute rounded-full border border-white/[0.12] pointer-events-none shadow-[0_0_30px_rgba(37,99,235,0.15)]"
                style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
              >
                {/* Dashed Inner Accent Ring */}
                <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/20" />
              </div>

              {/* Central Glowing Core Orb */}
              <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-blue-500/40 bg-blue-950/40 backdrop-blur-md shadow-[0_0_35px_rgba(37,99,235,0.4)]">
                <div className="absolute inset-1.5 rounded-full border border-blue-400/20 animate-pulse" />
                <div className="flex flex-col items-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Operin</div>
                  <div className="text-[8px] tracking-widest text-zinc-400 uppercase">Core</div>
                </div>
              </div>

              {/* 2. Main Ferris Wheel Container (Rotates by scroll progress) */}
              <motion.div
                style={{
                  rotate: wheelRotation,
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {teamNodes.map((node, index) => {
                  // Angle in radians for position:
                  // Node 1: 180° (9 o'clock)
                  // Node 2: 270° (12 o'clock)
                  // Node 3: 0°   (3 o'clock)
                  // Node 4: 90°  (6 o'clock)
                  const rad = (node.initialAngle * Math.PI) / 180
                  const x = radius * Math.cos(rad)
                  const y = radius * Math.sin(rad)
                  const isActive = activeNodeIndex === index

                  return (
                    <div
                      key={node.id}
                      className="absolute pointer-events-auto"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      {/* CRUCIAL COUNTER-ROTATION:
                          The parent rotates by wheelRotation.
                          This child counter-rotates by -wheelRotation so icons and text remain upright at all times! */}
                      <motion.div
                        style={{
                          rotate: useTransform(wheelRotation, (val) => -val),
                        }}
                        className="relative flex flex-col items-center cursor-pointer group"
                        onClick={() => setActiveNodeIndex(index)}
                      >
                        {/* Node Halo Effect */}
                        <div
                          className={`absolute -inset-2 rounded-full transition-all duration-500 ${
                            isActive
                              ? "bg-blue-600/30 blur-md scale-125"
                              : "bg-transparent group-hover:bg-blue-500/10"
                          }`}
                        />

                        {/* Node Orb Circle */}
                        <div
                          className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                            isActive
                              ? "border-blue-400 bg-blue-600 text-white shadow-[0_0_25px_#2563eb] scale-110"
                              : "border-white/[0.15] bg-[#03050a]/90 text-zinc-300 hover:border-blue-400/60 hover:text-white backdrop-blur-md"
                          }`}
                        >
                          <node.icon className="h-6 w-6" />

                          {/* Status Indicator Dot on Orb */}
                          {node.status === "Live" && (
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-black" />
                            </span>
                          )}
                        </div>

                        {/* Node Text Label (Always Upright) */}
                        <div
                          className={`mt-2.5 whitespace-nowrap text-center text-xs font-bold tracking-wide transition-all duration-300 drop-shadow-md ${
                            isActive
                              ? "text-blue-300 scale-105"
                              : "text-zinc-400 group-hover:text-zinc-200"
                          }`}
                        >
                          {node.title}
                        </div>

                        {/* Status Sub-badge */}
                        <div
                          className={`text-[9px] font-medium tracking-wider uppercase transition-colors ${
                            node.status === "Live"
                              ? "text-emerald-400"
                              : "text-zinc-500"
                          }`}
                        >
                          {node.status}
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Indicator Helper */}
        <div className="relative z-30 flex items-center justify-between text-xs text-zinc-500 border-t border-white/[0.06] pt-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>Scroll to rotate the AI Workforce Ferris Wheel</span>
          </div>
          <div className="flex items-center gap-4">
            {teamNodes.map((n, i) => (
              <button
                key={n.id}
                onClick={() => setActiveNodeIndex(i)}
                className={`transition-colors cursor-pointer ${
                  activeNodeIndex === i ? "text-blue-400 font-semibold" : "hover:text-zinc-400"
                }`}
              >
                0{n.id}. {n.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
