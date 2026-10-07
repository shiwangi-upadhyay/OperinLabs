"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const LANGS = [
  { id: "as", label: "Assamese", greeting: "নমস্কাৰ", patient: "মোক কালি এটা এপইণ্টমেণ্ট লাগে" },
  { id: "bn", label: "Bengali", greeting: "নমস্কার", patient: "আমার কাল একটা অ্যাপয়েন্টমেন্ট লাগবে" },
  { id: "hi", label: "Hindi", greeting: "नमस्ते", patient: "मुझे कल का अपॉइंटमेंट चाहिए" },
  { id: "en", label: "English", greeting: "Hello", patient: "I need an appointment tomorrow" },
]

export function LanguageSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % LANGS.length), 3200)
    return () => clearInterval(id)
  }, [paused])

  const lang = LANGS[active]

  return (
    <section
      aria-label="Speaks your patient's language"
      className="relative w-full overflow-hidden bg-[#0F0F11] px-6 py-16 sm:py-24"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 50%, #0F0F11 60%, #08080a 100%)",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-[#3ca2fa]"
        >
          It speaks like them
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl"
        >
          The patient never has to switch languages.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-5 max-w-2xl text-base text-zinc-400 sm:text-lg"
        >
          Native phonetics, not translation. The call is answered the way the patient speaks.
        </motion.p>

        {/* Greeting morph */}
        <div className="relative mt-16 flex h-28 w-full items-center justify-center sm:h-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute text-6xl font-light tracking-wide text-white sm:text-8xl"
            >
              {lang.greeting}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mini call transcript */}
        <div className="mt-10 w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-sm sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">Patient · {lang.label}</p>
                <p className="text-lg text-zinc-200 sm:text-xl">{lang.patient}</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#3ca2fa]">OperinLabs receptionist</p>
                <p className="text-sm text-zinc-300 sm:text-base">
                  Booked · Tomorrow, 10:30 AM · Confirmation sent by SMS
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Language selector */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {LANGS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                i === active
                  ? "border-[#3ca2fa]/60 bg-[#3ca2fa]/15 text-white"
                  : "border-white/10 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Bridge into the Workforce chapter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-14 sm:mt-16 flex flex-col items-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">Now meet the team behind the voice</p>
          <div className="mt-3 h-12 w-px bg-gradient-to-b from-[#3ca2fa] to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export default LanguageSection
