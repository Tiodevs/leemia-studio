"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { LogoMark } from "@/components/LogoMark";
import { useSite } from "@/components/SiteProvider";
import { NAV_LINKS, SITE } from "@/data/site";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSite();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-footer-word] > span", {
        yPercent: 105,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 92%" },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-t-ink-line">
      <div className="shell pt-14 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <LogoMark className="h-6 w-7 text-cyan" />
            <p className="text-sm text-bone-dim">
              {SITE.tagline}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-xs tracking-[0.14em] text-bone-dim uppercase transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          data-footer-word
          className="line-mask mt-16 select-none"
          aria-hidden="true"
        >
          <span className="display block text-[clamp(4rem,19vw,17rem)] leading-[0.8] text-ink-line">
            Leemia
          </span>
        </div>

        <div className="hairline mt-8 flex flex-wrap items-center justify-between gap-4 pt-5">
          <p className="font-mono text-[0.65rem] tracking-[0.16em] text-bone-dim uppercase">
            © {new Date().getFullYear()} {SITE.name} — Todos os direitos
            reservados
          </p>
          <button
            type="button"
            onClick={() => scrollTo("#top")}
            className="font-mono text-[0.65rem] tracking-[0.16em] text-bone-dim uppercase transition-colors hover:text-cyan"
          >
            Voltar ao topo ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
