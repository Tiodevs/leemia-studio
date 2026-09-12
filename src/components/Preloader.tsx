"use client";

import { useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { LogoMark } from "@/components/LogoMark";
import { useSite } from "@/components/SiteProvider";

const WORDS = ["Design", "Code", "AI Workflows"];

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const { finishIntro } = useSite();

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setGone(true);
        finishIntro();
        return;
      }

      // Written only when the intro actually finishes, so a double mount in
      // development (or an early reload) still shows the full sequence once.
      const seen = sessionStorage.getItem("leemia:intro") === "1";

      const meshLines = root.current?.querySelectorAll("[data-mesh-line]") ?? [];
      const frame = root.current?.querySelector("[data-mesh-frame]");

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          sessionStorage.setItem("leemia:intro", "1");
          setGone(true);
        },
      });

      // Start only once fonts are ready: playing through the first paint would
      // let a long frame skip most of the timeline.
      const armPlayback = () => {
        if (document.fonts && document.fonts.status !== "loaded") {
          document.fonts.ready.then(() => tl.play());
        } else {
          tl.play();
        }
      };

      if (seen) {
        tl.to(root.current, {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          onStart: finishIntro,
        });
        armPlayback();
        return;
      }

      tl.set(root.current, { autoAlpha: 1 })
        .from("[data-intro-frame]", {
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.7,
          ease: EASE.expo,
        })
        .fromTo(
          [frame, ...meshLines],
          { drawSVG: "50% 50%" },
          {
            drawSVG: "0% 100%",
            duration: 1.05,
            stagger: 0.09,
            ease: "power2.inOut",
          },
          0.15,
        )
        .from(
          "[data-intro-word]",
          {
            yPercent: 120,
            duration: 0.7,
            stagger: 0.07,
            ease: EASE.expo,
          },
          0.45,
        )
        .to(
          { v: 0 },
          {
            v: 100,
            duration: 1.35,
            ease: "power1.inOut",
            onUpdate() {
              const value = Math.round(
                (this.targets()[0] as { v: number }).v,
              );
              if (counter.current) {
                counter.current.textContent = String(value).padStart(3, "0");
              }
            },
          },
          0.15,
        )
        .to("[data-intro-bar]", { scaleX: 1, duration: 1.35, ease: "power1.inOut" }, 0.15)
        // Curtain lifts as vertical slats, revealing the hero underneath.
        .to(
          ["[data-intro-word]", "[data-intro-meta]"],
          { autoAlpha: 0, duration: 0.35, ease: "power2.out" },
          "+=0.15",
        )
        .to(
          "[data-intro-frame]",
          { scale: 1.35, autoAlpha: 0, duration: 0.8, ease: EASE.expo },
          "<",
        )
        .to(
          "[data-intro-slat]",
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.9,
            stagger: { each: 0.06, from: "start" },
            ease: EASE.quart,
            // Hand over as the curtain starts lifting, so the hero animates in
            // behind the slats instead of after them.
            onStart: finishIntro,
          },
          "<0.15",
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
        className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--gutter)] pb-8"
      >
        <span className="eyebrow">Leemia Studio</span>
        <div className="flex flex-1 items-center gap-4 px-6 md:px-10">
          <span className="relative h-px flex-1 bg-ink-line">
            <span
              data-intro-bar
              className="absolute inset-0 origin-left scale-x-0 bg-cyan"
            />
          </span>
        </div>
        <span
          ref={counter}
          className="font-mono text-xs tracking-[0.2em] text-bone tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
