import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteProvider } from "@/components/SiteProvider";
import { SITE } from "@/data/site";

const Cursor = dynamic(
  () => import("@/components/Cursor").then((mod) => mod.Cursor),
  { ssr: false },
);

const ProjectBrief = dynamic(
  () => import("@/components/ProjectBrief").then((mod) => mod.ProjectBrief),
  { ssr: false },
);

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const clarityId =
  CLARITY_ID && /^[A-Za-z0-9_-]+$/.test(CLARITY_ID) ? CLARITY_ID : null;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "landing page",
    "site institucional",
    "sistema web",
    "automação com IA",
    "desenvolvimento web",
    "Next.js",
    "Leemia",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {clarityId ? (
          <script
            id="microsoft-clarity"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`,
            }}
          />
        ) : null}
      </head>
      <body className="bg-ink text-bone">
        <SiteProvider>
          <Cursor />
          <Header />
          <main>{children}</main>
          <Contact />
          <Footer />
          <ProjectBrief />
        </SiteProvider>
        <Analytics />
      </body>
    </html>
  );
}
