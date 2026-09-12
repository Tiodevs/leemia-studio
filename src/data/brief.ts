export const BRIEF_STEPS = ["Projeto", "Empresa", "Contato"] as const;

export const START_OPTIONS = [
  "Imediato",
  "Próximas semanas",
  "Próximo trimestre",
  "Só pesquisando",
] as const;

export const TEAM_OPTIONS = [
  "1 a 5",
  "6 a 20",
  "21 a 100",
  "101 a 500",
  "500+",
] as const;

export const USER_OPTIONS = [
  "Até 10",
  "10 a 50",
  "50 a 200",
  "200 a 1.000",
  "Mais de 1.000",
  "Ainda não sei",
] as const;

export const BUDGET_OPTIONS = [
  "Até R$ 5 mil",
  "R$ 5 a 15 mil",
  "R$ 15 a 40 mil",
  "Acima de R$ 40 mil",
  "A definir",
] as const;

export const EXTRA_SERVICE_OPTIONS = ["Ainda não sei"] as const;

export type BriefForm = {
  services: string[];
  start: string;
  company: string;
  team: string;
  users: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const EMPTY_BRIEF_FORM: BriefForm = {
  services: [],
  start: "",
  company: "",
  team: "",
  users: "",
  budget: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};

export type BriefingResult =
  | { ok: true }
  | { ok: false; error: string };
