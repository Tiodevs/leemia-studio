"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE, ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { LogoLockup } from "@/components/LogoMark";
import { useSite } from "@/components/SiteProvider";
import { SOCIALS, CONTACT } from "@/data/site";

export function Header() {
  const root = useRef<HTMLElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const hideTween = useRef<gsap.core.Tween | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    lockScroll,
    openBrief,
    scrollTo,
    toggleTheme,
    dictionary,
    locale,
    switchLocale,
  } = useSite();
  const pathname = usePathname();
  const homePath = `/${locale}`;
  const onHome = pathname === homePath || pathname === `${homePath}/`;
  const t = dictionary.nav;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.set("[data-menu-panel]", { yPercent: -110 });
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

  useGSAP(
    () => {
      const inner = root.current?.querySelector("[data-header-inner]");
      if (!inner || prefersReducedMotion()) return;

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
    { scope: root },
  );

  const toggle = useCallback(
    (next: boolean) => {
      setOpen(next);
      lockScroll(next);
      if (next) hideTween.current?.reverse();
      const tl = menuTl.current;
      const menu = root.current?.querySelector("[data-menu]");
      if (!tl) return;
      if (next) {
        menu?.classList.add("is-open");
        tl.timeScale(1).play();
        return;
      }
      tl.eventCallback("onReverseComplete", () => {
        if (root.current?.querySelector("[aria-expanded='true']")) return;
        menu?.classList.remove("is-open");
        tl.eventCallback("onReverseComplete", null);
      });
      tl.timeScale(1.6).reverse();
    },
    [lockScroll],
  );

  const goTo = useCallback(
    (href: string) => {
      toggle(false);
      window.setTimeout(() => scrollTo(href), 420);
    },
    [scrollTo, toggle],
  );

  const startProject = useCallback(() => {
    if (open) {
      toggle(false);
      window.setTimeout(openBrief, 420);
      return;
    }
    openBrief();
  }, [open, openBrief, toggle]);

  const onSwitchLocale = useCallback(() => {
    if (open) toggle(false);
    switchLocale();
  }, [open, switchLocale, toggle]);

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
        className={`relative z-10 transition-colors duration-500 ${
          scrolled && !open ? "bg-ink/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between">
          <Link
            href={homePath}
            onClick={(e) => {
              if (!onHome) return;
              e.preventDefault();
              scrollTo("#top");
            }}
            className="relative z-10"
            aria-label={t.home}
          >
            <LogoLockup />
          </Link>

          <div className="relative z-10 flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              title="Theme"
              className="relative flex h-8 w-8 items-center justify-center text-bone transition-colors hover:text-cyan"
            >
              <svg
                data-theme-icon="sun"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="3.25"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <path
                  d="M8 1.5v1.25M8 13.25V14.5M1.5 8h1.25M13.25 8H14.5M3.22 3.22l.88.88M11.9 11.9l.88.88M3.22 12.78l.88-.88M11.9 4.1l.88-.88"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                data-theme-icon="moon"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.6 9.15A5.75 5.75 0 0 1 5.85 2.4 5.75 5.75 0 1 0 12.6 9.15Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={startProject}
              className="hidden text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:text-cyan sm:block"
            >
              {t.startProject}
            </button>

            <button
              type="button"
              onClick={onSwitchLocale}
              aria-label={t.switchTo}
              title={t.switchTo}
              className="text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:text-cyan"
            >
              {t.langCode}
            </button>

            <button
              type="button"
              onClick={() => toggle(!open)}
              aria-expanded={open}
              aria-label={open ? t.closeMenu : t.openMenu}
              className="group flex items-center gap-3"
            >
              <span className="grid text-xs tracking-[0.16em] text-bone uppercase">
                <span
                  className={`col-start-1 row-start-1 ${open ? "invisible" : ""}`}
                  aria-hidden={open}
                >
                  {t.menu}
                </span>
                <span
                  className={`col-start-1 row-start-1 ${open ? "" : "invisible"}`}
                  aria-hidden={!open}
                >
                  {t.close}
                </span>
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
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden={!open}
      >
        <div
          data-menu-panel
          className="absolute inset-0 flex flex-col bg-ink-soft pt-[var(--header-h)]"
        >
          <nav className="shell flex min-h-0 flex-1 flex-col justify-center overflow-y-auto py-4 md:py-6">
            <ul>
              {t.links.map((link, i) => (
                <li key={link.href}>
                  <Link
                    data-menu-link
                    href={`${homePath}${link.href}`}
                    onClick={(e) => {
                      if (onHome) {
                        e.preventDefault();
                        goTo(link.href);
                        return;
                      }
                      toggle(false);
                    }}
                    tabIndex={open ? 0 : -1}
                    className="group flex items-baseline justify-between gap-6 overflow-hidden py-[clamp(0.35rem,1.2vh,0.85rem)]"
                  >
                    <span className="display inline-flex items-baseline gap-4 text-[clamp(2rem,min(8vw,12vh),6.25rem)] text-bone transition-colors duration-500 group-hover:text-cyan md:gap-8">
                      <em className="font-mono text-[0.6rem] font-normal tracking-[0.2em] text-bone-dim not-italic md:text-xs">
                        0{i + 1}
                      </em>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shell shrink-0 pb-2 sm:hidden">
            <button
              data-menu-aside
              type="button"
              onClick={startProject}
              tabIndex={open ? 0 : -1}
              className="group relative w-full overflow-hidden rounded-full bg-cyan px-6 py-3.5 text-xs font-medium tracking-[0.14em] text-ink-deep uppercase"
            >
              <span className="relative z-10">{t.startProject}</span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            </button>
          </div>

          <div className="shell grid shrink-0 gap-6 border-t border-ink-line py-5 sm:grid-cols-3 sm:gap-8 sm:py-6">
            <div data-menu-aside className="space-y-2">
              <p className="eyebrow">{t.contactLabel}</p>
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
              <p className="eyebrow">{t.networksLabel}</p>
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
              <p className="eyebrow">{t.baseLabel}</p>
              <p className="text-sm text-bone-dim">
                {dictionary.menu.baseCity}
                <br />
                {t.remote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
