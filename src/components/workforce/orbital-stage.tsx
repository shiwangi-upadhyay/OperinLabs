"use client"

import React from "react"
import { NodeItem } from "@/types/workforce"

interface OrbitalStageProps {
  nodes: NodeItem[]
  activeStep: number
  onNodeClick: (index: number) => void
  glowRef: React.RefObject<HTMLDivElement | null>
  dialRef: React.RefObject<SVGEllipseElement | null>
  ringRef: React.RefObject<SVGEllipseElement | null>
  innerRef: React.RefObject<SVGEllipseElement | null>
  cometRef: React.RefObject<HTMLDivElement | null>
  tickRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  ballRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  labelRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export function OrbitalStage({
  nodes,
  activeStep,
  onNodeClick,
  glowRef,
  dialRef,
  ringRef,
  innerRef,
  cometRef,
  tickRefs,
  ballRefs,
  labelRefs,
}: OrbitalStageProps) {
  return (
    <>
      {/* ── 1. Diffuse Ambient Backlight Pool ── */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 pointer-events-none"
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.22), rgba(37,99,235,0.06) 55%, transparent 100%)",
        }}
      />

      {/* ── 2. SVG Pure Mathematical Oval Curves ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Outer Dial Track */}
        <ellipse
          ref={dialRef}
          cx="0"
          cy="0"
          rx="0"
          ry="0"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />

        {/* Main Solid Oval Track */}
        <ellipse
          ref={ringRef}
          cx="0"
          cy="0"
          rx="0"
          ry="0"
          fill="none"
          stroke="rgba(59, 130, 246, 0.35)"
          strokeWidth="1.5"
          style={{
            filter: "drop-shadow(0 0 12px rgba(37, 99, 235, 0.4))",
          }}
        />

        {/* Inner Dashed Dial Track */}
        <ellipse
          ref={innerRef}
          cx="0"
          cy="0"
          rx="0"
          ry="0"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>

      {/* 24 Perimeter Tick Dots */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            tickRefs.current[i] = el
          }}
          className="absolute left-0 top-0 w-[3px] h-[3px] rounded-full bg-white opacity-0 pointer-events-none"
        />
      ))}

      {/* Orbiting Comet Light Particle */}
      <div
        ref={cometRef}
        className="absolute left-0 top-0 w-2 h-2 rounded-full bg-white pointer-events-none shadow-[0_0_12px_3px_rgba(147,197,253,0.9),0_0_32px_8px_rgba(37,99,235,0.5)]"
      />

      {/* ── 3. The 4 AI Team Nodes on the Oval ── */}
      {nodes.map((node, i) => {
        const Icon = node.icon
        const isActive = activeStep === i
        return (
          <div
            key={node.id}
            ref={(el) => {
              ballRefs.current[i] = el
            }}
            className="absolute left-0 top-0 w-[56px] h-[56px] cursor-pointer will-change-transform"
            onClick={() => onNodeClick(i)}
          >
            {/* Spherical Glowing Glass Orb (Strict Obsidian & Cobalt Blue) */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? "shadow-[0_0_36px_rgba(37,99,235,0.7)]"
                  : "shadow-[0_0_20px_rgba(37,99,235,0.25)]"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 32% 26%, #FFFFFF 0%, #93c5fd 10%, #2563eb 46%, #0f172a 100%)",
                boxShadow:
                  "0 0 36px rgba(37,99,235,0.45), inset -6px -10px 18px rgba(0,0,0,0.45)",
              }}
            >
              <Icon className="h-5 w-5 text-white stroke-[2.2] drop-shadow-md" />

              {/* Status dot on live node */}
              {node.badge === "Live" && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-[#0A0E1A]" />
                </span>
              )}
            </div>

            {/* Node Label Pill (Always Upright) */}
            <div
              ref={(el) => {
                labelRefs.current[i] = el
              }}
              className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 origin-left whitespace-nowrap text-xs font-medium text-white px-3 py-1.5 rounded-full bg-[#0A0E1A]/85 border border-white/[0.12] backdrop-blur-md shadow-lg pointer-events-none"
            >
              {node.title}
            </div>
          </div>
        )
      })}
    </>
  )
}
