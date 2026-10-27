import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { locales } from "@/i18n/config";
import pt from "@/i18n/dictionaries/pt";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    ...locales.map((locale) => ({ path: `/${locale}`, priority: 1 })),
    ...locales.flatMap((locale) =>
      pt.projects.map((project) => ({
        path: `/${locale}/projetos/${project.slug}`,
        priority: 0.7,
      })),
    ),
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => {
          const localized = path.replace(/^\/(pt|en)/, `/${locale}`);
          return [locale === "pt" ? "pt-BR" : "en", `${SITE.url}${localized}`];
        }),
      ),
    },
  }));
}
