"use client";

import { Headphones } from "lucide-react";
import { OrganicCardSmall } from "@/components/ui/organic-card-small";

export default function OrganicCardSmallDemo() {
  return (
    <div>
      <div className="mx-auto max-w-sm px-4 sm:px-0">
        <OrganicCardSmall
          number="01"
          icon={Headphones}
          title="AI Receptionist"
          subtitle="The always-on front desk that never misses a call."
          duties={[
            "Answers calls, WhatsApp messages, and patient queries 24×7 in Assamese, Bengali, Hindi & English",
            "Books and reschedules appointments",
            "Sends reminders and handles follow-ups",
          ]}
          badge="Live"
          isLive={true}
        />
      </div>
    </div>
  );
}
