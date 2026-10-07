"use client";

import React from "react";
import { motion } from "framer-motion";
import { Headphones, RefreshCw, Mic, ShieldCheck } from "lucide-react";
import { OrganicCardSmall } from "@/components/ui/organic-card-small";

interface WorkforceRoleData {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  duties: string[];
  badge: string;
  isLive?: boolean;
}

const WORKFORCE_ROLES: WorkforceRoleData[] = [
  {
    number: "01",
    icon: Headphones,
    title: "AI Receptionist",
    subtitle: "The always-on front desk that never misses a call.",
    duties: [
      "Answers calls, WhatsApp messages, and patient queries 24×7 in Assamese, Bengali, Hindi & English",
      "Books and reschedules appointments",
      "Sends reminders and handles follow-ups",
    ],
    badge: "Live",
    isLive: true,
  },
  {
    number: "02",
    icon: RefreshCw,
    title: "AI Patient Care Coordinator",
    subtitle: "Keeps patients cared for between visits, without extra staff.",
    duties: [
      "Handles medication refill requests",
      "Manages day-to-day patient requests and operations",
      "Escalates to your team only when human help is genuinely needed",
    ],
    badge: "Coming live soon",
    isLive: false,
  },
  {
    number: "03",
    icon: Mic,
    title: "AI Scribe",
    subtitle: "Turns every visit into a finished note, automatically.",
    duties: [
      "Takes dictation during patient visits",
      "Generates clinical notes",
      "Handles documentation so doctors get time back from pen and paper",
    ],
    badge: "Coming live soon",
    isLive: false,
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "AI Claims Associate",
    subtitle: "Chases every claim so your front desk doesn't have to.",
    duties: [
      "Checks insurance eligibility and coverage before the visit",
      "Files and tracks claims with payers end-to-end",
      "Flags denials and follows up until they're resolved",
    ],
    badge: "Coming live soon",
    isLive: false,
  },
];

export function WorkforceSection() {
  return (
    <section
      id="workforce"
      aria-label="The Workforce"
      className="relative w-full bg-[#0F0F11] text-[#EEF0F6] pt-14 sm:pt-20 pb-16 sm:pb-22 px-6 sm:px-10 lg:px-14 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-start max-w-3xl mb-8 sm:mb-10">
          <div className="mb-3 text-[11px] font-mono font-bold tracking-[0.25em] text-[#3ca2fa] uppercase">
            THE WORKFORCE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Meet your AI team. Built for Healthcare.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl">
            OperinLabs is a team of AI employees that runs your clinic's front desk and patient care operations — around the clock.
          </p>
        </div>

        {/* ── 4 SYMMETRICAL ORGANIC CARDS BESIDE EACH OTHER ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch w-full">
          {WORKFORCE_ROLES.map((role, idx) => (
            <motion.div
              key={role.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex h-full w-full justify-center"
            >
              <OrganicCardSmall
                number={role.number}
                icon={role.icon}
                title={role.title}
                subtitle={role.subtitle}
                duties={role.duties}
                badge={role.badge}
                isLive={role.isLive}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkforceSection;
