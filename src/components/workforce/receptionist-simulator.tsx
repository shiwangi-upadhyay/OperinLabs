"use client"

import React, { useState, useEffect } from "react"
import { MessageSquare, Phone, Check, ArrowRight } from "lucide-react"
import { NodeItem, ReceptionistTab } from "@/types/workforce"

interface ReceptionistSimulatorProps {
  node: NodeItem
  inFocus: boolean
}

export function ReceptionistSimulator({ node, inFocus }: ReceptionistSimulatorProps) {
  const [activeTab, setActiveTab] = useState<ReceptionistTab>("chat")

  // Chat live states
  const [chatStep, setChatStep] = useState<number>(1)
  const [isChatConfirmed, setIsChatConfirmed] = useState<boolean>(false)
  const [showBookingPreview, setShowBookingPreview] = useState<boolean>(false)
  const [isConfirming, setIsConfirming] = useState<boolean>(false)
  const [isPopoverDissolving, setIsPopoverDissolving] = useState<boolean>(false)
  const [isChatFading, setIsChatFading] = useState<boolean>(false)
  const [chatLoop, setChatLoop] = useState<number>(0)

  // Voice call live states
  const [voiceSeconds, setVoiceSeconds] = useState<number>(1)
  const [voicePhase, setVoicePhase] = useState<number>(0)
  const [voiceLoop, setVoiceLoop] = useState<number>(0)
  const [isVoiceFading, setIsVoiceFading] = useState<boolean>(false)

  // ── 1. LIVE AI CHAT CHOREOGRAPHY ──
  useEffect(() => {
    if (!inFocus || activeTab !== "chat") {
      setIsChatFading(false)
      setChatStep(1)
      setShowBookingPreview(false)
      setIsConfirming(false)
      setIsPopoverDissolving(false)
      setIsChatConfirmed(false)
      return
    }

    setIsChatFading(false)
    setChatStep(1)
    setShowBookingPreview(false)
    setIsConfirming(false)
    setIsPopoverDissolving(false)
    setIsChatConfirmed(false)

    const timers: NodeJS.Timeout[] = []

    timers.push(setTimeout(() => setChatStep(2), 1500))
    timers.push(setTimeout(() => setChatStep(3), 2500))
    timers.push(setTimeout(() => setChatStep(4), 4200))
    timers.push(setTimeout(() => setChatStep(5), 5400))
    timers.push(setTimeout(() => setChatStep(6), 6400))
    timers.push(setTimeout(() => setShowBookingPreview(true), 7600))
    timers.push(setTimeout(() => setIsConfirming(true), 9600))
    timers.push(setTimeout(() => setIsPopoverDissolving(true), 10200))
    timers.push(
      setTimeout(() => {
        setShowBookingPreview(false)
        setIsConfirming(false)
        setIsPopoverDissolving(false)
        setIsChatConfirmed(true)
      }, 10500)
    )
    timers.push(setTimeout(() => setIsChatFading(true), 14500))
    timers.push(setTimeout(() => setChatLoop((prev) => prev + 1), 15000))

    return () => timers.forEach(clearTimeout)
  }, [inFocus, activeTab, chatLoop])

  // ── 2. LIVE AI VOICE CALL CHOREOGRAPHY ──
  useEffect(() => {
    if (!inFocus || activeTab !== "voice") {
      setIsVoiceFading(false)
      setVoicePhase(0)
      setVoiceSeconds(1)
      return
    }

    setIsVoiceFading(false)
    setVoicePhase(0)
    setVoiceSeconds(1)

    const timers: NodeJS.Timeout[] = []
    const intervals: NodeJS.Timeout[] = []

    timers.push(
      setTimeout(() => {
        setVoicePhase(1)
        intervals.push(
          setInterval(() => {
            setVoiceSeconds((prev) => (prev < 8 ? prev + 1 : 8))
          }, 1000)
        )
      }, 1800)
    )

    timers.push(setTimeout(() => setVoicePhase(2), 5800))
    timers.push(setTimeout(() => setVoicePhase(3), 9200))
    timers.push(
      setTimeout(() => {
        setVoicePhase(4)
        setVoiceSeconds(8)
      }, 12200)
    )
    timers.push(setTimeout(() => setIsVoiceFading(true), 16000))
    timers.push(setTimeout(() => setVoiceLoop((prev) => prev + 1), 16500))

    return () => {
      timers.forEach(clearTimeout)
      intervals.forEach(clearInterval)
    }
  }, [inFocus, activeTab, voiceLoop])

  const isVoiceResolved = voicePhase >= 4

  return (
    <div className="w-full flex flex-col items-start">
      {/* Outer heading, description & capability pills */}
      <div className="w-full flex flex-col items-start mb-3">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">
          {node.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#AEB5CA] leading-relaxed mb-2.5">
          {node.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {node.pills.map((pill) => (
            <span
              key={pill}
              className="text-xs px-2.5 py-0.5 rounded-full border border-white/[0.12] bg-white/[0.03] text-zinc-300"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Clinical Preview Module (White Card) */}
      <div className="relative rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] text-[#171614] overflow-hidden w-full max-w-[490px]">
        {/* Mode Switcher Tabs + Live Status */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#F0EFEA]">
          <div className="inline-flex p-1 rounded-xl bg-[#F4F3F0] text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setActiveTab("chat")
                setChatLoop((k) => k + 1)
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "chat"
                  ? "bg-white text-[#171614] shadow-sm font-semibold"
                  : "text-[#6B6862] hover:text-[#171614]"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
              <span>AI Chat</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("voice")
                setVoiceLoop((k) => k + 1)
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "voice"
                  ? "bg-white text-[#171614] shadow-sm font-semibold"
                  : "text-[#6B6862] hover:text-[#171614]"
              }`}
            >
              <Phone className="h-3.5 w-3.5 text-blue-600" />
              <span>AI Voice Call</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-[#4A4843]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Live</span>
          </div>
        </div>

        {/* ── MODALITY 1: AI CHAT (Continuous Smooth Loop) ── */}
        {activeTab === "chat" && (
          <div
            className={`relative flex flex-col gap-2.5 min-h-[340px] transition-opacity duration-500 ${
              isChatFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center text-xs text-[#6B6862] pb-0.5">
              <span className="font-semibold text-[#171614] text-sm">Raj · Silchar</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-medium">
                WhatsApp
              </span>
            </div>

            {/* Message 1: Raj */}
            {chatStep >= 1 && (
              <div className="flex items-start gap-3 anim-smooth-slide">
                <div className="w-8 h-8 rounded-full bg-[#F4F3F0] flex items-center justify-center text-xs font-semibold text-[#4A4843] shrink-0 mt-0.5">
                  R
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#8A877F] mb-0.5">Raj</span>
                  <div className="text-xs sm:text-[13.5px] text-[#171614] leading-relaxed font-normal">
                    Aunty, doctor kolir slot ekhon ase ne?
                  </div>
                </div>
              </div>
            )}

            {/* Typing Indicator 1 */}
            {chatStep === 2 && (
              <div className="flex items-start gap-3 anim-smooth-slide">
                <div className="w-8 h-8 rounded-full bg-[#171614] flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                  O
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#8A877F] mb-0.5">OperinLabs</span>
                  <div className="flex items-center gap-1.5 h-6 px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/60 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            {/* Message 2: OperinLabs */}
            {chatStep >= 3 && (
              <div className="flex items-start gap-3 anim-smooth-slide">
                <div className="w-8 h-8 rounded-full bg-[#171614] flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                  O
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#8A877F] mb-0.5">OperinLabs</span>
                  <div className="text-xs sm:text-[13.5px] text-[#171614] leading-relaxed font-normal">
                    Kun doctor lagibo aponar?
                  </div>
                </div>
              </div>
            )}

            {/* Message 3: Raj */}
            {chatStep >= 4 && (
              <div className="flex items-start gap-3 anim-smooth-slide">
                <div className="w-8 h-8 rounded-full bg-[#F4F3F0] flex items-center justify-center text-xs font-semibold text-[#4A4843] shrink-0 mt-0.5">
                  R
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#8A877F] mb-0.5">Raj</span>
                  <div className="text-xs sm:text-[13.5px] text-[#171614] leading-relaxed font-normal">
                    Dr. Sharma, Medicine.
                  </div>
                </div>
              </div>
            )}

            {/* Typing Indicator 2 */}
            {chatStep === 5 && (
              <div className="flex items-start gap-3 anim-smooth-slide">
                <div className="w-8 h-8 rounded-full bg-[#171614] flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                  O
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#8A877F] mb-0.5">OperinLabs</span>
                  <div className="flex items-center gap-1.5 h-6 px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/60 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            {/* Message 4: OperinLabs */}
            {chatStep >= 6 && (
              <div className="flex items-start gap-3 anim-smooth-slide">
                <div className="w-8 h-8 rounded-full bg-[#171614] flex items-center justify-center text-xs font-semibold text-white shrink-0 mt-0.5">
                  O
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#8A877F] mb-0.5">OperinLabs</span>
                  <div className="text-xs sm:text-[13.5px] text-[#171614] leading-relaxed font-normal">
                    Ji ase! Kalir bikelir 4 baji slot ta khali ase. Aponar naam ta di dibo pare ne?
                  </div>
                </div>
              </div>
            )}

            {/* Confirmed Appointment Badge */}
            {isChatConfirmed && (
              <div className="mt-2 flex items-center anim-badge-pop">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F0EC] text-[#171614] text-xs font-medium shadow-sm">
                  <Check className="h-3.5 w-3.5 text-[#171614] stroke-[2.5]" />
                  <span>Appointment booked</span>
                </div>
              </div>
            )}

            {/* Floating Booking Preview Popover */}
            {showBookingPreview && !isChatConfirmed && (
              <div
                className={`absolute right-0 bottom-1 w-[260px] sm:w-[280px] rounded-2xl bg-[#171614] p-4 text-white shadow-[0_20px_45px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)] border border-white/10 z-20 ${
                  isPopoverDissolving ? "anim-fade-out" : "anim-smooth-pop"
                }`}
              >
                <div className="text-[10px] font-mono tracking-wider uppercase text-[#9CA3AF] mb-1">
                  BOOKING PREVIEW
                </div>
                <div className="text-sm font-medium text-white mb-3 leading-snug">
                  Tomorrow, 4:00 PM — Dr. Sharma
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsPopoverDissolving(true)
                    setTimeout(() => {
                      setShowBookingPreview(false)
                      setIsChatConfirmed(true)
                      setIsPopoverDissolving(false)
                    }, 280)
                  }}
                  className={`w-full py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 shadow cursor-pointer ${
                    isConfirming
                      ? "bg-blue-600 text-white scale-[0.97]"
                      : "bg-white text-[#171614] hover:bg-zinc-100"
                  }`}
                >
                  <span>{isConfirming ? "Confirming..." : "Confirm"}</span>
                  <ArrowRight
                    className={`h-3 w-3 ${
                      isConfirming ? "translate-x-1" : ""
                    } transition-transform duration-300`}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── MODALITY 2: AI VOICE CALL (Continuous Smooth Loop) ── */}
        {activeTab === "voice" && (
          <div
            className={`relative flex flex-col justify-between min-h-[340px] transition-opacity duration-500 ${
              isVoiceFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Caller Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F0EFEA]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F3F0] flex items-center justify-center text-sm font-semibold text-[#4A4843]">
                  P
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#171614]">
                    Priyanka · Guwahati
                  </div>
                  <div className="text-xs text-[#6B6862] flex items-center gap-1 mt-0.5">
                    <Phone className="h-3 w-3 text-blue-600" />
                    <span>+91 88••• ••526</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1F0EC] text-[10px] font-mono tracking-wider text-[#6B6862] uppercase font-semibold">
                  REMINDER CALL
                </span>
                <span className="font-mono text-xs text-[#6B6862] mt-1">
                  {voicePhase === 0
                    ? "Connecting..."
                    : isVoiceResolved
                    ? "00:08"
                    : `00:0${voiceSeconds}`}
                </span>
              </div>
            </div>

            {/* Center Section: Voice Animation + Spoken Dialogue */}
            <div className="my-auto py-8 flex flex-col items-center justify-center text-center">
              {/* Voice Visualizer */}
              {voicePhase === 0 ? (
                <div className="flex items-center justify-center gap-1.5 h-12 anim-smooth-fade">
                  {Array.from({ length: 11 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB]"
                      style={{
                        animation: `connectingPulse 1.2s ease-in-out ${idx * 0.08}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1.5 h-12 anim-smooth-fade">
                  {[14, 26, 18, 40, 22, 34, 18, 28, 14].map((h, idx) => (
                    <span
                      key={idx}
                      className="w-1.5 rounded-full bg-blue-600 transition-all duration-500"
                      style={{
                        height: isVoiceResolved ? `${Math.round(h * 0.42)}px` : `${h}px`,
                        opacity: isVoiceResolved ? 0.4 : 1,
                        animation: isVoiceResolved
                          ? "none"
                          : `waveformPulse 1.1s ease-in-out ${idx * 0.12}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Spoken Dialogue Text */}
              <div className="min-h-[76px] mt-4 flex flex-col items-center justify-center">
                {voicePhase === 0 && (
                  <div key="connecting" className="text-center anim-smooth-fade">
                    <span className="text-sm font-medium text-[#8A877F]">
                      Connecting...
                    </span>
                  </div>
                )}

                {voicePhase === 1 && (
                  <div
                    key="turn1"
                    className="text-center flex flex-col items-center anim-smooth-slide"
                  >
                    <span className="text-[11px] font-medium text-[#8A877F] uppercase tracking-wider mb-1.5">
                      OperinLabs
                    </span>
                    <p className="text-base sm:text-[16.5px] font-medium text-[#171614] max-w-[340px] leading-relaxed">
                      Hi Priyanka, this is a reminder for your appointment tomorrow at 10 AM with Dr. Das.
                    </p>
                  </div>
                )}

                {voicePhase === 2 && (
                  <div
                    key="turn2"
                    className="text-center flex flex-col items-center anim-smooth-slide"
                  >
                    <span className="text-[11px] font-medium text-[#8A877F] uppercase tracking-wider mb-1.5">
                      Priyanka
                    </span>
                    <p className="text-base sm:text-[16.5px] font-medium text-[#171614] max-w-[340px] leading-relaxed">
                      Yes, I'll be there! Can you send the clinic location to WhatsApp?
                    </p>
                  </div>
                )}

                {voicePhase === 3 && (
                  <div
                    key="turn3"
                    className="text-center flex flex-col items-center anim-smooth-slide"
                  >
                    <span className="text-[11px] font-medium text-[#8A877F] uppercase tracking-wider mb-1.5">
                      OperinLabs
                    </span>
                    <p className="text-base sm:text-[16.5px] font-medium text-[#171614] max-w-[340px] leading-relaxed">
                      Sure thing! Sending the clinic location and appointment pass to your WhatsApp now.
                    </p>
                  </div>
                )}

                {voicePhase >= 4 && (
                  <div
                    key="resolved"
                    className="flex flex-col items-center gap-2.5 anim-badge-pop"
                  >
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F1F0EC] text-xs font-semibold text-[#171614] shadow-sm">
                      <Check className="h-3.5 w-3.5 text-[#171614] stroke-[2.5]" />
                      <span>Reminder confirmed</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#DCFCE7] text-xs font-semibold text-[#15803D] border border-[#86EFAC]/50 shadow-sm anim-badge-pop [animation-delay:150ms]">
                      <MessageSquare className="h-3.5 w-3.5 text-[#16A34A] fill-[#16A34A]/20" />
                      <span>Details sent via WhatsApp</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
