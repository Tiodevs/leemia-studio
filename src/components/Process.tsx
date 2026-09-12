"use client";

import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { RevealText } from "@/components/Reveal";
import { PROCESS } from "@/data/process";

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // The spine fills in as the reader moves through the steps.
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-steps]",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
        gsap.from(step.children, {
          y: 32,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: EASE.expo,
          scrollTrigger: { trigger: step, start: "top 84%" },
        });

        gsap.from(step.querySelector("[data-step-dot]"), {
          scale: 0,
          duration: 0.7,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: step, start: "top 84%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="processo"
      className="relative scroll-mt-24 bg-ink-soft py-24 md:py-36"
    >
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-4">04 — Processo</p>
          <RevealText
            as="h2"
            className="display display-lines text-[clamp(2rem,5.4vw,4.5rem)] md:col-span-8"
          >
            Do briefing ao deploy, sem caixa-preta.
          </RevealText>
        </div>

        <div data-steps className="relative mt-16 md:mt-24">
          <div
            className="pointer-events-none absolute top-2 left-[3px] h-full w-px bg-ink-line md:left-[calc(33.333%+3px)]"
            aria-hidden="true"
          >
            <div data-spine className="h-full w-full origin-top bg-cyan" />
          </div>

          <ol>
            {PROCESS.map((step) => (
              <li
                key={step.index}
                data-step
                className="relative grid gap-3 pb-14 pl-8 last:pb-0 md:grid-cols-12 md:gap-8 md:pb-20 md:pl-0"
              >
                <span
                  data-step-dot
                  className="absolute top-2 left-0 h-[7px] w-[7px] rounded-full bg-cyan md:left-[calc(33.333%)]"
                  aria-hidden="true"
                />

                <div className="md:col-span-4 md:pr-12">
                  <p className="font-mono text-[0.65rem] tracking-[0.2em] text-cyan">
                    {step.index} · {step.duration}
                  </p>
                </div>

                <div className="md:col-span-7 md:col-start-6">
                  <h3 className="display text-[clamp(1.5rem,3.2vw,2.5rem)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-bone-dim">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
