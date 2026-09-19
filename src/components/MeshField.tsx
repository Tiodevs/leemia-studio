"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Long horizontal waves, echoing the mesh inside the Leemia mark. */
const WAVES = [
  "M -100 120 C 180 40, 420 200, 700 110 C 980 20, 1240 180, 1540 96",
  "M -100 250 C 200 170, 400 330, 700 240 C 1000 150, 1250 310, 1540 226",
  "M -100 380 C 190 300, 430 460, 700 370 C 970 280, 1260 440, 1540 356",
  "M -100 510 C 210 430, 410 590, 700 500 C 990 410, 1240 570, 1540 486",
  "M -100 640 C 180 560, 440 720, 700 630 C 960 540, 1270 700, 1540 616",
];

const RIBS = [220, 470, 720, 970, 1220];

type MeshFieldProps = {
  className?: string;
};

export function MeshField({ className }: MeshFieldProps) {
  const root = useRef<SVGSVGElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      if (!ready) return;

      const lines = gsap.utils.toArray<SVGPathElement>("[data-wave]");
      const ribs = gsap.utils.toArray<SVGPathElement>("[data-rib]");

      if (prefersReducedMotion()) {
        gsap.set([...lines, ...ribs], { autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        [...lines, ...ribs],
        { drawSVG: "0%", autoAlpha: 0 },
        {
          drawSVG: "100%",
          autoAlpha: 1,
          duration: 2.1,
          stagger: 0.12,
          ease: "power2.inOut",
        },
      );

      // Slow drift keeps the field alive without demanding attention.
      lines.forEach((line, i) => {
        gsap.to(line, {
          yPercent: i % 2 === 0 ? 1.6 : -1.6,
          duration: 7 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(root.current, { yPercent: 12, ease: "none" }),
      });

      return () => st.kill();
    },
    { dependencies: [ready], scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {WAVES.map((d) => (
        <path
          key={d}
          data-wave
          d={d}
          stroke="var(--color-cyan)"
          strokeWidth={1.25}
          strokeLinecap="round"
          opacity={0}
        />
      ))}

      {RIBS.map((x) => (
        <path
          key={x}
          data-rib
          d={`M ${x} -40 C ${x + 70} 160, ${x - 60} 400, ${x + 40} 800`}
          stroke="var(--color-cyan)"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0}
        />
      ))}
    </svg>
  );
}
