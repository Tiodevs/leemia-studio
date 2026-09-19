"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

function hasGa() {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

function hasClarity() {
  return Boolean(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
}

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  if (hasGa()) {
    sendGAEvent("event", name, params ?? {});
  }

  if (hasClarity() && typeof window.clarity === "function") {
    window.clarity("event", name);
    if (!params) return;
    for (const [key, value] of Object.entries(params)) {
      window.clarity("set", key, String(value));
    }
  }
}

export function trackOpenBriefing() {
  trackEvent("open_briefing", { method: "cta" });
}

export function trackGenerateLead(params: {
  servicesCount: number;
  start: string;
  budget: string;
  team: string;
}) {
  trackEvent("generate_lead", {
    currency: "BRL",
    lead_source: "website_briefing",
    services_count: params.servicesCount,
    start: params.start || "n/a",
    budget: params.budget || "n/a",
    team: params.team || "n/a",
  });
}
