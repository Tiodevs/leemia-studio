"use client";

import { useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { LogoMark } from "@/components/LogoMark";
import { useSite } from "@/components/SiteProvider";

const WORDS = ["Design", "Code", "IA aplicada"];

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const { finishIntro } = useSite();

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setGone(true);
        finishIntro();
        return;
      }

      const meshLines = root.current?.querySelectorAll("[data-mesh-line]") ?? [];
      const frame = root.current?.querySelector("[data-mesh-frame]");

      const setProgress = (progress: number) => {
        const value = Math.min(100, Math.round(progress * 100));
        if (counter.current) {
          counter.current.textContent = String(value).padStart(3, "0");
        }
        if (bar.current) {
          gsap.set(bar.current, { scaleX: progress });
        }
      };

      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => setProgress(tl.progress()),
        onComplete: () => {
          setProgress(1);
          setGone(true);
        },
      });

      const armPlayback = () => {
        if (document.fonts && document.fonts.status !== "loaded") {
          document.fonts.ready.then(() => tl.play());
        } else {
          tl.play();
        }
      };

      tl.set(root.current, { autoAlpha: 1 })
        .from("[data-intro-frame]", {
          scale: 0.72,
          autoAlpha: 0,
          duration: 0.55,
          ease: EASE.expo,
        })
        .fromTo(
          [frame, ...meshLines],
          { drawSVG: "50% 50%" },
          {
            drawSVG: "0% 100%",
            duration: 1.15,
            stagger: 0.08,
            ease: "power2.inOut",
          },
          0.08,
        )
        .from(
          "[data-intro-word]",
          {
            yPercent: 120,
            duration: 0.55,
            stagger: 0.06,
            ease: EASE.expo,
          },
          0.32,
        )
        .to(
          ["[data-intro-word]", "[data-intro-meta]"],
          { autoAlpha: 0, duration: 0.3, ease: "power2.out" },
          1.7,
        )
        .to(
          "[data-intro-frame]",
          { scale: 1.28, autoAlpha: 0, duration: 0.7, ease: EASE.expo },
          1.7,
        )
        .to(
          "[data-intro-slat]",
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.85,
            stagger: { each: 0.05, from: "start" },
            ease: EASE.quart,
            onStart: finishIntro,
          },
          1.85,
        );

      armPlayback();
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            data-intro-slat
            className="h-full flex-1 bg-ink"
            style={{ willChange: "transform" }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div data-intro-frame>
          <LogoMark animated className="h-20 w-24 text-cyan md:h-28 md:w-32" />
        </div>

        <div className="flex items-baseline gap-2 overflow-hidden md:gap-3">
          {WORDS.map((word, i) => (
            <span key={word} className="line-mask">
              <span
                data-intro-word
                className="inline-block text-xs tracking-[0.28em] text-bone-dim uppercase md:text-sm"
              >
                {word}
                {i < WORDS.length - 1 && (
                  <span className="ml-2 text-cyan md:ml-3">/</span>
                )}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div
        data-intro-meta
        className="absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-8"
      >
        <div className="flex items-end justify-between gap-6">
          <span className="eyebrow">Leemia</span>
          <span
            ref={counter}
            className="font-mono text-sm tracking-[0.22em] text-bone tabular-nums md:text-base"
          >
            000
          </span>
        </div>
        <div className="relative mt-4 h-[3px] w-full overflow-hidden bg-ink-line">
          <span
            ref={bar}
            className="absolute inset-0 origin-left scale-x-0 bg-cyan"
          />
        </div>
      </div>
    </div>
  );
}
