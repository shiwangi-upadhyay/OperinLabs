"use client"

import React from "react"
import { Check } from "lucide-react"
import { NodeItem } from "@/types/workforce"

interface RoleCardProps {
  node: NodeItem
}

export function RoleCard({ node }: RoleCardProps) {
  return (
    <div className="w-full flex flex-col max-w-[500px]">
      {/* Title */}
      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight mb-3.5">
        {node.title}
      </h3>

      {/* Subtitle / Description with generous bottom spacing */}
      <p className="text-sm sm:text-base text-[#AEB5CA] leading-relaxed mb-8">
        {node.description}
      </p>

      {/* Duties & Responsibilities Subheading */}
      <div className="text-[11px] font-mono uppercase tracking-widest text-blue-400/90 font-bold mb-5">
        DUTIES &amp; RESPONSIBILITIES
      </div>

      {/* Duties Bullet List with spacious gaps between items */}
      <div className="flex flex-col gap-4 sm:gap-5 mb-9">
        {node.duties?.map((duty) => (
          <div
            key={duty}
            className="flex items-start gap-3.5 text-sm sm:text-[15px] text-zinc-200 leading-relaxed font-normal"
          >
            <Check className="h-5 w-5 text-blue-400 shrink-0 stroke-[2.5] mt-0.5" />
            <span>{duty}</span>
          </div>
        ))}
      </div>

      {/* Status Badge */}
      <div>
        <span className="inline-flex items-center px-4 py-2 rounded-xl border border-white/[0.12] bg-white/[0.04] text-xs sm:text-[13px] font-medium text-zinc-300 backdrop-blur-sm shadow-sm">
          {node.badge}
        </span>
      </div>
    </div>
  )
}
