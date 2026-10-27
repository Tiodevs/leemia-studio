import type { Dictionary } from "../get-dictionary";

const en: Dictionary = {
  meta: {
    title: "Leemia — Design, Code & Applied AI",
    description:
      "A technology studio that builds landing pages, corporate websites, full web systems, and AI-powered automation.",
    keywords: [
      "landing page",
      "corporate website",
      "web system",
      "AI automation",
      "web development",
      "Next.js",
      "Leemia",
    ],
  },
  nav: {
    links: [
      { label: "About", href: "#estudio" },
      { label: "Services", href: "#servicos" },
      { label: "Work", href: "#projetos" },
      { label: "Process", href: "#processo" },
      { label: "Contact", href: "#contato" },
    ],
    startProject: "Start a project",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Leemia — home",
    contactLabel: "Contact",
    networksLabel: "Social",
    baseLabel: "Base",
    remote: "Global remote delivery",
    switchTo: "Português",
    langCode: "PT",
  },
  hero: {
    eyebrow: "Software House · Since 2020",
    location: "Curitiba, Brazil",
    lines: ["Web systems", "LP &", "Applied AI"],
    bodyBefore: "Leemia designs, builds, and automates digital products.",
    bodyStrong: "Landing pages, corporate websites, full web systems",
    bodyAfter: "and artificial intelligence applied to your company's processes.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See work",
    scrollNext: "Scroll to the next section",
  },
  marquee: [
    "Web Systems",
    "Applied AI",
    "Landing Pages",
    "Corporate Websites",
    "Automation",
    "Interface Design",
  ],
  studio: {
    eyebrow: "Our company",
    title: "A software house that builds product end to end.",
    p1: "Leemia was born from the intersection of design, engineering, and artificial intelligence. Instead of handing your project down a chain of people, you talk directly with whoever designs the interface, writes the code, and ships it to production.",
    p2: "That means less noise, faster decisions, and a coherent product from the first pixel to the last deploy. Every delivery is measured by performance, clarity, and real business impact.",
    stats: [
      { value: "6", label: "Years in business" },
      { value: "20+", label: "Projects delivered" },
      { value: "1M+", label: "People reached" },
      { value: "1 wk", label: "Average MVP time" },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "4 services built around your company's pain points",
    items: [
      {
        id: "sistemas-web",
        index: "01",
        title: "Web Systems",
        summary:
          "Complete platforms: dashboards, ERPs, client portals, and SaaS. From data modeling to deploy, with code someone else can maintain.",
        deliverables: [
          "Architecture and modeling",
          "API, auth, and permissions",
          "Dashboards and reports",
          "Deploy, CI/CD, and observability",
        ],
      },
      {
        id: "ia-aplicada",
        index: "02",
        title: "Applied AI",
        summary:
          "Internal process automation with AI: agents, integrations, and pipelines that remove repetitive work and give hours back to the team.",
        deliverables: [
          "Process mapping",
          "Agents and RAG on your own data",
          "API and webhook integrations",
          "Cost and quality monitoring",
        ],
      },
      {
        id: "landing-pages",
        index: "03",
        title: "Landing Pages",
        summary:
          "High-conversion pages built on copy, visual hierarchy, and performance. Every section exists to move the visitor to the next step.",
        deliverables: [
          "Custom design",
          "Conversion-focused copy",
          "Technical SEO and Core Web Vitals",
          "A/B tests and analytics",
        ],
      },
      {
        id: "sites-institucionais",
        index: "04",
        title: "Corporate Websites",
        summary:
          "Your company's digital presence with strong identity, editable content, and an architecture ready to grow with the business.",
        deliverables: [
          "Digital identity",
          "Headless CMS",
          "Blog and dynamic pages",
          "Accessibility and multi-language",
        ],
      },
    ],
  },
  work: {
    eyebrow: "Work",
    title: "Selected projects.",
    openProject: "View project",
    imageAlt: "Project interface for {title}",
  },
  projectPage: {
    back: "All projects",
    visitLive: "View live",
    role: "Delivery",
    context: "Context",
    year: "Year",
    stack: "Stack",
    challenge: "The problem",
    solution: "How it was solved",
    highlights: "What the product includes",
    gallery: "Screens",
    openImage: "Enlarge image",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    nextProject: "Next project",
  },
  projects: [
    {
      slug: "agendamentos",
      title: "Scheduling Platform",
      category: "Web System",
      year: "2025",
      summary:
        "A complete system for barbershops, pet shops, and appointment-based businesses: calendar, staff, clients, and confirmations in one panel.",
      stack: ["Next.js", "Node", "PostgreSQL", "Auth"],
      image: "/projects/agendamentos/hero.jpg",
      href: "https://agendamento.mefelipe.com.br",
      caseStudy: {
        role: "Product, interface, and engineering",
        context: "Leemia studio",
        overview:
          "An online calendar for appointment-based businesses, live as the Leemia studio agenda. A client creates an account, picks a service, and leaves with a time that is actually free — confirmed by email, without a back-and-forth message.",
        challenge:
          "Booking through chat spreads the day across several people. The client cannot see what is still open, the team has no single agenda, and two bookings can land on the same professional.",
        solution:
          "One product with three areas. The client books alone. Admin runs the catalog, the team, and opening hours. Each professional follows their own appointments. Availability lives in the API: Next.js on the front, Node and PostgreSQL with Prisma underneath.",
        highlights: [
          {
            title: "Booking in three steps",
            body: "Service, the professional who performs it, and an open time. The grid moves in 15-minute steps, on São Paulo time. A closed day, a past slot, or a taken interval never shows up as a choice.",
          },
          {
            title: "Conflicts locked in the database",
            body: "Two clients cannot take the same professional in the same interval. The API holds the slot inside a transaction and PostgreSQL rejects the overlap. A cancellation or a no-show releases the time.",
          },
          {
            title: "Studio, team, and hours",
            body: "The admin panel manages services, professionals, studio hours, holidays, and individual time off. A professional sees their own agenda and moves the appointment status forward.",
          },
          {
            title: "Price and confirmation",
            body: "The booking freezes the price at that moment. Client and professional get an email when the time is created, and the client is notified if they cancel. Sign-up, email change, and password each have their own flow, with separate roles for client, staff, and admin.",
          },
        ],
        gallery: [
          {
            src: "/projects/agendamentos/hero.jpg",
            alt: "Studio agenda homepage with the three-step booking",
            caption:
              "The product entry shows the booking and makes it clear the time is not shared by two clients.",
            wide: true,
            width: 1440,
            height: 900,
          },
          {
            src: "/projects/agendamentos/fluxo.jpg",
            alt: "Booking flow on the professional step",
            caption:
              "Service, the professional who performs it, and an open time. Price and duration show up before the booking.",
            wide: true,
            width: 1440,
            height: 980,
          },
          {
            src: "/projects/agendamentos/servicos.jpg",
            alt: "Public service catalog with duration and price",
            caption:
              "The public catalog lists each service with its real duration and the studio’s current price.",
            wide: true,
            width: 1440,
            height: 900,
          },
          {
            src: "/projects/agendamentos/login.jpg",
            alt: "Account sign-in screen",
            caption: "Account sign-in, with password recovery.",
            width: 1440,
            height: 980,
          },
          {
            src: "/projects/agendamentos/cadastro.jpg",
            alt: "Client registration screen",
            caption:
              "Client registration, with an optional phone number and the password rule visible while typing.",
            width: 1440,
            height: 980,
          },
        ],
      },
    },
    {
      slug: "aspas-note",
      title: "Aspas Note",
      category: "Applied AI",
      year: "2025",
      summary:
        "Notes become smart review. AI applies spaced repetition so the right phrases come back when memory needs them.",
      stack: ["Next.js", "AI", "Spaced repetition"],
      image: "/projects/aspasnote-tablet.jpg",
      href: "https://aspasnote.mefelipe.com.br",
      framed: true,
    },
    {
      slug: "portfolio-fotos",
      title: "Photo Portfolio",
      category: "Corporate Website",
      year: "2025",
      summary:
        "A photographer site with albums, image management, and lead capture — visitors see the work and get in touch in the same flow.",
      stack: ["Next.js", "Gallery", "Leads"],
      image: "/projects/fotos-macbook.jpg",
      href: "https://fotos.mefelipe.com.br/",
      framed: true,
    },
    {
      slug: "hub-jogos",
      title: "Games Hub",
      category: "Web System",
      year: "2025",
      summary:
        "A full-stack real-time games platform: matches, rooms, and chat synced over WebSocket, from lobby to play.",
      stack: ["Full stack", "WebSocket", "Real-time"],
      image: "/projects/jogos-iphone.jpg",
      href: "https://jogos.mefelipe.com.br/",
      framed: true,
    },
    {
      slug: "m2-lavagem",
      title: "M2 Auto Detailing",
      category: "Landing Page",
      year: "2025",
      summary:
        "A landing page for auto detailing: services, process, and conversion straight to WhatsApp, with a studio look.",
      stack: ["Next.js", "Conversion", "WhatsApp"],
      image: "/projects/m2-laptop.jpg",
      href: "https://m2-nine-nu.vercel.app/",
      framed: true,
    },
  ],
  process: {
    eyebrow: "Process",
    title: "From briefing to deploy — no black box.",
    steps: [
      {
        index: "01",
        title: "Discovery",
        description:
          "I learn the business, the audience, and what needs to happen for the project to count as a success. We leave with clear scope, priorities, and metrics.",
      },
      {
        index: "02",
        title: "Art direction",
        description:
          "Visual identity, typography, motion, and a navigable prototype. You approve the look before any production code is written.",
      },
      {
        index: "03",
        title: "Build",
        description:
          "Development in short cycles with a preview environment always up to date. You watch the product grow — no surprise at the end.",
      },
      {
        index: "04",
        title: "Launch & evolve",
        description:
          "Deploy, monitoring, analytics, and an improvement plan. The site goes live and keeps evolving from real usage data.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline: ["Let's build", "something good."],
    follow: "Follow",
    formEyebrow: "Contact",
    formIntro:
      "Leave your name, email, and WhatsApp. I'll reply within 24h and we'll do the briefing together.",
    name: "Name",
    namePlaceholder: "What should I call you",
    email: "Email",
    emailPlaceholder: "you@company.com",
    phone: "WhatsApp",
    phonePlaceholder: "+1 (555) 000-0000",
    preferEmail: "Prefer email?",
    submit: "Send contact",
    sending: "Sending...",
    thanks:
      "Thanks, {name}. I received your details and will reply within 24h at the email you shared — then we'll do the briefing together.",
    sendAnother: "Send another contact",
    fallbackName: "all set",
  },
  footer: {
    rights: "All rights reserved",
    backToTop: "Back to top ↑",
  },
  menu: {
    baseCity: "Curitiba, Brazil",
  },
};

export default en;
