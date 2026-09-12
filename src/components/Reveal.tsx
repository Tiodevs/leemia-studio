"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { EASE, SplitText, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type RevealTextProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
};

/** Reveals text line by line from behind a mask when it scrolls into view. */
export function RevealText({
  as: Tag = "p",
  className,
  children,
  delay = 0,
}: RevealTextProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1,
            delay,
            stagger: 0.08,
            ease: EASE.expo,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }),
      });

      gsap.set(el, { visibility: "visible" });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <Tag ref={root} data-anim="hidden" className={className}>
      {children}
    </Tag>
  );
}

type RevealProps = {
  className?: string;
  children: ReactNode;
  /** Selector for children to stagger; defaults to direct children. */
  stagger?: number;
  y?: number;
};

/** Fades and lifts a group of elements into view, one after another. */
export function RevealGroup({
  className,
  children,
  stagger = 0.09,
  y = 28,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }

      gsap.set(el, { visibility: "visible" });
      gsap.from(Array.from(el.children), {
        y,
        autoAlpha: 0,
        duration: 0.9,
        stagger,
        ease: EASE.expo,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} data-anim="hidden" className={className}>
      {children}
    </div>
  );
}

/** Draws a horizontal hairline in from the left as it enters the viewport. */
export function RevealLine({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(root.current, {
        scaleX: 0,
        duration: 1.2,
        ease: EASE.expo,
        scrollTrigger: { trigger: root.current, start: "top 92%" },
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`h-px w-full origin-left bg-ink-line ${className ?? ""}`}
    />
  );
}
