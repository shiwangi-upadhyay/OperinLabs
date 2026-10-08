"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselItem {
  id: string
  title: string
  description: string
  tag?: string
  icon?: React.ComponentType<{ className?: string }>
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
  let diff = (index - activeIndex) % total
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total

  const absDiff = Math.abs(diff)

  if (absDiff === 0) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 25,
      pointerEvents: "auto" as const,
    }
  }

  const sign = Math.sign(diff)
  return {
    x: sign * radiusX,
    y: radiusY,
    scale: 0.88,
    opacity: 0.38,
    zIndex: 10,
    pointerEvents: "auto" as const,
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
  const [internalIndex, setInternalIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [radii, setRadii] = useState({ rx: 170, ry: 18, w: 290, h: 420 })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const activeIndex = controlledIndex ?? internalIndex
  const total = items.length

  // Sized compactly to stay cleanly within the right column
  useEffect(() => {
    const updateRadii = () => {
      const w = window.innerWidth
      if (w >= 1280) {
        setRadii({ rx: 180, ry: 18, w: 300, h: 420 })
      } else if (w >= 1024) {
        setRadii({ rx: 150, ry: 16, w: 280, h: 410 })
      } else if (w >= 640) {
        setRadii({ rx: 130, ry: 14, w: 270, h: 400 })
      } else {
        setRadii({ rx: 80, ry: 10, w: 240, h: 380 })
      }
    }
    updateRadii()
    window.addEventListener("resize", updateRadii)
    return () => window.removeEventListener("resize", updateRadii)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex)
      }
      onActiveChange?.(newIndex)
    },
    [total, controlledIndex, onActiveChange],
  )

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

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

  const handleCardClick = (index: number) => {
    let diff = (index - activeIndex) % total
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 1) next()
    else if (diff === -1) prev()
    else goTo(index)
  }

  const halfW = radii.w / 2
  const halfH = radii.h / 2

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
      {/* 3D Orbiting Stage */}
      <div className="relative h-[440px] sm:h-[460px] lg:h-[470px] w-full max-w-2xl flex items-center justify-center overflow-visible">
        {items.map((item, i) => {
          const pos = getItemPosition(i, activeIndex, total, radii.rx, radii.ry)
          const isActive = i === activeIndex
          const Icon = item.icon

          return (
            <motion.div
              key={item.id}
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
                onClick={() => handleCardClick(i)}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "w-full h-full cursor-pointer flex flex-col justify-between rounded-3xl border p-6 sm:p-7 text-left transition-all duration-300 select-none",
                  isActive
                    ? "border-[#3ca2fa]/35 bg-[#121217]/95 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)]"
                    : "border-white/[0.08] bg-[#121217]/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:border-white/20 hover:opacity-70",
                )}
              >
                {/* Minimal line icon in electric blue, directly on card */}
                {Icon && (
                  <div className="mb-4 sm:mb-5">
                    <Icon className="size-6 sm:size-7 text-[#3ca2fa] stroke-[1.75]" />
                  </div>
                )}

                {item.tag && !Icon && (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors mb-4 w-fit",
                      isActive
                        ? "bg-[#3ca2fa]/15 text-[#3ca2fa] border border-[#3ca2fa]/30"
                        : "bg-white/10 text-white/60 border border-white/5",
                    )}
                  >
                    {item.tag}
                  </span>
                )}

                {/* Body Content with balanced, sleek typography */}
                <div className="w-full flex flex-col my-auto">
                  <h3
                    className={cn(
                      "font-bold tracking-tight leading-snug mb-2 sm:mb-2.5 transition-colors",
                      isActive
                        ? "text-white text-lg sm:text-xl font-bold"
                        : "text-white/80 text-base sm:text-lg",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs sm:text-[13px] leading-relaxed mb-3.5 sm:mb-4 transition-colors font-normal",
                      isActive ? "text-[#AEB5CA]" : "text-zinc-500",
                    )}
                  >
                    {item.description}
                  </p>

                  {/* Highlights Bullet List without tick icons */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {item.highlights.map((point, pIdx) => (
                        <p
                          key={pIdx}
                          className={cn(
                            "text-[11px] sm:text-xs leading-relaxed transition-colors",
                            isActive ? "text-[#CBD5E1]/90" : "text-zinc-500",
                          )}
                        >
                          {point}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Controls & Exactly 3 Dots */}
      <div className="flex items-center gap-4 sm:gap-5 mt-4 z-20">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous principle"
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/15 hover:text-white transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="size-4 sm:size-5" />
        </button>

        {/* Exactly 3 Dot indicators matching the 3 cards */}
        <div className="flex items-center gap-2" role="tablist">
          {items.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex
                  ? "w-7 bg-[#3ca2fa]"
                  : "w-2 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next principle"
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/15 hover:text-white transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}

export default CircularCarousel
