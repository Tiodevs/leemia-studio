export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  stack: string[];
  image: string;
  href: string;
  /** Show the artwork as a device mockup instead of a full-bleed screenshot. */
  framed?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "agendamentos",
    title: "Gestão de Agendamentos",
    category: "Sistema Web",
    year: "2025",
    summary:
      "Sistema completo para barbearia, petshop e negócios de hora marcada: agenda, profissionais, clientes e confirmações num painel só.",
    stack: ["Next.js", "Node", "PostgreSQL", "Auth"],
    image: "/projects/agendamentos.jpg",
    href: "https://agendamento.mefelipe.com.br/login",
  },
  {
    slug: "aspas-note",
    title: "Aspas Note",
    category: "IA aplicada",
    year: "2025",
    summary:
      "Anotações viram revisão inteligente. A IA aplica repetição espaçada para as frases certas voltarem na hora em que a memória precisa delas.",
    stack: ["Next.js", "IA", "Repetição espaçada"],
    image: "/projects/aspasnote-tablet.jpg",
    href: "https://aspasnote.mefelipe.com.br",
    framed: true,
  },
  {
    slug: "portfolio-fotos",
    title: "Portfólio de Fotos",
    category: "Site Institucional",
    year: "2025",
    summary:
      "Site para fotógrafo com álbuns, gestão de imagens e captura de leads — o visitante vê o trabalho e entra em contato no mesmo fluxo.",
    stack: ["Next.js", "Galeria", "Leads"],
    image: "/projects/fotos-macbook.jpg",
    href: "https://fotos.mefelipe.com.br/",
    framed: true,
  },
  {
    slug: "hub-jogos",
    title: "Hub de Jogos",
    category: "Sistema Web",
    year: "2025",
    summary:
      "Plataforma full stack de jogos em tempo real: partidas, salas e chat sincronizados por WebSocket, do lobby à partida.",
    stack: ["Full stack", "WebSocket", "Tempo real"],
    image: "/projects/jogos-iphone.jpg",
    href: "https://jogos.mefelipe.com.br/",
    framed: true,
  },
  {
    slug: "m2-lavagem",
    title: "M2 Beleza Automotiva",
    category: "Landing Page",
    year: "2025",
    summary:
      "Landing page para estética automotiva: serviços, processo e conversão direto no WhatsApp, com visual de estúdio.",
    stack: ["Next.js", "Conversão", "WhatsApp"],
    image: "/projects/m2-laptop.jpg",
    href: "https://m2-nine-nu.vercel.app/",
    framed: true,
  },
];
