import React from "react"

export interface NodeItem {
  id: number
  key: "receptionist" | "coordinator" | "scribe" | "claims" | string
  title: string
  subtitle: string
  badge: "Live" | "Coming live soon" | string
  icon: React.ElementType
  description: string
  pills: string[]
  duties?: string[]
}

export type ReceptionistTab = "chat" | "voice"
