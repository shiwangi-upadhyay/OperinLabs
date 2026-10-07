"use client";

import React, { useId, useState } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const PATH_IDLE =
  "M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0Z";
const PATH_HOVER =
  "M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 111 536.529 111L570.988 111C574.377 111 581.301 111 588.875 111H650C661.046 111 670 102.046 670 91Z";

const STROKE_PATH_IDLE =
  "M0 0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0L670 0";
const STROKE_PATH_HOVER =
  "M0 0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 111 536.529 111L570.988 111C574.377 111 581.301 111 588.875 111H650C661.046 111 670 102.046 670 91L670 0";

const SURFACE_DARK = "#16161D";

const SILHOUETTE_SHADOW =
  "drop-shadow(0px 6px 16px rgba(0,0,0,0.5))";
const SILHOUETTE_SHADOW_HOVER =
  "drop-shadow(0px 10px 24px rgba(0,0,0,0.65))";

export interface OrganicCardSmallProps {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  duties: string[];
  badge: string;
  isLive?: boolean;
  className?: string;
  surfaceColor?: string;
}

export function OrganicCardSmall({
  number,
  icon: Icon,
  title,
  subtitle,
  duties,
  badge,
  isLive = false,
  className,
  surfaceColor = SURFACE_DARK,
}: OrganicCardSmallProps) {
  const reduceMotion = useReducedMotion();
  const cardTitleId = useId();
  const [pointerOver, setPointerOver] = useState(false);
  const [focused, setFocused] = useState(false);
  const interactiveActive = pointerOver || focused;

  const pathTransition = reduceMotion
    ? { duration: 0.12, ease: [0.23, 1, 0.32, 1] as const }
    : { type: "spring" as const, duration: 0.42, bounce: 0 };

  return (
    <motion.div
      aria-labelledby={cardTitleId}
      tabIndex={0}
      role="article"
      className={cn(
        "group/calloutCard relative flex h-full w-full flex-col cursor-pointer",
        "outline-none transition-transform duration-300",
        "focus-visible:ring-1 focus-visible:ring-[#3ca2fa]/30 focus-visible:rounded-3xl",
        className
      )}
      data-state={interactiveActive ? "active" : "idle"}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onMouseEnter={() => setPointerOver(true)}
      onMouseLeave={() => setPointerOver(false)}
      whileHover={reduceMotion ? undefined : { y: -5 }}
    >
      {/* Outer Silhouette Shell with drop-shadow following the alpha cutout */}
      <div
        className={cn(
          "isolate w-full h-full flex flex-col justify-between transition-[filter] duration-300 ease-out",
          reduceMotion && "transition-none"
        )}
        style={{
          filter: interactiveActive
            ? SILHOUETTE_SHADOW_HOVER
            : SILHOUETTE_SHADOW,
        }}
      >
        {/* Card Upper Body (Rounded Top) */}
        <div
          className={cn(
            "flex w-full flex-1 flex-col justify-between rounded-t-3xl p-6 sm:p-7 text-[#EEF0F6]",
            "border-t border-l border-r transition-colors duration-300",
            interactiveActive ? "border-[#3ca2fa]/30" : "border-white/[0.08]"
          )}
          style={{ backgroundColor: surfaceColor }}
        >
          <div>
            {/* Top Bar: Circular Cyan Icon + Large Faint Watermark Number */}
            <div className="flex items-start justify-between mb-6">
              <div className="size-11 rounded-full bg-[#3ca2fa]/15 border border-[#3ca2fa]/35 flex items-center justify-center text-[#3ca2fa] group-hover/calloutCard:scale-105 transition-transform duration-300">
                <Icon className="size-5 stroke-[2] text-[#3ca2fa]" />
              </div>
              <span className="font-serif text-4xl sm:text-5xl font-light text-white/[0.08] select-none tracking-tight group-hover/calloutCard:text-white/[0.15] transition-colors duration-300">
                {number}
              </span>
            </div>

            {/* Title */}
            <h3
              className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug"
              id={cardTitleId}
            >
              {title}
            </h3>

            {/* Subtitle */}
            <p className="mb-6 text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Duties & Responsibilities Subheading */}
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#3ca2fa] font-bold mb-3.5">
              DUTIES &amp; RESPONSIBILITIES
            </div>

            {/* Duties Checklist */}
            <div className="flex flex-col gap-3 mb-4">
              {duties.map((duty, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300 leading-relaxed"
                >
                  <Check className="size-4 text-[#3ca2fa] shrink-0 mt-0.5 stroke-[2.2]" />
                  <span>{duty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Organic Cutout SVG with Animated Morphing Path & Perimeter Border */}
        <div className="relative w-full shrink-0 -mt-px">
          <svg
            aria-hidden
            className="w-full h-[70px] sm:h-[82px] block shrink-0 overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 670 111"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Card footer cutout silhouette</title>
            {/* Fill surface */}
            <motion.path
              animate={{ d: interactiveActive ? PATH_HOVER : PATH_IDLE }}
              fill={surfaceColor}
              stroke="none"
              initial={false}
              transition={pathTransition}
            />
            {/* Outer perimeter border stroke (reaches the whole sides and bottom of the card) */}
            <motion.path
              animate={{
                d: interactiveActive ? STROKE_PATH_HOVER : STROKE_PATH_IDLE,
                stroke: interactiveActive ? "rgba(60,162,250,0.30)" : "rgba(255,255,255,0.08)",
              }}
              fill="none"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={false}
              transition={pathTransition}
            />
          </svg>

          {/* Status Badge anchored on the bottom-left */}
          <div className="absolute bottom-3 sm:bottom-3.5 left-6 sm:left-7 pointer-events-none">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-blue-500/35 bg-blue-500/15 text-xs font-semibold text-blue-300 shadow-sm">
                <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Live</span>
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-zinc-400 shadow-sm">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OrganicCardSmall;
