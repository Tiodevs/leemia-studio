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
import { trackOpenBriefing } from "@/lib/analytics";
import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/gsap";

type SiteContextValue = {
  /** True once the intro curtain has lifted; section timelines wait for it. */
  introDone: boolean;
  finishIntro: () => void;
  lockScroll: (locked: boolean) => void;
  scrollTo: (target: string) => void;
  /** Single conversion point of the site: the briefing dialog. */
  briefOpen: boolean;
  openBrief: () => void;
  closeBrief: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

  useEffect(() => {
    // Reduced-motion visitors keep native scrolling; the preloader calls
    // finishIntro() straight away in that case.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const lockScroll = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
      return;
    }
    // Reduced-motion visitors keep native scrolling.
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  const finishIntro = useCallback(() => {
    setIntroDone(true);
    lockScroll(false);
    ScrollTrigger.refresh();
    // Only now: with lag smoothing off, Lenis and ScrollTrigger stay in sync
    // during heavy scrolling. Enabling it earlier would let a slow first paint
    // fast-forward the intro timeline.
    gsap.ticker.lagSmoothing(0);
  }, [lockScroll]);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openBrief = useCallback(() => {
    setBriefOpen(true);
    lockScroll(true);
    trackOpenBriefing();
  }, [lockScroll]);

  const closeBrief = useCallback(() => {
    setBriefOpen(false);
    lockScroll(false);
  }, [lockScroll]);

  const value = useMemo(
    () => ({
      introDone,
      finishIntro,
      lockScroll,
      scrollTo,
      briefOpen,
      openBrief,
      closeBrief,
    }),
    [
      introDone,
      finishIntro,
      lockScroll,
      scrollTo,
      briefOpen,
      openBrief,
      closeBrief,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
