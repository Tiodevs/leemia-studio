export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    id: "landing-pages",
    index: "01",
    title: "Landing Pages",
    summary:
      "Páginas de alta conversão construídas em cima de copy, hierarquia visual e performance. Cada seção existe para levar o visitante ao próximo passo.",
    deliverables: [
      "Design sob medida",
      "Copy orientada a conversão",
      "SEO técnico e Core Web Vitals",
      "Testes A/B e analytics",
    ],
  },
  {
    id: "sites-institucionais",
    index: "02",
    title: "Sites Institucionais",
    summary:
      "A presença digital da sua empresa com identidade forte, conteúdo editável e arquitetura pensada para crescer junto com o negócio.",
    deliverables: [
      "Identidade digital",
      "CMS headless",
      "Blog e páginas dinâmicas",
      "Acessibilidade e multi-idioma",
    ],
  },
  {
    id: "sistemas-web",
    index: "03",
    title: "Sistemas Web",
    summary:
      "Plataformas completas: dashboards, ERPs, portais de cliente e SaaS. Do modelo de dados ao deploy, com código que outra pessoa consegue manter.",
    deliverables: [
      "Arquitetura e modelagem",
      "API, autenticação e permissões",
      "Painéis e relatórios",
      "Deploy, CI/CD e observabilidade",
    ],
  },
  {
    id: "ai-workflows",
    index: "04",
    title: "AI Workflows",
    summary:
      "Automação de processos internos com IA: agentes, integrações e pipelines que eliminam trabalho repetitivo e devolvem horas para o time.",
    deliverables: [
      "Mapeamento de processos",
      "Agentes e RAG sobre dados próprios",
      "Integrações via API e webhooks",
      "Monitoramento de custo e qualidade",
    ],
  },
];
