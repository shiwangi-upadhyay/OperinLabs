"use client"

import React, { useEffect, useRef } from "react"

const SEQ: [number, number][] = [
  [0, 0],
  [0.35, 0.85],
  [0.42, 0.04],
  [0.62, 0.04],
  [0.66, 1],
  [0.74, 0.25],
  [0.98, 0.3],
  [1.03, 1],
  [1.1, 0.55],
  [1.16, 1],
]

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x))
const sm = (t: number) => t * t * (3 - 2 * t)

function flick(e: number) {
  if (e >= 1.16) return 1
  let v = 0
  for (const [s, x] of SEQ) {
    if (e >= s) v = x
  }
  return v
}

export function FlickerLamp() {
  const lampRef = useRef<HTMLDivElement>(null)
  const lampBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t0 = performance.now()
    let rafId: number

    const update = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      if (!W || !H) return

      const t = (performance.now() - t0) / 1000
      const fl = flick(t)

      const scrollY = window.scrollY || document.documentElement.scrollTop || 0
      const u = scrollY / H
      const lightOut = sm(clamp(u / 0.9, 0, 1))

      if (lampRef.current) {
        lampRef.current.style.opacity = `${fl * (1 - lightOut)}`
        lampRef.current.style.transform = `translateY(${-lightOut * 160}px)`
      }

      if (lampBoxRef.current) {
        const mob = W < 860
        lampBoxRef.current.style.width = `${mob ? W * 0.7 : Math.min(620, W * 0.44)}px`
      }

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={lampRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-0 will-change-transform"
      aria-hidden="true"
    >
      <div
        ref={lampBoxRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full will-change-transform"
        style={{ width: "560px" }}
      >
        {/* 1. Volumetric Conical Light Beam */}
        <div
          className="absolute top-0 left-[-90%] w-[280%] h-[92%]"
          style={{
            clipPath: "polygon(32.14% 0, 67.86% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(to bottom, rgba(214,224,255,0.34) 0%, rgba(170,190,255,0.16) 30%, rgba(140,165,255,0.06) 60%, rgba(140,165,255,0) 92%)",
            filter: "blur(18px)",
          }}
        />

        {/* 2. Top Ceiling Radial Glow */}
        <div
          className="absolute top-[-30%] left-[-40%] w-[180%] h-[80%]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(225,232,255,0.30), rgba(225,232,255,0) 70%)",
          }}
        />

        {/* 3. Floor Ambient Bounce Glow */}
        <div
          className="absolute bottom-[4%] left-[-70%] w-[240%] h-[22%]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(190,205,255,0.10), rgba(190,205,255,0) 70%)",
          }}
        />

        {/* 4. Horizontal Glowing LED Ceiling Strip */}
        <div
          className="absolute top-0 left-0 w-full h-1 rounded-b"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.6), #FFFFFF 20%, #FFFFFF 80%, rgba(255,255,255,0.6))",
            boxShadow:
              "0 0 12px 2px rgba(235,240,255,0.9), 0 0 50px 10px rgba(170,195,255,0.45)",
          }}
        />
      </div>
    </div>
  )
}
