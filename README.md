# Leemia — Design, Code & IA aplicada

Site institucional da Leemia, estúdio de tecnologia que cria landing pages, sites
institucionais, sistemas web completos e automações com inteligência artificial.

Página única com estética editorial dark, tipografia de grande escala e animação
conduzida por GSAP: sequência de abertura, menu em tela cheia, revelações por
scroll e SVG animado derivado da malha da própria logo.

## Stack

| Camada    | Escolha                                        |
| --------- | ---------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19             |
| Linguagem | TypeScript                                     |
| Estilo    | Tailwind CSS v4 com tokens no `@theme`         |
| Animação  | GSAP 3 (ScrollTrigger, SplitText, DrawSVG)     |
| Scroll    | Lenis, sincronizado ao ticker do GSAP          |
| Fontes    | Space Grotesk, Instrument Serif, JetBrains Mono|

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run lint
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx           # fontes, metadata, shell do site
│   ├── page.tsx             # composição das seções
│   ├── globals.css          # tokens de design e utilitários
│   ├── icon.svg             # favicon derivado da marca
│   └── opengraph-image.tsx  # OG image gerada em build
├── components/
│   ├── SiteProvider.tsx     # scroll suave, trava de scroll, estado da intro
│   ├── Preloader.tsx        # sequência de abertura
│   ├── Header.tsx           # barra fixa + menu em tela cheia
│   ├── Hero.tsx             # headline principal
│   ├── MeshField.tsx        # ondas SVG de fundo
│   ├── Reveal.tsx           # utilitários de revelação por scroll
│   ├── Studio.tsx           # sobre o estúdio
│   ├── Services.tsx         # serviços em acordeão
│   ├── Work.tsx             # projetos
│   ├── Process.tsx          # etapas do processo
│   ├── Contact.tsx          # CTA e canais de contato
│   └── Footer.tsx
├── data/                    # conteúdo editável (serviços, projetos, contato)
└── lib/gsap.ts              # registro central dos plugins
```

## Editando o conteúdo

Todo o texto de negócio fica em `src/data/`:

- `site.ts` — e-mail, telefone/WhatsApp, redes sociais, navegação e URL canônica
- `services.ts` — as quatro frentes de serviço e seus entregáveis
- `projects.ts` — cases exibidos na seção de projetos
- `process.ts` — etapas do processo e números do estúdio

As imagens dos cases ficam em `public/projects/`. Para trocar um case, substitua
o arquivo mantendo a proporção 4:3.

## Acessibilidade e movimento

O site respeita `prefers-reduced-motion`: nesse modo a sequência de abertura é
ignorada, o scroll suave não é ativado e todo o conteúdo é renderizado no estado
final. O menu é operável por teclado e fecha com `Esc`.

## Deploy

Projeto estático de rota única, pronto para Vercel:

```bash
npx vercel
```

Antes de publicar, ajuste `SITE.url` em `src/data/site.ts` para o domínio final —
ele alimenta as tags canônicas, o Open Graph, o `sitemap.xml` e o `robots.txt`.
