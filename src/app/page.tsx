import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Studio } from "@/components/Studio";
import { Work } from "@/components/Work";

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
