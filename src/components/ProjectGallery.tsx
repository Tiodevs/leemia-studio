"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useSite } from "@/components/SiteProvider";
import type { ProjectShot } from "@/i18n/get-dictionary";

type GalleryLabels = {
  gallery: string;
  openImage: string;
  close: string;
  previous: string;
  next: string;
};

function Shot({
  item,
  index,
  labels,
  onOpen,
}: {
  item: ProjectShot;
  index: number;
  labels: GalleryLabels;
  onOpen: (index: number, trigger: HTMLElement) => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => onOpen(index, event.currentTarget)}
      className="group block w-full text-left"
    >
      <span className="relative block overflow-hidden rounded-sm bg-ink-soft">
        {item.width && item.height ? (
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            priority={index === 0}
            sizes={
              item.wide
                ? "(min-width: 768px) 92vw, 92vw"
                : "(min-width: 768px) 46vw, 92vw"
            }
            className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <span className="relative block aspect-4/3">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 768px) 92vw, 92vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          </span>
        )}
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink-line transition-colors duration-500 group-hover:ring-cyan/50" />
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-6">
        <span className="max-w-prose text-sm leading-relaxed text-bone-dim">
          {item.caption}
        </span>
        <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.16em] text-bone-dim uppercase">
          {labels.openImage}
        </span>
      </span>
    </button>
  );
}

export function ProjectGallery({
  items,
  labels,
  children,
}: {
  items: ProjectShot[];
  labels: GalleryLabels;
  children?: ReactNode;
}) {
  const { lockScroll } = useSite();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const open = active !== null;

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeRef.current?.focus();
    return () => lockScroll(false);
  }, [open, lockScroll]);

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        returnFocus.current?.focus();
        return;
      }
      if (event.key === "ArrowRight") {
        setActive((current) =>
          current === null ? current : (current + 1) % items.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null
            ? current
            : (current - 1 + items.length) % items.length,
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  const show = (index: number, trigger: HTMLElement) => {
    returnFocus.current = trigger;
    setActive(index);
  };

  const hide = () => {
    setActive(null);
    returnFocus.current?.focus();
  };

  const shot = active === null ? null : items[active];
  const [first, ...rest] = items;

  return (
    <>
      {first ? <Shot item={first} index={0} labels={labels} onOpen={show} /> : null}
      {children}
      {rest.length > 0 ? (
        <ul className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
          {rest.map((item, index) => (
            <li
              key={item.src}
              className={item.wide ? "md:col-span-2" : undefined}
            >
              <Shot
                item={item}
                index={index + 1}
                labels={labels}
                onOpen={show}
              />
            </li>
          ))}
        </ul>
      ) : null}

      {shot && active !== null ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-ink-deep p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={hide}
        >
          <div
            className="flex max-h-full w-full max-w-6xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4 text-paper">
              <p id={titleId} className="font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                {labels.gallery} · {String(active + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={hide}
                className="text-xs tracking-[0.16em] uppercase"
              >
                {labels.close}
              </button>
            </div>

            <div className="relative min-h-0 overflow-hidden rounded-sm">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width ?? 1440}
                height={shot.height ?? 900}
                sizes="92vw"
                className="mx-auto max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-6 text-paper">
              <p className="max-w-prose text-sm leading-relaxed text-paper/75">
                {shot.caption}
              </p>
              {items.length > 1 ? (
                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActive((current) =>
                        current === null
                          ? current
                          : (current - 1 + items.length) % items.length,
                      )
                    }
                    className="text-xs tracking-[0.16em] uppercase"
                  >
                    {labels.previous}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActive((current) =>
                        current === null
                          ? current
                          : (current + 1) % items.length,
                      )
                    }
                    className="text-xs tracking-[0.16em] uppercase"
                  >
                    {labels.next}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
