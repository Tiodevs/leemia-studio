"use client";

import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { MeshField } from "@/components/MeshField";
import { useSite } from "@/components/SiteProvider";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { openBrief, scrollTo, dictionary } = useSite();
  const t = dictionary.hero;

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-anim="hidden"]');
      gsap.set(targets, { visibility: "visible" });

      if (prefersReducedMotion()) return;

      gsap
        .timeline({ defaults: { ease: EASE.expo } })
        .from("[data-hero-line] > span", {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.09,
        })
        .from(
          "[data-hero-top] > *",
          { yPercent: 100, autoAlpha: 0, duration: 0.8, stagger: 0.08 },
          0.15,
        )
        .from(
          "[data-hero-body]",
          { y: 24, autoAlpha: 0, duration: 0.9 },
          0.55,
        )
        .from(
          "[data-hero-cta] > *",
          { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.1 },
          0.7,
        )
        .from("[data-hero-scroll]", { autoAlpha: 0, duration: 0.8 }, 0.9);
    },
    { scope: root, dependencies: [t.lines[0]] },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col justify-between gap-7 overflow-hidden pt-[calc(var(--header-h)+1.5rem)] pb-10 md:gap-10"
    >
      <MeshField className="pointer-events-none absolute inset-x-0 top-0 h-[130%] w-full opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_35%,var(--color-ink)_100%)]" />

      <div className="shell relative">
        <div
          data-hero-top
          data-anim="hidden"
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 overflow-hidden"
        >
          <p className="eyebrow">{t.eyebrow}</p>
          <p className="eyebrow text-cyan">{t.location}</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-7 md:contents">
        <div className="shell relative">
          <h1 className="display display-lines text-[clamp(3.15rem,min(14.5vw,16svh),9.5rem)]">
            {t.lines.slice(0, 2).map((line) => (
              <span
                key={line}
                data-hero-line
                data-anim="hidden"
                className="line-mask"
              >
                <span className="inline-block">{line}</span>
              </span>
            ))}
            <span data-hero-line data-anim="hidden" className="line-mask">
              <span className="inline-block text-cyan">{t.lines[2]}</span>
            </span>
          </h1>
        </div>

        <div className="shell relative grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <p
            data-hero-body
            data-anim="hidden"
            className="text-base leading-relaxed text-bone-dim md:col-span-5 md:col-start-1 md:text-lg"
          >
            {t.bodyBefore}{" "}
            <span className="text-bone">{t.bodyStrong}</span> {t.bodyAfter}
          </p>

          <div
            data-hero-cta
            className="flex flex-wrap items-center gap-3 md:col-span-4 md:col-start-7"
          >
            <button
              data-anim="hidden"
              type="button"
              onClick={openBrief}
              className="group relative overflow-hidden rounded-full bg-cyan px-6 py-3 text-xs font-medium tracking-[0.14em] text-ink-deep uppercase"
            >
              <span className="relative z-10">{t.ctaPrimary}</span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            </button>
            <a
              data-anim="hidden"
              href="#projetos"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#projetos");
              }}
              className="rounded-full border border-ink-line px-6 py-3 text-xs font-medium tracking-[0.14em] text-bone uppercase transition-colors hover:border-cyan hover:text-cyan"
            >
              {t.ctaSecondary}
            </a>
          </div>

          <button
            type="button"
            data-hero-scroll
            onClick={() => scrollTo("#estudio")}
            className="group hidden items-center gap-3 justify-self-end md:col-span-2 md:col-start-11 md:flex"
            aria-label={t.scrollNext}
          >
            <span className="eyebrow transition-colors group-hover:text-cyan">
              Scroll
            </span>
            <span className="relative h-8 w-px overflow-hidden bg-ink-line">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollCue_1.8s_ease-in-out_infinite] bg-cyan" />
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
