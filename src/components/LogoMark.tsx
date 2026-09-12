type LogoMarkProps = {
  className?: string;
  /** Adds `data-mesh-line` to the inner strokes so GSAP can target them. */
  animated?: boolean;
};

/** Interior strokes of the Leemia mark: a grid deformed into organic waves. */
export const MESH_PATHS = [
  "M 4 38 C 22 25, 41 29, 58 44 C 75 59, 98 55, 116 38",
  "M 4 66 C 23 53, 44 57, 62 71 C 78 83, 99 81, 116 64",
  "M 40 4 C 52 22, 54 40, 44 56 C 34 72, 34 84, 42 96",
  "M 78 4 C 90 22, 88 40, 76 55 C 64 70, 67 84, 76 96",
];

export function LogoMark({ className, animated = false }: LogoMarkProps) {
  const lineAttr = animated ? { "data-mesh-line": "" } : {};

  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={7}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <clipPath id="leemia-mark-clip">
        <rect x="4" y="4" width="112" height="92" rx="4" />
      </clipPath>

      <g clipPath="url(#leemia-mark-clip)">
        {MESH_PATHS.map((d) => (
          <path key={d} d={d} {...lineAttr} />
        ))}
      </g>

      <rect
        x="4"
        y="4"
        width="112"
        height="92"
        rx="4"
        {...(animated ? { "data-mesh-frame": "" } : {})}
      />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-5 w-6 text-cyan" />
      <span className="text-[1.0625rem] font-medium tracking-tight text-bone">
        Leemia
      </span>
    </span>
  );
}
