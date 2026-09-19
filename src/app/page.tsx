import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";

const Studio = dynamic(() =>
  import("@/components/Studio").then((mod) => mod.Studio),
);
const Services = dynamic(() =>
  import("@/components/Services").then((mod) => mod.Services),
);
const Work = dynamic(() =>
  import("@/components/Work").then((mod) => mod.Work),
);
const Process = dynamic(() =>
  import("@/components/Process").then((mod) => mod.Process),
);

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Studio />
      <Services />
      <Work />
      <Process />
    </>
  );
}
