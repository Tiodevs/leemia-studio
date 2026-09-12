"use client";

import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { RevealGroup } from "@/components/Reveal";
import { useSite } from "@/components/SiteProvider";
import { CONTACT, SOCIALS } from "@/data/site";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { openBrief } = useSite();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-contact-line] > span", {
        yPercent: 115,
        duration: 1.15,
        stagger: 0.08,
        ease: EASE.expo,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contato"
      className="shell relative scroll-mt-24 pt-24 pb-20 md:pt-36 md:pb-28"
    >
      <p className="eyebrow">Contato</p>

      <button
        type="button"
        onClick={openBrief}
        className="group mt-10 block w-full text-left"
        aria-label="Abrir formulário de briefing"
      >
        <span className="display block text-[clamp(2.4rem,10vw,9rem)]">
          <span data-contact-line className="line-mask">
            <span className="inline-block">Vamos construir</span>
          </span>
          <span data-contact-line className="line-mask">
            <span className="inline-block transition-colors duration-500 group-hover:text-cyan">
              algo bom.
            </span>
          </span>
        </span>
      </button>

      <RevealGroup className="mt-16 grid gap-10 md:grid-cols-12">
        <div className="hairline space-y-3 pt-5 md:col-span-4">
          <p className="eyebrow">Siga</p>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="block text-lg text-bone transition-colors hover:text-cyan"
            >
              {social.label}
            </a>
          ))}
        </div>

        <div className="hairline pt-5 md:col-span-7 md:col-start-6">
          <p className="eyebrow">Próximo passo</p>
          <p className="mt-3 text-base leading-relaxed text-bone-dim">
            Conte em duas linhas o que você precisa. Respondo em até 24h com
            uma proposta de escopo, prazo e investimento.
          </p>
          <button
            type="button"
            onClick={openBrief}
            className="group relative mt-6 inline-flex overflow-hidden rounded-full bg-cyan px-6 py-3 text-xs font-medium tracking-[0.14em] text-ink uppercase"
          >
            <span className="relative z-10">Iniciar projeto</span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
          </button>

          <p className="mt-5 text-xs text-bone-dim">
            Prefere e-mail?{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-bone transition-colors hover:text-cyan"
            >
              {CONTACT.email}
            </a>
          </p>
        </div>
      </RevealGroup>
    </section>
  );
}
