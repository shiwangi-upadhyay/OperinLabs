"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlickerLamp } from "@/components/ui/flicker-lamp"
import { GlowyWavesCanvas } from "@/components/hero/glowy-waves-canvas"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function GlowyWavesHero() {
  return (
    <section
      className="relative isolate flex h-screen h-[100dvh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-background pt-16 sm:pt-20 pb-20"
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

      {/* 4. Soft Text Contrast Buffer (Ensures 100% text legibility over glowing wave canvas) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-full max-w-4xl h-[420px] rounded-full blur-[90px] opacity-75"
          style={{
            background:
              "radial-gradient(circle, rgba(3,5,10,0.85) 0%, rgba(3,5,10,0.45) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* 5. Content Container (relative z-20, in front of the lamp light and contrast shield) */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Eyebrow Label: Simply Introducing */}
          <motion.div
            variants={itemVariants}
            className="mb-4 text-xs sm:text-[13px] font-semibold tracking-widest text-blue-400 uppercase"
          >
            Introducing
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

          {/* Subtitle (Concise 2-line high-impact value prop) */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-9 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-300/90 leading-relaxed font-normal"
          >
            Autonomous AI employees for clinics and hospitals — answering calls, scheduling appointments, and managing patient care 24/7 across 4 Indian languages.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="group relative w-full sm:w-auto gap-2.5 rounded-full bg-blue-600 px-7 py-5 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(59,130,246,0.6)] transition-all cursor-pointer"
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

      {/* 6. Horizontal Base Trust & Capability Indicators (Transparent, No BG, Blue Tick Icons) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-3 px-6 pointer-events-auto"
      >
        {/* 1. Piloting in 6+ hospitals */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-[13.5px] font-medium text-zinc-300 tracking-wide">
          <Check className="h-4 w-4 text-blue-400 stroke-[2.5] shrink-0" aria-hidden="true" />
          <span>Piloting in 6+ hospitals</span>
        </div>

        {/* 2. Assamese, Bengali, Hindi & English */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-[13.5px] font-medium text-zinc-300 tracking-wide">
          <Check className="h-4 w-4 text-blue-400 stroke-[2.5] shrink-0" aria-hidden="true" />
          <span>Assamese, Bengali, Hindi &amp; English</span>
        </div>

        {/* 3. 24/7 availability */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-[13.5px] font-medium text-zinc-300 tracking-wide">
          <Check className="h-4 w-4 text-blue-400 stroke-[2.5] shrink-0" aria-hidden="true" />
          <span>24/7 availability</span>
        </div>
      </motion.div>
    </section>
  )
}
