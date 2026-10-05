"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function LampLightBar() {
  return (
    <div className="absolute top-0 isolate z-10 flex w-full flex-1 items-start justify-center overflow-hidden pointer-events-none h-[440px]">
      {/* 1. Backdrop blur from original component */}
      <div className="absolute top-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md pointer-events-none" />

      {/* 2. Main glow from original component */}
      <div className="absolute inset-auto z-50 h-36 w-[28rem] translate-y-8 rounded-full bg-primary/60 opacity-80 blur-3xl pointer-events-none" />

      {/* 3. Lamp effect from original component */}
      <motion.div
        initial={{ width: "8rem" }}
        animate={{ width: "16rem" }}
        transition={{ ease: "easeInOut", delay: 0.1, duration: 0.8 }}
        className="absolute top-0 z-30 h-36 -translate-y-7 rounded-full bg-primary/60 blur-2xl pointer-events-none"
      />

      {/* 4. Top line from original component */}
      <motion.div
        initial={{ width: "15rem" }}
        animate={{ width: "30rem" }}
        transition={{ ease: "easeInOut", delay: 0.1, duration: 0.8 }}
        className="absolute top-0 z-50 h-[2px] translate-y-0.5 bg-primary/80 shadow-[0_0_15px_#2563eb]"
      />

      {/* 5. Left gradient cone from original component */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        animate={{ opacity: 1, width: "30rem" }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(from 70deg at 50% 0%, rgba(37, 99, 235, 0.6) 0%, rgba(37, 99, 235, 0) 50%, rgba(37, 99, 235, 0) 100%)`,
        }}
        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] pointer-events-none"
      >
        <div
          className="absolute w-[100%] left-0 bg-background h-40 bottom-0 z-20 pointer-events-none"
          style={{
            WebkitMaskImage: "linear-gradient(to top, white, transparent)",
            maskImage: "linear-gradient(to top, white, transparent)",
          }}
        />
        <div
          className="absolute w-40 h-[100%] left-0 bg-background bottom-0 z-20 pointer-events-none"
          style={{
            WebkitMaskImage: "linear-gradient(to right, white, transparent)",
            maskImage: "linear-gradient(to right, white, transparent)",
          }}
        />
      </motion.div>

      {/* 6. Right gradient cone from original component */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        animate={{ opacity: 1, width: "30rem" }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(from 290deg at 50% 0%, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0) 50%, rgba(37, 99, 235, 0.6) 100%)`,
        }}
        className="absolute inset-auto left-1/2 h-56 w-[30rem] pointer-events-none"
      >
        <div
          className="absolute w-40 h-[100%] right-0 bg-background bottom-0 z-20 pointer-events-none"
          style={{
            WebkitMaskImage: "linear-gradient(to left, white, transparent)",
            maskImage: "linear-gradient(to left, white, transparent)",
          }}
        />
        <div
          className="absolute w-[100%] right-0 bg-background h-40 bottom-0 z-20 pointer-events-none"
          style={{
            WebkitMaskImage: "linear-gradient(to top, white, transparent)",
            maskImage: "linear-gradient(to top, white, transparent)",
          }}
        />
      </motion.div>
    </div>
  )
}
