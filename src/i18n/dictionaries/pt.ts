import type { Dictionary } from "../get-dictionary";

const pt: Dictionary = {
  meta: {
    title: "Leemia — Design, Code & IA aplicada",
    description:
      "Estúdio de tecnologia que cria landing pages, sites institucionais, sistemas web completos e automações com inteligência artificial.",
    keywords: [
      "landing page",
      "site institucional",
      "sistema web",
      "automação com IA",
      "desenvolvimento web",
      "Next.js",
      "Leemia",
    ],
  },
  nav: {
    links: [
      { label: "Sobre", href: "#estudio" },
      { label: "Serviços", href: "#servicos" },
      { label: "Projetos", href: "#projetos" },
      { label: "Processo", href: "#processo" },
      { label: "Contato", href: "#contato" },
    ],
    startProject: "Iniciar projeto",
    menu: "Menu",
    close: "Fechar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    home: "Leemia — início",
    contactLabel: "Contato",
    networksLabel: "Redes",
    baseLabel: "Base",
    remote: "Atendimento remoto global",
    switchTo: "English",
    langCode: "EN",
  },
  hero: {
    eyebrow: "Software House · Desde 2020",
    location: "Curitiba, Brasil",
    lines: ["Sistemas web", "LP &", "IA aplicada"],
    bodyBefore: "A Leemia desenha, programa e automatiza produtos digitais.",
    bodyStrong:
      "Landing pages, sites institucionais, sistemas web completos",
    bodyAfter:
      "e inteligência artificial aplicada aos processos da sua empresa.",
    ctaPrimary: "Começar um projeto",
    ctaSecondary: "Ver projetos",
    scrollNext: "Rolar para a próxima seção",
  },
  marquee: [
    "Sistemas Web",
    "IA aplicada",
    "Landing Pages",
    "Sites Institucionais",
    "Automação",
    "Design de Interface",
  ],
  studio: {
    eyebrow: "A nossa empresa",
    title: "Uma software house que constrói produto de ponta a ponta.",
    p1: "A Leemia nasceu da união entre design, engenharia e inteligência artificial. Em vez de repassar seu projeto por uma corrente de pessoas, você fala direto com quem desenha a interface, escreve o código e sobe tudo em produção.",
    p2: "Isso significa menos ruído, decisões mais rápidas e um produto coerente do primeiro pixel ao último deploy. Cada entrega é medida por performance, clareza e o impacto real no negócio de quem contratou.",
    stats: [
      { value: "6", label: "Anos de empresa" },
      { value: "20+", label: "Projetos entregues" },
      { value: "1M+", label: "Pessoas impactadas" },
      { value: "1 sem", label: "Tempo médio de MVP" },
    ],
  },
  services: {
    eyebrow: "Serviços",
    title: "4 serviços para atender a dor da sua empresa",
    items: [
      {
        id: "sistemas-web",
        index: "01",
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
        id: "ia-aplicada",
        index: "02",
        title: "IA aplicada",
        summary:
          "Automação de processos internos com IA: agentes, integrações e pipelines que eliminam trabalho repetitivo e devolvem horas para o time.",
        deliverables: [
          "Mapeamento de processos",
          "Agentes e RAG sobre dados próprios",
          "Integrações via API e webhooks",
          "Monitoramento de custo e qualidade",
        ],
      },
      {
        id: "landing-pages",
        index: "03",
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
        index: "04",
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
    ],
  },
  work: {
    eyebrow: "Projetos",
    title: "Trabalhos selecionados.",
    openProject: "Ver projeto",
    imageAlt: "Interface do projeto {title}",
  },
  projectPage: {
    back: "Todos os projetos",
    visitLive: "Ver ao vivo",
    role: "Entrega",
    context: "Contexto",
    year: "Ano",
    stack: "Stack",
    challenge: "O problema",
    solution: "Como foi resolvido",
    highlights: "O que entra no produto",
    gallery: "Telas",
    openImage: "Ampliar imagem",
    close: "Fechar",
    previous: "Imagem anterior",
    next: "Próxima imagem",
    nextProject: "Próximo projeto",
  },
  projects: [
    {
      slug: "agendamentos",
      title: "Gestão de Agendamentos",
      category: "Sistema Web",
      year: "2025",
      summary:
        "Sistema completo para barbearia, petshop e negócios de hora marcada: agenda, profissionais, clientes e confirmações num painel só.",
      stack: ["Next.js", "Node", "PostgreSQL", "Auth"],
      image: "/projects/agendamentos/hero.jpg",
      href: "https://agendamento.mefelipe.com.br",
      caseStudy: {
        role: "Produto, interface e engenharia",
        context: "Estúdio Leemia",
        overview:
          "Agenda online para negócios de hora marcada, no ar como a agenda do estúdio Leemia. O cliente cria a conta, escolhe o serviço e sai com um horário livre de verdade — confirmado por e-mail, sem passar por mensagem.",
        challenge:
          "Marcar por conversa espalha o dia entre várias pessoas. O cliente não vê o que ainda está livre, a equipe não tem a agenda num lugar só, e dois encaixes podem cair no mesmo profissional.",
        solution:
          "Um produto com três áreas. O cliente reserva sozinho. A administração opera catálogo, equipe e expediente. O profissional acompanha os próprios atendimentos. A regra de horário fica na API: Next.js no front, Node e PostgreSQL com Prisma por baixo.",
        highlights: [
          {
            title: "Reserva em três passos",
            body: "Serviço, profissional que realiza aquele atendimento e horário livre. A grade anda de 15 em 15 minutos, no fuso de São Paulo. Dia fechado, horário passado ou slot ocupado não aparece como opção.",
          },
          {
            title: "Conflito travado no banco",
            body: "Dois clientes não ocupam o mesmo profissional no mesmo intervalo. A API segura a vaga na transação e o PostgreSQL recusa a sobreposição. Cancelamento e falta devolvem o horário.",
          },
          {
            title: "Estúdio, equipe e expediente",
            body: "O painel administrativo cuida de serviços, profissionais, horário da casa, feriados e folga individual. O profissional vê a própria agenda e avança o status do atendimento.",
          },
          {
            title: "Preço e confirmação",
            body: "A reserva congela o preço do momento. Cliente e profissional recebem e-mail quando o horário é criado, e o cliente é avisado se cancelar. Cadastro, troca de e-mail e senha têm fluxo próprio, com papéis separados para cliente, equipe e administração.",
          },
        ],
        gallery: [
          {
            src: "/projects/agendamentos/hero.jpg",
            alt: "Página inicial da agenda do estúdio, com a reserva em três passos",
            caption:
              "A entrada do produto mostra a reserva e deixa claro que o horário não é compartilhado entre dois clientes.",
            wide: true,
            width: 1440,
            height: 900,
          },
          {
            src: "/projects/agendamentos/fluxo.jpg",
            alt: "Fluxo de agendamento com escolha do profissional",
            caption:
              "Serviço, profissional que faz aquele atendimento e horário livre. Preço e duração aparecem antes da reserva.",
            wide: true,
            width: 1440,
            height: 980,
          },
          {
            src: "/projects/agendamentos/servicos.jpg",
            alt: "Catálogo público de serviços com duração e preço",
            caption:
              "O catálogo público lista cada serviço com a duração real e o preço atual do estúdio.",
            wide: true,
            width: 1440,
            height: 900,
          },
          {
            src: "/projects/agendamentos/login.jpg",
            alt: "Tela de entrada da conta",
            caption: "Entrada da conta, com recuperação de senha.",
            width: 1440,
            height: 980,
          },
          {
            src: "/projects/agendamentos/cadastro.jpg",
            alt: "Tela de cadastro do cliente",
            caption:
              "Cadastro do cliente, com telefone opcional e a regra de senha visível enquanto digita.",
            width: 1440,
            height: 980,
          },
        ],
      },
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
  ],
  process: {
    eyebrow: "Processo",
    title: "Do briefing ao deploy, sem caixa-preta.",
    steps: [
      {
        index: "01",
        title: "Diagnóstico",
        description:
          "Entendo o negócio, o público e o que precisa acontecer para o projeto ser considerado um sucesso. Saio daqui com escopo, prioridades e métricas claras.",
      },
      {
        index: "02",
        title: "Direção de arte",
        description:
          "Definição de identidade visual, tipografia, movimento e protótipo navegável. Você aprova a estética antes de qualquer linha de código de produção.",
      },
      {
        index: "03",
        title: "Construção",
        description:
          "Desenvolvimento em ciclos curtos com ambiente de preview sempre atualizado. Você acompanha o produto crescendo, sem surpresa no final.",
      },
      {
        index: "04",
        title: "Lançamento e evolução",
        description:
          "Deploy, monitoramento, analytics e um plano de melhorias. O site entra no ar e continua evoluindo com base em dados reais de uso.",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    headline: ["Vamos construir", "algo bom."],
    follow: "Siga",
    formEyebrow: "Contato",
    formIntro:
      "Deixe nome, e-mail e WhatsApp. Respondo em até 24h e fazemos o briefing juntos.",
    name: "Nome",
    namePlaceholder: "Como devo te chamar",
    email: "E-mail",
    emailPlaceholder: "voce@empresa.com.br",
    phone: "WhatsApp",
    phonePlaceholder: "(11) 90000-0000",
    preferEmail: "Prefere e-mail?",
    submit: "Enviar contato",
    sending: "Enviando...",
    thanks:
      "Obrigado, {name}. Recebi seus dados e respondo em até 24h no e-mail informado — aí fazemos o briefing juntos.",
    sendAnother: "Enviar outro contato",
    fallbackName: "tudo certo",
  },
  footer: {
    rights: "Todos os direitos reservados",
    backToTop: "Voltar ao topo ↑",
  },
  menu: {
    baseCity: "Curitiba, Brasil",
  },
};

export default pt;
