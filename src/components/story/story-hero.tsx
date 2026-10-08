"use client"

import React, { useEffect, useRef } from "react"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const CYAN = "#3ca2fa"

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/** Fades a beat in and out across scroll progress. */
function useBeat(
  p: MotionValue<number>,
  inStart: number,
  inEnd: number,
  outStart?: number,
  outEnd?: number
) {
  const opacity = useTransform(
    p,
    outStart === undefined
      ? [inStart, inEnd]
      : [inStart, inEnd, outStart, outEnd as number],
    outStart === undefined ? [0, 1] : [0, 1, 1, 0]
  )
  const y = useTransform(
    p,
    outStart === undefined
      ? [inStart, inEnd]
      : [inStart, inEnd, outStart, outEnd as number],
    outStart === undefined ? [28, 0] : [28, 0, 0, -28]
  )
  return { opacity, y }
}

export function StoryHero() {
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })
  // Spring smoothing = the "silky" scrub, no stutter on wheel notches.
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 })

  useMotionValueEvent(p, "change", (v) => {
    progressRef.current = v
  })

  // Beats
  const beatA = useBeat(p, 0.0, 0.04, 0.2, 0.28)
  const beatB = useBeat(p, 0.3, 0.38, 0.5, 0.57)
  const beatC = useBeat(p, 0.58, 0.64, 0.7, 0.76)
  const beatD = useBeat(p, 0.78, 0.86)

  const missed = useTransform(p, [0.32, 0.46], [0, 40])
  const missedText = useTransform(missed, (v) => `${Math.round(v)}%+`)
  const patients = useTransform(p, [0.32, 0.46], [0, 1.4])
  const patientsText = useTransform(patients, (v) => `${v.toFixed(1)}B`)

  const barWidth = useTransform(p, [0, 1], ["0%", "100%"])
  const hintOpacity = useTransform(p, [0, 0.06], [1, 0])

  // ── Canvas voice orb ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = (ms: number) => {
      const t = ms / 1000
      const p = progressRef.current
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h * 0.46
      const size = Math.min(w, h)

      // Phase parameters derived from scroll
      const ringing = 1 - smoothstep(0.2, 0.52, p) * 0.88 // ripples fade as the call goes unanswered
      const answer = smoothstep(0.56, 0.68, p) // the call gets picked up
      const settle = smoothstep(0.7, 0.9, p) // visual moves up to make room for the headline

      // Waveform center: lifts slightly during answer so it never collides with 'Until now.' below
      const oy = cy - answer * (size * 0.06) - settle * size * 0.22
      const scale = 1 - settle * 0.35
      const orbAlpha = 1 - answer // the cold orb disappears once the call is answered

      // Unanswered state: cold grey, no blue glow
      const rgb = "128,136,152"

      // Ripples (the ringing phone)
      if (orbAlpha > 0.01) {
        const ripples = 5
        const maxR = size * 0.62 * scale
        for (let i = 0; i < ripples; i++) {
          const phase = (t * 0.3 + i / ripples) % 1
          const rad = 50 * scale + phase * maxR
          const alpha = (1 - phase) * (1 - phase) * (0.1 + 0.3 * ringing) * orbAlpha
          ctx.beginPath()
          ctx.arc(cx, cy, rad, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${rgb},${alpha})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }

        // Core pulses with each ring, then goes quiet
        const ringPulse = ringing > 0.4 ? Math.max(0, Math.sin(t * 9)) * Math.max(0, Math.sin(t * 2.2)) : 0
        const coreR = (46 + ringPulse * 8) * scale * (1 - answer * 0.5)

        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3)
        glow.addColorStop(0, `rgba(${rgb},${0.16 * orbAlpha})`)
        glow.addColorStop(1, `rgba(${rgb},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${0.32 * orbAlpha})`
        ctx.fill()
        ctx.strokeStyle = `rgba(${rgb},${0.55 * orbAlpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Answered state: a plain voice waveform, like a real call recording
      if (answer > 0.01) {
        const bars = 47
        const gap = 8 * (1 - settle * 0.25)
        const barW = 3
        const maxH = size * 0.17 * (1 - settle * 0.3)
        const startX = cx - ((bars - 1) * gap) / 2
        for (let i = 0; i < bars; i++) {
          const x = startX + i * gap
          const taper = Math.pow(Math.sin((Math.PI * i) / (bars - 1)), 1.2)
          const wob =
            (Math.sin(t * 3.1 + i * 0.45) * 0.5 + 0.5) *
            (Math.sin(t * 1.7 + i * 0.21) * 0.5 + 0.5)
          const bh = Math.max(3, (0.12 + wob * 0.88) * maxH * taper) * answer
          ctx.fillStyle = `rgba(238,240,246,${0.85 * answer})`
          ctx.fillRect(x - barW / 2, oy - bh / 2, barW, bh)
        }

        // Live-call chip neatly tucked under the waveform
        const chipY = oy + maxH / 2 + 22
        ctx.beginPath()
        ctx.arc(cx - 62, chipY, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(52,211,153,${answer})`
        ctx.fill()
        ctx.font = "500 12px ui-monospace, SFMono-Regular, Menlo, monospace"
        ctx.textBaseline = "middle"
        ctx.fillStyle = `rgba(212,212,216,${0.85 * answer})`
        const secs = Math.floor(t) % 60
        ctx.fillText(`Call answered · 00:${String(secs).padStart(2, "0")}`, cx - 50, chipY + 0.5)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section
      ref={trackRef}
      aria-label="OperinLabs story introduction"
      className="relative w-full bg-[#0F0F11]"
      style={{ height: "480vh" }}
    >
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
        {/* Ambient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 46%, rgba(255,255,255,0.04) 0%, transparent 70%), radial-gradient(125% 125% at 50% 50%, #0F0F11 60%, #08080a 100%)",
          }}
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        {/* ── Story beats ── */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          {/* A — The call */}
          <motion.div style={beatA} className="absolute max-w-2xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-[#3ca2fa]">2:07 AM · A clinic in Guwahati</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">A patient is calling.</h2>
            <p className="mt-5 text-base text-zinc-400 sm:text-lg">Their child has a fever. The front desk is closed.</p>
          </motion.div>

          {/* B — Nobody answers */}
          <motion.div style={beatB} className="absolute max-w-3xl">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Nobody picks up.</h2>
            <div className="mt-10 flex items-start justify-center gap-10 sm:gap-20">
              <div>
                <motion.div className="text-4xl font-semibold text-white sm:text-6xl tabular-nums">{patientsText}</motion.div>
                <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">patients to serve</p>
              </div>
              <div>
                <motion.div className="text-4xl font-semibold text-[#3ca2fa] sm:text-6xl tabular-nums">{missedText}</motion.div>
                <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">calls go unanswered</p>
              </div>
            </div>
          </motion.div>

          {/* C — The turn */}
          <motion.div
            style={beatC}
            className="absolute top-[63%] sm:top-[65%] max-w-2xl px-6 text-center"
          >
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Until now.</h2>
          </motion.div>

          {/* D — The answer */}
          <motion.div style={beatD} className="absolute bottom-[10vh] flex w-full max-w-4xl flex-col items-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[#3ca2fa]">Introducing OperinLabs</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your 24/7{" "}
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Autonomous AI Healthcare Team
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300/90 sm:text-base md:text-lg">
              Autonomous AI employees for clinics and hospitals — answering calls, scheduling appointments, and managing patient care 24/7 across 4 Indian languages.
            </p>
            <div className="pointer-events-auto mt-8">
              <Button
                size="lg"
                className="group gap-2.5 rounded-full bg-blue-600 px-7 py-5 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(59,130,246,0.6)] cursor-pointer"
              >
                Talk to your receptionist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-6 text-xs tracking-wide text-zinc-500 sm:text-[13px]">
              Piloting in 6+ hospitals · Assamese, Bengali, Hindi &amp; English · 24/7 availability
            </p>
          </motion.div>
        </div>

        {/* Scroll hint + progress */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">Scroll</p>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-[#3ca2fa] to-transparent" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-white/5">
          <motion.div style={{ width: barWidth }} className="h-full bg-[#3ca2fa]/70" />
        </div>
      </div>
    </section>
  )
}

export default StoryHero
