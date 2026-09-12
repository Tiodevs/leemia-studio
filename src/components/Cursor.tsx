"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Small trailing dot that swells over interactive elements. Desktop only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = dot.current;
    if (!el) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button']");
      gsap.to(el, {
        scale: interactive ? 3.4 : 1,
        opacity: interactive ? 0.35 : 1,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    gsap.set(el, { autoAlpha: 1, xPercent: -50, yPercent: -50 });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  });

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none invisible fixed top-0 left-0 z-[90] hidden h-2.5 w-2.5 rounded-full bg-cyan md:block"
    />
  );
}
