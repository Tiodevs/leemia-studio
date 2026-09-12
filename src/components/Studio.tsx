"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { LogoMark } from "@/components/LogoMark";
import { RevealGroup, RevealText } from "@/components/Reveal";
import { STATS } from "@/data/process";

export function Studio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mark = root.current?.querySelector("[data-studio-mark]");
      if (!mark) return;

      gsap.to(mark, {
        rotate: 12,
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(mark.querySelectorAll("[data-mesh-line], [data-mesh-frame]"), {
        drawSVG: "0%",
        duration: 1.6,
        stagger: 0.12,
        ease: "power2.inOut",
        scrollTrigger: { trigger: mark, start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="estudio"
      className="shell relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">01 — O estúdio</p>
          <div
            data-studio-mark
            className="mt-10 hidden w-40 text-cyan/70 md:block"
          >
            <LogoMark animated className="h-auto w-full" />
          </div>
        </div>

        <div className="md:col-span-8">
          <RevealText
            as="h2"
            className="display display-lines text-[clamp(1.9rem,4.6vw,4rem)] text-balance"
          >
            Uma empresa de tecnologia enxuta, com padrão de agência grande.
          </RevealText>

          <div className="mt-10 grid gap-8 text-base leading-relaxed text-bone-dim md:grid-cols-2 md:text-[1.0625rem]">
            <RevealText>
              A Leemia nasceu da união entre design, engenharia e inteligência
              artificial. Em vez de repassar seu projeto por uma corrente de
              pessoas, você fala direto com quem desenha a interface, escreve o
              código e sobe tudo em produção.
            </RevealText>
            <RevealText delay={0.1}>
              Isso significa menos ruído, decisões mais rápidas e um produto
              coerente do primeiro pixel ao último deploy. Cada entrega é
              medida por performance, clareza e o impacto real no negócio de
              quem contratou.
            </RevealText>
          </div>

          <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="hairline pt-5 pr-4"
              >
                <p className="display text-[clamp(1.75rem,3.4vw,2.75rem)] text-cyan">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-bone-dim">
                  {stat.label}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
