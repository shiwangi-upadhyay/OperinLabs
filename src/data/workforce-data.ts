import { Mic, RefreshCw, FileAudio, ShieldCheck } from "lucide-react"
import { NodeItem } from "@/types/workforce"

export const NODES_DATA: NodeItem[] = [
  {
    id: 0,
    key: "receptionist",
    title: "AI Receptionist",
    subtitle: "Front desk",
    badge: "Live",
    icon: Mic,
    description:
      "Answers every call and WhatsApp message, books and reschedules appointments, and passes anything clinical to your staff.",
    pills: ["Calls and WhatsApp", "Booking", "Four languages", "Escalation to staff"],
  },
  {
    id: 1,
    key: "coordinator",
    title: "AI Patient Care Coordinator",
    subtitle: "Between visits",
    badge: "Coming live soon",
    icon: RefreshCw,
    description:
      "Keeps patients cared for between visits, without extra staff.",
    pills: ["Reminders", "Discharge check-ins", "Follow-up booking", "Care triage"],
    duties: [
      "Handles medication refill requests",
      "Manages day-to-day patient requests and operations",
      "Escalates to your team only when human help is genuinely needed",
    ],
  },
  {
    id: 2,
    key: "scribe",
    title: "Clinical AI Scribe",
    subtitle: "In the consultation",
    badge: "Coming live soon",
    icon: FileAudio,
    description:
      "Listens during consultations and generates complete clinical notes in real time.",
    pills: ["Ambient listening", "Structured notes", "Doctor signs off", "EHR sync"],
    duties: [
      "Ambient listening with real-time SOAP note drafting",
      "Formats symptoms, assessments, and treatment plans instantly",
      "Integrates directly with your EHR ready for physician sign-off",
    ],
  },
  {
    id: 3,
    key: "claims",
    title: "AI Claims Associate",
    subtitle: "After the visit",
    badge: "Coming live soon",
    icon: ShieldCheck,
    description:
      "Automates insurance verification, claim submissions, and reimbursement tracking.",
    pills: ["Eligibility checks", "Claim filing", "Payment follow-up", "Denial scrubbing"],
    duties: [
      "Instant patient insurance eligibility and coverage checks",
      "Automated claim scrubbing and pre-submission error checking",
      "Proactive follow-ups on unpaid claims and insurer queries",
    ],
  },
]
