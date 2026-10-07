"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselItem {
  id: string
  title: string
  description: string
  tag?: string
  badge?: string
  highlights?: string[]
}

export interface CircularCarouselProps {
  items: CarouselItem[]
  activeIndex?: number
  onActiveChange?: (index: number) => void
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

function getItemPosition(
  index: number,
  activeIndex: number,
  total: number,
  radiusX: number,
  radiusY: number
) {
  // Compute circular difference in range [-total/2, total/2]
  let diff = (index - activeIndex) % total
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total

  const absDiff = Math.abs(diff)

  // 1. Center active card (slot 0)
  if (absDiff === 0) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
      pointerEvents: "auto" as const,
    }
  }

  // 2. Immediate flanking neighbors (slots -1 and +1)
  if (absDiff <= 1) {
    const sign = Math.sign(diff)
    return {
      x: sign * radiusX,
      y: radiusY,
      scale: 0.88,
      opacity: 0.45,
      zIndex: 15,
      pointerEvents: "auto" as const,
    }
  }

  // 3. Offstage buffer cards (slots <= -2 or >= +2)
  // Completely silent and invisible (opacity: 0) to ensure smooth wrapping
  const sign = Math.sign(diff || 1)
  return {
    x: sign * radiusX * 1.35,
    y: radiusY * 1.5,
    scale: 0.65,
    opacity: 0,
    zIndex: 0,
    pointerEvents: "none" as const,
  }
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: CircularCarouselProps) {
  const [internalTrackIndex, setInternalTrackIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [radii, setRadii] = useState({ rx: 420, ry: 30, w: 380, h: 460 })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // For 3 items, create a 6-item virtual loop to provide silent offstage wrapping buffers
  const trackItems = useMemo(() => {
    if (items.length === 3) {
      return [
        ...items.map(item => ({ ...item, virtualId: `${item.id}-a`, originalIndex: items.indexOf(item) })),
        ...items.map(item => ({ ...item, virtualId: `${item.id}-b`, originalIndex: items.indexOf(item) })),
      ]
    }
    return items.map((item, idx) => ({ ...item, virtualId: item.id, originalIndex: idx }))
  }, [items])

  const total = trackItems.length
  const trackIndex = controlledIndex !== undefined ? controlledIndex : internalTrackIndex

  // Responsive radii and vertically longer card dimensions
  useEffect(() => {
    const updateRadii = () => {
      const w = window.innerWidth
      if (w >= 1024) {
        setRadii({ rx: 420, ry: 30, w: 380, h: 460 })
      } else if (w >= 640) {
        setRadii({ rx: 320, ry: 24, w: 330, h: 430 })
      } else {
        setRadii({ rx: 170, ry: 16, w: 290, h: 400 })
      }
    }
    updateRadii()
    window.addEventListener("resize", updateRadii)
    return () => window.removeEventListener("resize", updateRadii)
  }, [])

  const goTo = useCallback(
    (targetOriginalIndex: number) => {
      setInternalTrackIndex(current => {
        const currentOriginal = current % items.length
        let diff = targetOriginalIndex - currentOriginal
        if (diff > items.length / 2) diff -= items.length
        if (diff < -items.length / 2) diff += items.length
        const nextIndex = ((current + diff) % total + total) % total
        onActiveChange?.(targetOriginalIndex)
        return nextIndex
      })
    },
    [items.length, total, onActiveChange],
  )

  const next = useCallback(() => {
    setInternalTrackIndex(current => {
      const nextIdx = (current + 1) % total
      onActiveChange?.(nextIdx % items.length)
      return nextIdx
    })
  }, [total, items.length, onActiveChange])

  const prev = useCallback(() => {
    setInternalTrackIndex(current => {
      const prevIdx = (current - 1 + total) % total
      onActiveChange?.(prevIdx % items.length)
      return prevIdx
    })
  }, [total, items.length, onActiveChange])

  useEffect(() => {
    if (!autoPlay || isHovered) return
    intervalRef.current = setInterval(next, autoPlayInterval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay, autoPlayInterval, isHovered, next])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    const el = containerRef.current
    el?.addEventListener("keydown", handler)
    return () => el?.removeEventListener("keydown", handler)
  }, [next, prev])

  const halfW = radii.w / 2
  const halfH = radii.h / 2
  const activeOriginalIndex = trackIndex % items.length

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Thesis carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex flex-col items-center justify-center outline-none select-none w-full",
        className,
      )}
    >
      {/* 1. Diffuse Floor Glow Pool Underneath Track */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.03) 55%, transparent 75%)",
          filter: "blur(52px)",
        }}
      />

      {/* 2. Panoramic Horizon Stage with Vertically Longer Cards */}
      <div className="relative h-[500px] sm:h-[530px] lg:h-[560px] w-full max-w-6xl">
        {trackItems.map((item, i) => {
          const pos = getItemPosition(i, trackIndex, total, radii.rx, radii.ry)
          const isActive = pos.scale === 1

          // Calculate offset relative to active card
          let diff = (i - trackIndex) % total
          if (diff > total / 2) diff -= total
          if (diff < -total / 2) diff += total

          const handleClick = () => {
            if (diff === -1) prev()
            else if (diff === 1) next()
            else if (diff === 0) {
              /* already active */
            } else {
              goTo(item.originalIndex)
            }
          }

          return (
            <motion.div
              key={item.virtualId}
              animate={{
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                opacity: pos.opacity,
                zIndex: pos.zIndex,
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                pointerEvents: pos.pointerEvents,
                transformOrigin: "center center",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -halfW,
                marginTop: -halfH,
                width: radii.w,
                height: radii.h,
              }}
            >
              <button
                type="button"
                onClick={handleClick}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "w-full h-full cursor-pointer flex flex-col justify-between rounded-2xl border p-6 sm:p-8 text-left transition-colors duration-200 select-none",
                  isActive
                    ? "border-blue-400/50 bg-gradient-to-b from-[#142038] via-[#0E1728] to-[#0A0E1A] shadow-[0_25px_60px_-12px_rgba(37,99,235,0.45),0_0_25px_rgba(59,130,246,0.22)]"
                    : "border-white/[0.08] bg-gradient-to-b from-[#0F1524] to-[#0A0E1A] shadow-[0_12px_30px_-5px_rgba(0,0,0,0.55)] hover:border-white/20 hover:bg-[#121A2C]",
                )}
              >
                {/* Header Tag - NO blue/green dots */}
                <div className="flex items-center justify-between w-full">
                  {item.tag && (
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider transition-colors duration-200",
                        isActive
                          ? "bg-blue-500/20 border border-blue-400/40 text-blue-300"
                          : "bg-white/10 text-white/50 border border-white/10",
                      )}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Body Content - Vertically elongated format */}
                <div className="w-full my-auto py-2 flex flex-col">
                  <h3
                    className={cn(
                      "font-bold leading-tight transition-colors duration-200",
                      isActive
                        ? "text-white text-xl sm:text-2xl"
                        : "text-white/75 text-lg sm:text-xl",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-xs sm:text-[13px] md:text-sm leading-relaxed transition-colors duration-200",
                      isActive ? "text-[#CBD5E1]" : "text-[#717A8C]",
                    )}
                  >
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-5 flex flex-col gap-2.5">
                      {item.highlights.map((point, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug transition-colors duration-200",
                            isActive ? "text-zinc-200" : "text-zinc-400",
                          )}
                        >
                          <Check
                            className={cn(
                              "h-4 w-4 shrink-0 stroke-[2.5] mt-0.5 transition-colors duration-200",
                              isActive ? "text-blue-400" : "text-zinc-600",
                            )}
                          />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Metric Badge - Clean text only, NO green dot */}
                {item.badge && (
                  <div className="w-full pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
                    <span
                      className={cn(
                        "truncate font-medium transition-colors duration-200",
                        isActive ? "text-blue-300" : "text-zinc-500"
                      )}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* 3. Navigation Controls - exactly 3 dots */}
      <div className="flex items-center gap-4 mt-10 z-20">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous principle"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white hover:border-white/25 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Exactly 3 Dot indicators matching the 3 cards */}
        <div className="flex items-center gap-2" role="tablist">
          {items.map((item, i) => {
            const isDotActive = activeOriginalIndex === i
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isDotActive}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  isDotActive
                    ? "w-8 bg-blue-500 shadow-[0_0_12px_#3b82f6]"
                    : "w-2 bg-white/20 hover:bg-white/40",
                )}
                aria-label={`Go to principle ${i + 1}: ${item.title}`}
              />
            )
          })}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next principle"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white hover:border-white/25 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default CircularCarousel
