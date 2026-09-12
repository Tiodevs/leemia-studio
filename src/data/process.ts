export type Step = {
  index: string;
  title: string;
  duration: string;
  description: string;
};

export const PROCESS: Step[] = [
  {
    index: "01",
    title: "Diagnóstico",
    duration: "3 a 5 dias",
    description:
      "Entendo o negócio, o público e o que precisa acontecer para o projeto ser considerado um sucesso. Saio daqui com escopo, prioridades e métricas claras.",
  },
  {
    index: "02",
    title: "Direção de arte",
    duration: "1 a 2 semanas",
    description:
      "Definição de identidade visual, tipografia, movimento e protótipo navegável. Você aprova a estética antes de qualquer linha de código de produção.",
  },
  {
    index: "03",
    title: "Construção",
    duration: "2 a 8 semanas",
    description:
      "Desenvolvimento em ciclos curtos com ambiente de preview sempre atualizado. Você acompanha o produto crescendo, sem surpresa no final.",
  },
  {
    index: "04",
    title: "Lançamento e evolução",
    duration: "contínuo",
    description:
      "Deploy, monitoramento, analytics e um plano de melhorias. O site entra no ar e continua evoluindo com base em dados reais de uso.",
  },
];

export const STATS = [
  { value: "10+", label: "Projetos entregues" },
  { value: "4", label: "Frentes de atuação" },
  { value: "100", label: "Score médio de performance" },
  { value: "24h", label: "Tempo médio de resposta" },
] as const;
