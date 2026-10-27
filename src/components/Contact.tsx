"use client";

import { useRef } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { ProjectBrief } from "@/components/ProjectBrief";
import { RevealGroup } from "@/components/Reveal";
import { useSite } from "@/components/SiteProvider";
import { SOCIALS } from "@/data/site";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { dictionary } = useSite();
  const t = dictionary.contact;

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
    { scope: root, dependencies: [t.headline[0]] },
  );

  return (
    <section
      ref={root}
      id="contato"
      className="shell relative scroll-mt-24 pt-24 pb-20 md:pt-36 md:pb-28"
    >
      <p className="eyebrow">{t.eyebrow}</p>

      <h2 className="display mt-10 block w-full text-[clamp(2.4rem,10vw,9rem)]">
        <span data-contact-line className="line-mask">
          <span className="inline-block">{t.headline[0]}</span>
        </span>
        <span data-contact-line className="line-mask">
          <span className="inline-block text-cyan">{t.headline[1]}</span>
        </span>
      </h2>

      <RevealGroup className="mt-16 grid gap-10 md:grid-cols-12 md:items-start">
        <div className="hairline space-y-3 pt-5 md:col-span-4">
          <p className="eyebrow">{t.follow}</p>
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
          <ProjectBrief />
        </div>
      </RevealGroup>
    </section>
  );
}
