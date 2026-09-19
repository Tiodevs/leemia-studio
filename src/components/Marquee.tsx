"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const ITEMS = [
  "Sistemas Web",
  "IA aplicada",
  "Landing Pages",
  "Sites Institucionais",
  "Automação",
  "Design de Interface",
];

export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const track = root.current?.querySelector("[data-marquee-track]");
      if (!track) return;

      let loop: gsap.core.Tween | null = null;
      const startLoop = () => {
        if (loop) return;
        loop = gsap.to(track, {
          xPercent: -50,
          duration: 26,
          repeat: -1,
          ease: "none",
        });
      };

      const onInteract = () => startLoop();
      window.addEventListener("pointerdown", onInteract, { once: true });
      const loopTimeout = window.setTimeout(startLoop, 12000);

      // Scroll direction flips the marquee, and scrolling speeds it up.
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (self.getVelocity() !== 0) startLoop();
          if (!loop) return;
          const velocity = Math.min(Math.abs(self.getVelocity()) / 400, 4);
          loop.timeScale(self.direction * (1 + velocity));
        },
      });

      return () => {
        window.removeEventListener("pointerdown", onInteract);
        window.clearTimeout(loopTimeout);
        st.kill();
        loop?.kill();
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="hairline relative overflow-hidden border-b border-b-ink-line py-5"
      aria-hidden="true"
    >
      <div data-marquee-track className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-8 px-8 text-sm tracking-[0.14em] whitespace-nowrap text-bone-dim uppercase"
              >
                {item}
                <span className="text-cyan">+</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
