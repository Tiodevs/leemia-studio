"use client";

import Image from "next/image";
import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { RevealText } from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";

export function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card) => {
        const frame = card.querySelector("[data-work-frame]");
        const media = card.querySelector("[data-work-media]");

        if (card.dataset.framed !== "true") {
          gsap.from(frame, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: EASE.quart,
            scrollTrigger: { trigger: card, start: "top 82%" },
          });
        }

        gsap.from(card.querySelectorAll("[data-work-meta] > *"), {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: EASE.expo,
          scrollTrigger: { trigger: card, start: "top 78%" },
        });

        if (card.dataset.framed === "true") return;

        // Slight counter-scroll on the artwork adds depth to the grid. Stays
        // within the image overscale so no edge is ever exposed.
        gsap.fromTo(
          media,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projetos"
      className="shell relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <p className="eyebrow md:col-span-4">Projetos</p>
        <RevealText
          as="h2"
          className="display display-lines text-[clamp(2rem,5.4vw,4.5rem)] md:col-span-8"
        >
          Trabalhos selecionados.
        </RevealText>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-28">
        {PROJECTS.map((project, i) => (
          <article
            key={project.slug}
            data-work-card
            data-framed={project.framed ? "true" : undefined}
            className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
          >
            <div
              data-work-frame
              className="relative aspect-4/3 overflow-hidden rounded-sm bg-ink-soft"
            >
              <div data-work-media className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={`Interface do projeto ${project.title}`}
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                  key={project.image}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  priority={i < 2}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink-line transition-colors duration-500 group-hover:ring-cyan/50" />
            </div>

            <div data-work-meta className="mt-6">
              <div className="hairline flex items-baseline justify-between gap-4 pt-4">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone-dim">
                  0{i + 1} / {project.category}
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone-dim">
                  {project.year}
                </span>
              </div>

              <h3 className="display mt-4 text-[clamp(1.5rem,3.2vw,2.5rem)] transition-colors duration-500 group-hover:text-cyan">
                {project.title}
              </h3>

              <p className="mt-3 max-w-prose text-sm leading-relaxed text-bone-dim">
                {project.summary}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-ink-line px-3 py-1 text-[0.6875rem] tracking-[0.08em] text-bone-dim"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative mt-6 inline-flex overflow-hidden rounded-full bg-cyan px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-ink uppercase"
              >
                <span className="relative z-10">Abrir projeto</span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:scale-y-100" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
