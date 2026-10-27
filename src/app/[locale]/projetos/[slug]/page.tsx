import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/ProjectGallery";
import { RevealText } from "@/components/Reveal";
import { SITE } from "@/data/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary, type ProjectShot } from "@/i18n/get-dictionary";
import pt from "@/i18n/dictionaries/pt";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pt.projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = await getDictionary(locale);
  const project = dictionary.projects.find((item) => item.slug === slug);
  if (!project) return {};

  const url = `${SITE.url}/${locale}/projetos/${slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${SITE.url}/pt/projetos/${slug}`,
        en: `${SITE.url}/en/projetos/${slug}`,
        "x-default": `${SITE.url}/pt/projetos/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      images: [project.caseStudy?.gallery[0]?.src ?? project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = await getDictionary(locale);
  const index = dictionary.projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const project = dictionary.projects[index];
  const next =
    dictionary.projects[(index + 1) % dictionary.projects.length];
  const t = dictionary.projectPage;
  const study = project.caseStudy;
  const home = `/${locale}`;

  const shots: ProjectShot[] = study?.gallery ?? [
    {
      src: project.image,
      alt: dictionary.work.imageAlt.replace("{title}", project.title),
      caption: project.summary,
      wide: true,
    },
  ];

  return (
    <article className="pt-[calc(var(--header-h)+2.5rem)]">
      <header className="shell">
        <Link
          href={`${home}#projetos`}
          className="eyebrow transition-colors hover:text-cyan"
        >
          ← {t.back}
        </Link>

        <div className="mt-10 grid gap-6 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-4">
            {project.category} · {project.year}
          </p>
          <RevealText
            as="h1"
            className="display display-lines text-[clamp(2.2rem,6vw,5.25rem)] md:col-span-8"
          >
            {project.title}
          </RevealText>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-bone-dim md:text-lg">
          {study?.overview ?? project.summary}
        </p>

        <dl className="mt-10 grid gap-6 border-y border-ink-line py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="eyebrow">{t.role}</dt>
            <dd className="mt-2 text-sm text-bone">
              {study?.role ?? project.category}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">{t.context}</dt>
            <dd className="mt-2 text-sm text-bone">
              {study?.context ?? project.year}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">{t.year}</dt>
            <dd className="mt-2 text-sm text-bone">{project.year}</dd>
          </div>
          <div>
            <dt className="eyebrow">{t.stack}</dt>
            <dd className="mt-2 text-sm text-bone">{project.stack.join(" · ")}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex overflow-hidden rounded-full bg-cyan px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-ink-deep uppercase"
          >
            <span className="relative z-10">{t.visitLive}</span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
          </a>
          <a
            href="#briefing"
            className="text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:text-cyan"
          >
            {dictionary.nav.startProject}
          </a>
        </div>
      </header>

      <div className="shell mt-14 md:mt-20">
        <ProjectGallery items={shots} labels={t}>
          {study ? (
            <>
              <section className="mt-20 grid gap-12 md:mt-28 md:grid-cols-2 md:gap-16">
                <div>
                  <h2 className="eyebrow">{t.challenge}</h2>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-bone">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h2 className="eyebrow">{t.solution}</h2>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-bone">
                    {study.solution}
                  </p>
                </div>
              </section>

              <section className="mt-20 md:mt-28">
                <h2 className="eyebrow">{t.highlights}</h2>
                <ol className="mt-8">
                  {study.highlights.map((item, itemIndex) => (
                    <li
                      key={item.title}
                      className="hairline grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10"
                    >
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone-dim md:col-span-2">
                        0{itemIndex + 1}
                      </span>
                      <h3 className="display text-[clamp(1.35rem,2.4vw,2rem)] md:col-span-4">
                        {item.title}
                      </h3>
                      <p className="max-w-prose text-sm leading-relaxed text-bone-dim md:col-span-6">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          ) : null}
        </ProjectGallery>
      </div>

      <div className="shell mt-8 pb-8 md:mt-12">
        <Link
          href={`${home}/projetos/${next.slug}`}
          className="group hairline flex items-end justify-between gap-6 py-10"
        >
          <span>
            <span className="eyebrow">{t.nextProject}</span>
            <span className="display mt-4 block text-[clamp(1.6rem,3.4vw,2.75rem)] transition-colors duration-500 group-hover:text-cyan">
              {next.title}
            </span>
          </span>
          <span
            aria-hidden
            className="font-mono text-sm tracking-[0.16em] text-bone-dim"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
