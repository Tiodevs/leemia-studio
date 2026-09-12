"use client";

import { useSite } from "@/components/SiteProvider";
import { SITE } from "@/data/site";

export function Footer() {
  const { scrollTo } = useSite();

  return (
    <footer className="relative">
      <div className="shell hairline flex flex-wrap items-center justify-between gap-4 pt-5 pb-8">
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
    </footer>
  );
}
