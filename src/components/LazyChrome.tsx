"use client";

import dynamic from "next/dynamic";

const Cursor = dynamic(
  () => import("@/components/Cursor").then((mod) => mod.Cursor),
  { ssr: false },
);

const ProjectBrief = dynamic(
  () => import("@/components/ProjectBrief").then((mod) => mod.ProjectBrief),
  { ssr: false },
);

export function LazyChrome() {
  return (
    <>
      <Cursor />
      <ProjectBrief />
    </>
  );
}
