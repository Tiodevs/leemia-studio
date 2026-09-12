"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const EASE = {
  expo: "expo.out",
  quart: "power4.inOut",
  soft: "power3.out",
} as const;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Splits an element into masked lines ready to be animated with `yPercent`.
 * Returns the line elements plus a revert function for cleanup.
 */
export function splitLines(target: Element) {
  const split = SplitText.create(target, {
    type: "lines",
    linesClass: "split-line",
    mask: "lines",
    autoSplit: true,
  });

  return split;
}
