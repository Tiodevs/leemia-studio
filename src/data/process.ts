export type Step = {
  index: string;
  title: string;
  description: string;
};

export const PROCESS: Step[] = [
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
];

export const STATS = [
  { value: "20+", label: "Projetos entregues" },
  { value: "1M+", label: "Pessoas impactadas" },
  { value: "1 sem", label: "Tempo médio de MVP" },
] as const;
