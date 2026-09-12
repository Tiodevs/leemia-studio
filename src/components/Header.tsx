"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EASE, ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { LogoLockup } from "@/components/LogoMark";
import { useSite } from "@/components/SiteProvider";
import { NAV_LINKS, SOCIALS, CONTACT } from "@/data/site";

export function Header() {
  const root = useRef<HTMLElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const hideTween = useRef<gsap.core.Tween | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { introDone, lockScroll, scrollTo } = useSite();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.set("[data-menu-panel]", { yPercent: -100 });
      gsap.set("[data-menu-link] > span", { yPercent: 110 });
      gsap.set("[data-menu-aside]", { autoAlpha: 0, y: 16 });

      menuTl.current = gsap
        .timeline({ paused: true })
        .set("[data-menu]", { pointerEvents: "auto" })
        .to("[data-menu-panel]", {
          yPercent: 0,
          duration: 0.9,
          ease: EASE.quart,
        })
        .to(
          "[data-menu-link] > span",
          { yPercent: 0, duration: 0.8, stagger: 0.06, ease: EASE.expo },
          0.35,
        )
        .to(
          "[data-menu-aside]",
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: EASE.soft },
          0.55,
        );
    },
    { scope: root },
  );

  // Header reveals after the intro curtain, then hides on scroll-down.
  useGSAP(
    () => {
      if (!introDone) return;

      const inner = root.current?.querySelector("[data-header-inner]");
      if (!inner) return;

      if (prefersReducedMotion()) {
        gsap.set(inner, { visibility: "visible" });
        return;
      }

      gsap.set(inner, { visibility: "visible", yPercent: -100, autoAlpha: 0 });
      gsap.to(inner, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: EASE.expo,
      });

      // Animate the bar, never the <header> itself: a transform on the header
      // would become the containing block for the fixed menu overlay inside it.
      const hide = gsap.to(inner, {
        yPercent: -110,
        duration: 0.5,
        ease: "power2.out",
        paused: true,
      });
      hideTween.current = hide;

      const st = ScrollTrigger.create({
        start: "top -160",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1) hide.play();
          else hide.reverse();
        },
        onToggle: (self) => setScrolled(self.isActive),
        onLeaveBack: () => hide.reverse(),
      });

      return () => st.kill();
    },
    { dependencies: [introDone], scope: root },
  );

  const toggle = useCallback(
    (next: boolean) => {
      setOpen(next);
      lockScroll(next);
      // The bar may be tucked away by the scroll-direction tween; bring it back.
      if (next) hideTween.current?.reverse();
      const tl = menuTl.current;
      if (!tl) return;
      if (next) tl.timeScale(1).play();
      else tl.timeScale(1.6).reverse();
    },
    [lockScroll],
  );

  const goTo = useCallback(
    (href: string) => {
      toggle(false);
      // Let the curtain start closing before the page jumps.
      window.setTimeout(() => scrollTo(href), 420);
    },
    [scrollTo, toggle],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) toggle(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle]);

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50">
      <div
        data-header-inner
        data-anim="hidden"
        className={`relative z-10 transition-colors duration-500 ${
          scrolled && !open ? "bg-ink/70 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#top");
          }}
          className="relative z-10"
          aria-label="Leemia — início"
        >
          <LogoLockup />
        </a>

        <div className="relative z-10 flex items-center gap-5">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:text-cyan sm:block"
          >
            Iniciar projeto
          </a>

          <button
            type="button"
            onClick={() => toggle(!open)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="group flex items-center gap-3"
          >
            <span className="text-xs tracking-[0.16em] text-bone uppercase">
              {open ? "Fechar" : "Menu"}
            </span>
            <span className="relative flex h-3 w-7 flex-col justify-between">
              <span
                className="h-px w-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={
                  open
                    ? { transform: "translateY(5.5px) rotate(45deg)" }
                    : undefined
                }
              />
              <span
                className="h-px w-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={
                  open
                    ? { transform: "translateY(-5.5px) rotate(-45deg)" }
                    : undefined
                }
              />
            </span>
          </button>
        </div>
        </div>
      </div>

      <div
        data-menu
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden={!open}
      >
        <div
          data-menu-panel
          className="absolute inset-0 flex flex-col justify-between bg-ink-soft pt-[var(--header-h)]"
        >
          <nav className="shell flex flex-1 flex-col justify-center py-10">
            <ul>
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="hairline">
                  <a
                    data-menu-link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(link.href);
                    }}
                    tabIndex={open ? 0 : -1}
                    className="group flex items-baseline justify-between gap-6 overflow-hidden py-[1.6vh]"
                  >
                    <span className="display inline-flex items-baseline gap-4 text-[clamp(2.5rem,9vw,7rem)] text-bone transition-colors duration-500 group-hover:text-cyan md:gap-8">
                      <em className="font-mono text-[0.6rem] font-normal tracking-[0.2em] text-bone-dim not-italic md:text-xs">
                        0{i + 1}
                      </em>
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shell hairline grid gap-8 py-8 sm:grid-cols-3">
            <div data-menu-aside className="space-y-2">
              <p className="eyebrow">Contato</p>
              <a
                href={`mailto:${CONTACT.email}`}
                tabIndex={open ? 0 : -1}
                className="block text-sm text-bone transition-colors hover:text-cyan"
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                className="block text-sm text-bone-dim transition-colors hover:text-cyan"
              >
                {CONTACT.phoneLabel}
              </a>
            </div>

            <div data-menu-aside className="space-y-2">
              <p className="eyebrow">Redes</p>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="block text-sm text-bone-dim transition-colors hover:text-cyan"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div data-menu-aside className="space-y-2 sm:text-right">
              <p className="eyebrow">Base</p>
              <p className="text-sm text-bone-dim">
                {CONTACT.location}
                <br />
                Atendimento remoto global
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
