"use client";

import dynamic from "next/dynamic";

const Cursor = dynamic(
  () => import("@/components/Cursor").then((mod) => mod.Cursor),
  { ssr: false },
);

export function LazyChrome() {
  return <Cursor />;
}
