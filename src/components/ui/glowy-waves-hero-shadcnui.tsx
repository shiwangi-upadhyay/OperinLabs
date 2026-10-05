"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlickerLamp } from "@/components/ui/flicker-lamp"
import { GlowyWavesCanvas } from "@/components/hero/glowy-waves-canvas"

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
  return (
    <section
      className="relative isolate flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-background pt-16 sm:pt-20 pb-20"
      role="region"
      aria-label="Glowing waves hero section"
    >
      {/* 1. Interactive Canvas Background (Base z-0) */}
      <GlowyWavesCanvas />

      {/* 2. Cinematic Overhead Flicker Lamp */}
      <FlickerLamp />

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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
