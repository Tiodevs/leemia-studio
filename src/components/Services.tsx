"use client";

import { useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { RevealText } from "@/components/Reveal";
import { SERVICES } from "@/data/services";

export function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]");

      panels.forEach((panel, i) => {
        const isActive = i === active;
        const inner = panel.firstElementChild;

        if (prefersReducedMotion()) {
          gsap.set(panel, { height: isActive ? "auto" : 0 });
          gsap.set(inner, { autoAlpha: isActive ? 1 : 0 });
          return;
        }

        gsap.to(panel, {
          height: isActive ? "auto" : 0,
          duration: 0.7,
          ease: EASE.quart,
        });
        gsap.to(inner, {
          autoAlpha: isActive ? 1 : 0,
          y: isActive ? 0 : 12,
          duration: isActive ? 0.6 : 0.3,
          delay: isActive ? 0.12 : 0,
          ease: EASE.soft,
        });
      });
    },
    { dependencies: [active], scope: root },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-service-row]", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.09,
        ease: EASE.expo,
        scrollTrigger: { trigger: "[data-service-list]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="servicos"
      className="shell relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <p className="eyebrow md:col-span-4">02 — Serviços</p>
        <RevealText
          as="h2"
          className="display display-lines text-[clamp(2rem,5.4vw,4.5rem)] md:col-span-8"
        >
          Quatro frentes, uma entrega só.
        </RevealText>
      </div>

      <div data-service-list className="mt-14 md:mt-20">
        {SERVICES.map((service, i) => {
          const isActive = i === active;

          return (
            <div key={service.id} data-service-row className="hairline">
              <h3>
                <button
                  type="button"
                  onClick={() => setActive(isActive ? -1 : i)}
                  onMouseEnter={() => setActive(i)}
                  aria-expanded={isActive}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
                >
                  <span className="flex items-baseline gap-5 md:gap-10">
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone-dim md:text-xs">
                      {service.index}
                    </span>
                    <span
                      className={`display text-[clamp(1.6rem,4.6vw,3.5rem)] transition-colors duration-500 ${
                        isActive
                          ? "text-cyan"
                          : "text-bone group-hover:text-cyan"
                      }`}
                    >
                      {service.title}
                    </span>
                  </span>

                  <span className="relative flex h-3 w-3 shrink-0 items-center justify-center md:h-4 md:w-4">
                    <span className="absolute h-px w-full bg-bone-dim" />
                    <span
                      className={`absolute h-full w-px bg-bone-dim transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                        isActive ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>
              </h3>

              <div
                data-service-panel
                className="h-0 overflow-hidden"
                aria-hidden={!isActive}
              >
                <div className="grid gap-8 pb-10 md:grid-cols-12">
                  <p className="text-base leading-relaxed text-bone-dim md:col-span-6 md:col-start-2 md:text-[1.0625rem]">
                    {service.summary}
                  </p>
                  <ul className="space-y-2 md:col-span-4 md:col-start-9">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-bone"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
