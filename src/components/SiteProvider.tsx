"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { trackOpenBriefing } from "@/lib/analytics";
import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/gsap";
import {
  otherLocale,
  type Locale,
  localeHtmlLang,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export type Theme = "light" | "dark";

const THEME_KEY = "leemia-theme";

type SiteContextValue = {
  lockScroll: (locked: boolean) => void;
  scrollTo: (target: string) => void;
  openBrief: () => void;
  theme: Theme;
  toggleTheme: () => void;
  locale: Locale;
  dictionary: Dictionary;
  switchLocale: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#05070a" : "#f2f5f6");
}

export function SiteProvider({
  children,
  locale,
  dictionary,
}: {
  children: ReactNode;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale];
  }, [locale]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const lockScroll = useCallback((locked: boolean) => {
    const root = document.documentElement;
    const lenis = lenisRef.current;

    if (locked) {
      const gutter = Math.max(0, window.innerWidth - root.clientWidth);
      root.style.setProperty("--scroll-lock-gutter", `${gutter}px`);
      root.style.overflow = "hidden";
      lenis?.stop();
      return;
    }

    root.style.removeProperty("--scroll-lock-gutter");
    root.style.overflow = "";
    lenis?.start();
  }, []);

  const scrollTo = useCallback(
    (target: string) => {
      const el = document.querySelector(target);
      const lenis = lenisRef.current;

      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.2 });
        else el.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (target === "#top") {
        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (target.startsWith("#")) {
        router.push(`/${locale}${target}`);
      }
    },
    [locale, router],
  );

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#top") return;

    const timer = window.setTimeout(() => {
      const el = document.querySelector(hash);
      if (!el) return;
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.1 });
      else el.scrollIntoView();
    }, 400);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const openBrief = useCallback(() => {
    scrollTo("#briefing");
    trackOpenBriefing();
  }, [scrollTo]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* private mode */
      }
      return next;
    });
  }, []);

  const switchLocale = useCallback(() => {
    const next = otherLocale(locale);
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const segments = pathname.split("/");
    // pathname: /pt or /pt/... → replace locale segment
    if (segments[1] === locale) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const path = segments.join("/") || `/${next}`;
    router.push(`${path}${hash}`);
  }, [locale, pathname, router]);

  const value = useMemo(
    () => ({
      lockScroll,
      scrollTo,
      openBrief,
      theme,
      toggleTheme,
      locale,
      dictionary,
      switchLocale,
    }),
    [
      lockScroll,
      scrollTo,
      openBrief,
      theme,
      toggleTheme,
      locale,
      dictionary,
      switchLocale,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
