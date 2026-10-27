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

/** Contact-only lead capture; the full briefing happens later offline. */
export type ContactLeadForm = {
  name: string;
  email: string;
  phone: string;
};

export const EMPTY_CONTACT_LEAD: ContactLeadForm = {
  name: "",
  email: "",
  phone: "",
};

export function toBriefPayload(lead: ContactLeadForm): BriefForm {
  return {
    services: [],
    start: "",
    company: "",
    team: "",
    users: "",
    budget: "",
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: "",
  };
}

export type BriefingResult =
  | { ok: true }
  | { ok: false; error: string };
