"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Sparkles, Cpu, ShieldCheck, Zap, Check } from "lucide-react"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { LampLightBar } from "@/components/ui/lamp-light-bar"

type Point = {
  x: number
  y: number
}

interface WaveConfig {
  offset: number
  amplitude: number
  frequency: number
  color: string
  opacity: number
}

const highlightPills = [
  { label: "Sub-millisecond latency", icon: Zap },
  { label: "Multi-agent coordination", icon: Cpu },
  { label: "SOC-2 Type II Certified", icon: ShieldCheck },
]

const containerVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<Point>({ x: 0, y: 0 })
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    // Strict 2-3 color palette: Obsidian Base (#03050a) + Electric Blue (#2563eb / #3b82f6)
    const themeColors = {
      backgroundTop: "rgba(3, 5, 10, 1)",
      backgroundBottom: "rgba(5, 9, 20, 1)",
      wavePalette: [
        {
          offset: 0,
          amplitude: 75,
          frequency: 0.003,
          color: "rgba(37, 99, 235, 0.85)", // Primary Electric Blue
          opacity: 0.55,
        },
        {
          offset: Math.PI / 2,
          amplitude: 95,
          frequency: 0.0026,
          color: "rgba(59, 130, 246, 0.75)", // Lighter Electric Blue
          opacity: 0.45,
        },
        {
          offset: Math.PI,
          amplitude: 65,
          frequency: 0.0034,
          color: "rgba(29, 78, 216, 0.7)", // Deep Cobalt Blue
          opacity: 0.38,
        },
        {
          offset: Math.PI * 1.5,
          amplitude: 85,
          frequency: 0.0022,
          color: "rgba(96, 165, 250, 0.5)", // Soft Ice Blue Accent
          opacity: 0.3,
        },
        {
          offset: Math.PI * 2,
          amplitude: 60,
          frequency: 0.004,
          color: "rgba(147, 197, 253, 0.35)", // Subtle Ambient Blue Crest
          opacity: 0.22,
        },
      ] satisfies WaveConfig[],
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const mouseInfluence = prefersReducedMotion ? 10 : 65
    const influenceRadius = prefersReducedMotion ? 160 : 320
    const smoothing = prefersReducedMotion ? 0.04 : 0.08

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const recenterMouse = () => {
      const centerPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      mouseRef.current = centerPoint
      targetMouseRef.current = centerPoint
    }

    const handleResize = () => {
      resizeCanvas()
      recenterMouse()
    }

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY }
    }

    const handleMouseLeave = () => {
      recenterMouse()
    }

    resizeCanvas()
    recenterMouse()

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const drawWave = (wave: WaveConfig) => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.save()
      ctx.beginPath()

      for (let x = 0; x <= width; x += 4) {
        const dx = x - mouseRef.current.x
        const dy = height * 0.52 - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / influenceRadius)
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset)

        const y =
          height * 0.52 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEffect

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.lineWidth = 2.5
      ctx.strokeStyle = wave.color
      ctx.globalAlpha = wave.opacity
      ctx.shadowBlur = 30
      ctx.shadowColor = wave.color
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      time += 1

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing

      const width = window.innerWidth
      const height = window.innerHeight

      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, themeColors.backgroundTop)
      gradient.addColorStop(1, themeColors.backgroundBottom)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      themeColors.wavePalette.forEach(drawWave)

      animationId = window.requestAnimationFrame(animate)
    }

    animationId = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section
      className="relative isolate flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-background pt-16 sm:pt-20 pb-20"
      role="region"
      aria-label="Glowing waves hero section"
    >
      {/* 1. Interactive Canvas Background (Base z-0) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. Lamp Light Bar (z-10, shines on top of canvas and behind text) */}
      <LampLightBar />

      {/* 3. Atmospheric Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[360px] w-[360px] rounded-full bg-blue-500/[0.08] blur-[120px]" />
      </div>

      {/* 4. Content Container (relative z-20, in front of the lamp light) */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Badge Pill */}
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-950/30 px-3 py-1 text-[11px] font-medium tracking-wide text-blue-300 backdrop-blur-md shadow-[0_0_12px_rgba(37,99,235,0.15)]"
          >
            <Check className="h-3 w-3 text-blue-400 stroke-[2.5]" aria-hidden="true" />
            <span>Piloting in 6+ hospitals</span>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]"
          >
            Your 24/7{" "}
            <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Autonomous AI Healthcare Team
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-9 max-w-4xl text-sm sm:text-base md:text-lg text-zinc-300/90 leading-relaxed font-normal"
          >
            OperinLabs gives healthcare organisations an AI workforce for autonomous
            healthcare operations, starting with an agent that works around the
            clock, answering calls, booking appointments, sending reminders, and
            following up in Assamese, Bengali, Hindi, and English, turning
            conversations into decisions, actions, and completed workflows.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="group relative w-full sm:w-auto gap-2.5 rounded-full bg-blue-600 px-7 py-5 text-sm font-semibold tracking-wide text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)] transition-all"
            >
              Talk to your receptionist
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>

            {/* <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full border-white/[0.12] bg-white/[0.04] px-7 py-5 text-sm font-medium tracking-wide text-zinc-200 backdrop-blur-md hover:border-white/[0.25] hover:bg-white/[0.08] hover:text-white transition-all"
            >
              Explore Our Thesis
            </Button> */}
          </motion.div>

          {/* Highlight Pills */}
          {/* <motion.ul
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 text-xs tracking-wider text-zinc-300"
          >
            {highlightPills.map((pill) => {
              const Icon = pill.icon
              return (
                <li
                  key={pill.label}
                  className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-md shadow-sm hover:border-white/[0.18] transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-blue-400" />
                  <span>{pill.label}</span>
                </li>
              )
            })}
          </motion.ul> */}
        </motion.div>
      </div>
    </section>
  )
}
