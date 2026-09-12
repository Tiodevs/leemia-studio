export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  stack: string[];
  image: string;
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "agendamentos",
    title: "Sistema de Agendamentos",
    category: "Sistema Web",
    year: "2025",
    summary:
      "Plataforma de agendamento online em monorepo: API em Node com Express e painel em Next.js. Gestão de horários, profissionais e confirmações automáticas.",
    stack: ["Next.js", "Node", "Express", "PostgreSQL"],
    image: "/projects/agendamentos.png",
  },
  {
    slug: "gestao-logistica",
    title: "Gestão Logística",
    category: "Sistema Web",
    year: "2025",
    summary:
      "Painel de controle de rotas, cargas e entregas com indicadores em tempo real para a operação decidir sem planilha paralela.",
    stack: ["Next.js", "TypeScript", "Prisma", "Charts"],
    image: "/projects/logistica.png",
  },
  {
    slug: "colecao-copa",
    title: "Coleção Copa",
    category: "IA aplicada",
    year: "2026",
    summary:
      "O usuário fotografa a figurinha e a IA identifica a carta pelo código no verso, atualizando faltas e sobras do álbum automaticamente.",
    stack: ["Visão computacional", "Next.js", "Node", "OCR"],
    image: "/projects/colecao-copa.png",
  },
  {
    slug: "homenagem-virtual",
    title: "Homenagem Virtual",
    category: "Produto Digital",
    year: "2025",
    summary:
      "Memorial digital onde famílias reúnem fotos, textos e mensagens em uma página compartilhável, com upload de mídia e moderação.",
    stack: ["Next.js", "Node", "Storage", "Stripe"],
    image: "/projects/homenagem.png",
  },
  {
    slug: "mikis-art",
    title: "Miki's Art",
    category: "Site Institucional",
    year: "2025",
    summary:
      "Portfólio para fotógrafa com galeria em grid editorial, carregamento progressivo de imagens e contato direto para orçamento.",
    stack: ["Next.js", "GSAP", "Cloudinary"],
    image: "/projects/mikis-art.png",
  },
  {
    slug: "qrcode-studio",
    title: "QRCode Studio",
    category: "Ferramenta Web",
    year: "2024",
    summary:
      "Gerador de QR Codes personalizáveis com cores, logo central e exportação em alta resolução para material impresso.",
    stack: ["React", "Vite", "Tailwind", "Canvas"],
    image: "/projects/qrcode.png",
  },
];
