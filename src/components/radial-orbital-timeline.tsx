"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { NODES_DATA } from "@/data/workforce-data"
import { ReceptionistSimulator } from "@/components/workforce/receptionist-simulator"
import { RoleCard } from "@/components/workforce/role-card"
import { OrbitalStage } from "@/components/workforce/orbital-stage"

const TAU = Math.PI * 2
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const sm = (t: number) => t * t * (3 - 2 * t)
const adiff = (a: number, b: number) => ((((b - a) % TAU) + TAU + Math.PI) % TAU) - Math.PI

export function RadialOrbitalTimeline() {
  const secRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Direct DOM Refs for 60fps transform updates
  const glowRef = useRef<HTMLDivElement>(null)
  const dialRef = useRef<SVGEllipseElement>(null)
  const ringRef = useRef<SVGEllipseElement>(null)
  const innerRef = useRef<SVGEllipseElement>(null)
  const cometRef = useRef<HTMLDivElement>(null)
  const tickRefs = useRef<(HTMLDivElement | null)[]>([])
  const ballRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeStep, setActiveStep] = useState<number>(0)
  const [panelProgress, setPanelProgress] = useState<number>(0)
  const [isReceptionistInFocus, setIsReceptionistInFocus] = useState<boolean>(false)

  // Smooth scroll to targeted workforce node
  const handleNodeClick = useCallback((index: number) => {
    if (secRef.current) {
      const targetU = index === 0 ? 1.2 : 2.0 + (index - 1) * 1.0 + 0.5
      const targetScroll = secRef.current.offsetTop + targetU * window.innerHeight
      window.scrollTo({ top: targetScroll, behavior: "smooth" })
    }
  }, [])

  // 60FPS Orbital Loop & Scroll Choreography
  useEffect(() => {
    let rafId: number
    const sec = secRef.current
    const sticky = stickyRef.current
    if (!sec || !sticky) return

    const loop = () => {
      if (!sec || !sticky) return
      const W = sticky.clientWidth
      const H = sticky.clientHeight
      const mob = W < 860

      // Scroll progress relative to viewport height
      const rect = sec.getBoundingClientRect()
      const u = Math.max(0, -rect.top) / H

      // m: 0 to 1 during initial shift into the workforce dock
      const m = sm(clamp(u / 0.8, 0, 1))

      // f: 0 to 3 for the wheel rotation across the 4 nodes
      // Starts after Receptionist showcase (u >= 2.0) with generous 1.0vh per node
      const f = clamp((u - 2.0) / 1.0, 0, 3)
      const k = Math.floor(f)
      const fr = f - k
      const fe = k >= 3 ? 3 : k + sm(clamp((fr - 0.15) / 0.7, 0, 1))

      const t = performance.now() / 1000
      const speed = 1

      // ── TRUE MATHEMATICAL CIRCULAR ORBIT GEOMETRY ──
      // State 0 (Idle / Centered Circle - placed lower for spacious gap below heading):
      const r0 = mob ? Math.min(W * 0.36, H * 0.26) : Math.min(H * 0.30, W * 0.22, 260)
      const a0 = r0
      const b0 = r0 // TRUE CIRCLE (a0 = b0 = r0)
      const cx0 = W / 2
      const cy0 = mob ? H * 0.62 : H * 0.64

      // State 1 (Scrolled / Moved to right - ONLY HALF CIRCLE VISIBLE):
      let a1: number, b1: number, cx1: number, cy1: number, foc: number
      if (mob) {
        const r1 = Math.min(W * 0.55, 300)
        a1 = r1
        b1 = r1
        cx1 = W / 2
        cy1 = H * 0.82 + r1
        foc = -Math.PI / 2
      } else {
        const r1 = Math.min(H * 0.46, W * 0.34, 410)
        a1 = r1
        b1 = r1 // TRUE CIRCLE (a1 = b1 = r1)
        foc = Math.PI // 180° = 9 o'clock center-left focus point
        // cx1 placed so the leftmost point (cx1 - a1) is at W * 0.64,
        // placing center near/past right border so ONLY the left half-circle shows on screen
        cx1 = W * 0.64 + a1
        cy1 = H * 0.52
      }

      const a = lerp(a0, a1, m)
      const b = lerp(b0, b1, m)
      const cx = lerp(cx0, cx1, m)
      const cy = lerp(cy0, cy1, m)

      // 1. Update SVG Circle Curves (Pure mathematical circles, perfectly uniform radius)
      if (ringRef.current) {
        ringRef.current.setAttribute("cx", `${cx}`)
        ringRef.current.setAttribute("cy", `${cy}`)
        ringRef.current.setAttribute("rx", `${a}`)
        ringRef.current.setAttribute("ry", `${b}`)
      }
      if (dialRef.current) {
        dialRef.current.setAttribute("cx", `${cx}`)
        dialRef.current.setAttribute("cy", `${cy}`)
        dialRef.current.setAttribute("rx", `${a * 1.16}`)
        dialRef.current.setAttribute("ry", `${b * 1.16}`)
      }
      if (innerRef.current) {
        innerRef.current.setAttribute("cx", `${cx}`)
        innerRef.current.setAttribute("cy", `${cy}`)
        innerRef.current.setAttribute("rx", `${a * 0.72}`)
        innerRef.current.setAttribute("ry", `${b * 0.72}`)
      }

      // 2. Diffuse Backlight Glow Circle
      if (glowRef.current) {
        glowRef.current.style.width = `${2 * a * 1.2}px`
        glowRef.current.style.height = `${2 * b * 1.2}px`
        glowRef.current.style.borderRadius = "50%"
        glowRef.current.style.transform = `translate(${cx - a * 1.2}px, ${cy - b * 1.2}px)`
      }

      // 3. 24 Perimeter Tick Dots (Positioned exactly on the outer oval curve)
      tickRefs.current.forEach((el, i) => {
        if (!el) return
        const th = (i / 24) * TAU - Math.PI / 2
        const x = cx + a * 1.16 * Math.cos(th)
        const y = cy + b * 1.16 * Math.sin(th)
        const major = i % 6 === 0
        el.style.transform = `translate(${x - 1.5}px, ${y - 1.5}px) scale(${major ? 1.8 : 1})`
        el.style.opacity = `${major ? 0.85 : 0.28}`
      })

      // 4. Comet Particle Orbiting along the true ellipse
      if (cometRef.current) {
        const th = t * 0.35 * speed
        cometRef.current.style.transform = `translate(${cx + a * Math.cos(th) - 4}px, ${
          cy + b * Math.sin(th) - 4
        }px)`
      }

      // 5. The 4 AI Nodes (Idle Autonomous Drift + Scroll Lock)
      for (let i = 0; i < 4; i++) {
        const el = ballRefs.current[i]
        if (!el) continue

        // Continuous slow idle drift (t * 0.07)
        const thh = t * 0.07 * speed + (i * TAU) / 4 + Math.PI
        // Scroll target angle locking each node sequentially to 9 o'clock
        const tha = foc + ((i - fe) * TAU) / 4
        // Smooth transition from idle (m=0) to scroll target (m=1)
        const th = thh + adiff(thh, tha) * m

        const x = cx + a * Math.cos(th)
        const y = cy + b * Math.sin(th)
        const d = (Math.sin(th) + 1) / 2
        const focus = clamp(1 - Math.abs(i - fe), 0, 1)
        const s = lerp(0.72 + 0.28 * d, 0.65 + (mob ? 0.6 : 0.95) * focus, m)

        el.style.transform = `translate(${x - 28}px, ${y - 28}px) scale(${s})`
        el.style.opacity = `${lerp(0.7 + 0.3 * d, 0.5 + 0.5 * focus, m)}`
        el.style.zIndex = `${Math.round(d * 100) + (focus > 0.5 ? 150 : 0)}`

        // Counter-rotation on labels so they remain upright
        const lbl = labelRefs.current[i]
        if (lbl) {
          lbl.style.transform = `translateY(-50%) scale(${1 / s})`
          lbl.style.opacity = `${lerp(1, focus > 0.4 ? 0 : 0.8, m)}`
        }
      }

      // Sync active card state
      const currStep = u < 2.0 ? 0 : clamp(Math.round(fe), 0, 3)
      setActiveStep(currStep)
      const pProg = clamp((m - 0.35) / 0.65, 0, 1)
      setPanelProgress(pProg)

      // Only run simulation when AI Receptionist is visibly active & in focus
      const isReceptionistActive =
        rect.top <= 50 &&
        rect.bottom >= H * 0.4 &&
        pProg > 0.35 &&
        currStep === 0
      setIsReceptionistInFocus((prev) => (prev !== isReceptionistActive ? isReceptionistActive : prev))

      // Header transition (fades out and translates up on scroll)
      if (headerRef.current) {
        const ho = 1 - clamp(m * 2.4, 0, 1)
        headerRef.current.style.opacity = `${ho}`
        headerRef.current.style.transform = `translateY(${-m * 50}px)`
        headerRef.current.style.pointerEvents = ho > 0.5 ? "auto" : "none"
      }

      rafId = requestAnimationFrame(loop)
    }

    loop()
    window.addEventListener("scroll", loop, { passive: true })
    window.addEventListener("resize", loop, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", loop)
      window.removeEventListener("resize", loop)
    }
  }, [])

  return (
    <section
      ref={secRef}
      id="workforce"
      className="relative w-full shrink-0 flex-none bg-[#0F0F11] text-[#EEF0F6]"
      style={{ height: "650vh", minHeight: "650vh" }}
    >
      {/* Sticky Fullscreen Presentation Stage */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#0F0F11]"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 50%, #0F0F11 50%, #3ca2fa28 100%)",
        }}
      >
        {/* Orbital Stage (Glow, SVG Tracks, Ticks, Comet, and 4 Node Orbs) */}
        <OrbitalStage
          nodes={NODES_DATA}
          activeStep={activeStep}
          onNodeClick={handleNodeClick}
          glowRef={glowRef}
          dialRef={dialRef}
          ringRef={ringRef}
          innerRef={innerRef}
          cometRef={cometRef}
          tickRefs={tickRefs}
          ballRefs={ballRefs}
          labelRefs={labelRefs}
        />

        {/* Header Area (Top-Left Fixed, Fades Out on Scroll) */}
        <div
          ref={headerRef}
          className="absolute top-8 left-6 sm:left-12 lg:left-16 z-30 max-w-2xl pointer-events-none will-change-transform"
        >
          <div className="mb-2.5 text-[11px] font-semibold tracking-wider text-[#3ca2fa] uppercase pointer-events-auto">
            The workforce
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Meet your AI team.{" "}
            <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3ca2fa] bg-clip-text text-transparent">
              Built for Healthcare.
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#AEB5CA] leading-relaxed max-w-xl">
            OperinLabs is a team of AI employees that runs your clinic's front desk and patient care
            operations — around the clock.
          </p>
        </div>

        {/* Dynamic Detailed Clinical Workflow Cards (Left Corner, Vertically Centered) */}
        <div
          className="absolute inset-y-0 left-6 sm:left-12 lg:left-16 z-30 pointer-events-auto flex items-center justify-start w-[min(500px,calc(100vw-48px))]"
          style={{
            opacity: panelProgress,
            pointerEvents: panelProgress > 0.4 ? "auto" : "none",
          }}
        >
          <div className="relative w-full">
            {NODES_DATA.map((node, i) => {
              const isCurrent = activeStep === i
              const isPast = activeStep > i

              // Smooth directional gliding: current stays centered, past glides up, future glides down
              const translateY = isCurrent
                ? "translateY(0px)"
                : isPast
                ? "translateY(-32px)"
                : "translateY(32px)"

              return (
                <div
                  key={node.id}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === 0
                      ? "relative w-full flex flex-col items-start"
                      : "absolute inset-0 w-full flex flex-col justify-center items-start"
                  }`}
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: translateY,
                    pointerEvents: isCurrent ? "auto" : "none",
                    visibility: isCurrent || Math.abs(activeStep - i) <= 1 ? "visible" : "hidden",
                  }}
                >
                  {i === 0 ? (
                    <ReceptionistSimulator node={node} inFocus={isReceptionistInFocus} />
                  ) : (
                    <RoleCard node={node} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
