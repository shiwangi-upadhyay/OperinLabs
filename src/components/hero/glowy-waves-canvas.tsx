"use client"

import React, { useEffect, useRef } from "react"

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

export function GlowyWavesCanvas() {
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
        const dy = height * 0.60 - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / influenceRadius)
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset)

        const y =
          height * 0.60 +
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
