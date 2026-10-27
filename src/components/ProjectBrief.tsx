"use client";

import { useCallback, useState, type FormEvent } from "react";
import { submitBriefing } from "@/app/actions/briefing";
import { trackGenerateLead } from "@/lib/analytics";
import {
  EMPTY_CONTACT_LEAD,
  toBriefPayload,
  type ContactLeadForm,
} from "@/data/brief";
import { useSite } from "@/components/SiteProvider";
import { CONTACT } from "@/data/site";

export function ProjectBrief() {
  const { dictionary } = useSite();
  const t = dictionary.contact;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ContactLeadForm>(EMPTY_CONTACT_LEAD);

  const set = useCallback(
    <K extends keyof ContactLeadForm>(key: K, value: ContactLeadForm[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const reset = useCallback(() => {
    setSent(false);
    setSending(false);
    setError("");
    setForm(EMPTY_CONTACT_LEAD);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setError("");

    const result = await submitBriefing(toBriefPayload(form));

    if (!result.ok) {
      setSending(false);
      setError(result.error);
      return;
    }

    setSending(false);
    setSent(true);
    trackGenerateLead();
  };

  if (sent) {
    return (
      <div id="briefing" className="scroll-mt-24 space-y-5">
        <p className="eyebrow">{t.formEyebrow}</p>
        <p className="text-base leading-relaxed text-bone-dim">
          {t.thanks.replace("{name}", form.name || t.fallbackName)}
        </p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-block text-sm text-bone transition-colors hover:text-cyan"
        >
          {CONTACT.email}
        </a>
        <div>
          <button
            type="button"
            onClick={reset}
            className="mt-2 text-xs tracking-[0.16em] text-bone-dim uppercase transition-colors hover:text-cyan"
          >
            {t.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="briefing"
      onSubmit={onSubmit}
      className="scroll-mt-24 space-y-7"
      noValidate
    >
      <div>
        <p className="eyebrow">{t.formEyebrow}</p>
        <p className="mt-3 text-base leading-relaxed text-bone-dim">
          {t.formIntro}
        </p>
      </div>

      <label className="block">
        <span className="eyebrow">{t.name}</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          value={form.name}
          placeholder={t.namePlaceholder}
          onChange={(event) => set("name", event.target.value)}
          className="mt-3 w-full border-b border-ink-line bg-transparent pb-3 text-base text-bone outline-none transition-colors placeholder:text-bone-dim/50 focus:border-cyan"
        />
      </label>

      <label className="block">
        <span className="eyebrow">{t.email}</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={form.email}
          placeholder={t.emailPlaceholder}
          onChange={(event) => set("email", event.target.value)}
          className="mt-3 w-full border-b border-ink-line bg-transparent pb-3 text-base text-bone outline-none transition-colors placeholder:text-bone-dim/50 focus:border-cyan"
        />
      </label>

      <label className="block">
        <span className="eyebrow">{t.phone}</span>
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          placeholder={t.phonePlaceholder}
          onChange={(event) => set("phone", event.target.value)}
          className="mt-3 w-full border-b border-ink-line bg-transparent pb-3 text-base text-bone outline-none transition-colors placeholder:text-bone-dim/50 focus:border-cyan"
        />
      </label>

      {error ? (
        <p role="alert" className="text-xs text-cyan">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs text-bone-dim">
          {t.preferEmail}{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-bone transition-colors hover:text-cyan"
          >
            {CONTACT.email}
          </a>
        </p>

        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="group relative inline-flex overflow-hidden rounded-full bg-cyan px-6 py-3 text-xs font-medium tracking-[0.14em] text-ink-deep uppercase disabled:cursor-wait disabled:opacity-70"
        >
          <span className="relative z-10">
            {sending ? t.sending : t.submit}
          </span>
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
        </button>
      </div>
    </form>
  );
}
