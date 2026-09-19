"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { submitBriefing } from "@/app/actions/briefing";
import { trackGenerateLead } from "@/lib/analytics";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useSite } from "@/components/SiteProvider";
import { SERVICES } from "@/data/services";
import {
  BRIEF_STEPS,
  BUDGET_OPTIONS,
  EMPTY_BRIEF_FORM,
  EXTRA_SERVICE_OPTIONS,
  START_OPTIONS,
  TEAM_OPTIONS,
  USER_OPTIONS,
  type BriefForm,
} from "@/data/brief";
import { CONTACT } from "@/data/site";

const STEPS = BRIEF_STEPS;
const SERVICE_OPTIONS = [
  ...SERVICES.map((service) => service.title),
  ...EXTRA_SERVICE_OPTIONS,
];

export function ProjectBrief() {
  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const opened = useRef(false);
  /** Height before the step swap, so the panel can resize instead of jumping. */
  const lastHeight = useRef(0);
  const trigger = useRef<HTMLElement | null>(null);

  const { briefOpen, closeBrief } = useSite();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<BriefForm>(EMPTY_BRIEF_FORM);

  const isLast = step === STEPS.length - 1;

  const set = useCallback(
    <K extends keyof BriefForm>(key: K, value: BriefForm[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const toggleService = useCallback((option: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(option)
        ? prev.services.filter((item) => item !== option)
        : [...prev.services, option],
    }));
  }, []);

  const goToStep = useCallback((next: number) => {
    lastHeight.current = panel.current?.offsetHeight ?? 0;
    setStep(next);
    body.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLast) {
      goToStep(step + 1);
      return;
    }
    void sendBrief();
  };

  const sendBrief = async () => {
    if (sending) return;

    setSending(true);
    setError("");

    const result = await submitBriefing(form);

    if (!result.ok) {
      setSending(false);
      setError(result.error);
      return;
    }

    lastHeight.current = panel.current?.offsetHeight ?? 0;
    setSending(false);
    setSent(true);
    trackGenerateLead({
      servicesCount: form.services.length,
      start: form.start,
      budget: form.budget,
      team: form.team,
    });
  };

  useEffect(() => {
    if (!briefOpen) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeBrief();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [briefOpen, closeBrief]);

  // Keeps tabbing inside the dialog while it is open.
  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panel.current) return;

    const focusable = panel.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useGSAP(
    () => {
      if (!briefOpen && !opened.current) return;

      const speed = prefersReducedMotion() ? 0 : 1;
      // Below md the panel behaves as a bottom sheet, so it slides up instead
      // of scaling into place.
      const sheet = !window.matchMedia("(min-width: 768px)").matches;
      const hidden = {
        autoAlpha: 0,
        yPercent: sheet ? 100 : 3,
        scale: sheet ? 1 : 0.97,
      };

      gsap.killTweensOf([backdrop.current, panel.current]);

      if (briefOpen) {
        opened.current = true;
        trigger.current = document.activeElement as HTMLElement | null;
        gsap.set(root.current, { pointerEvents: "auto" });

        gsap
          .timeline()
          .fromTo(
            backdrop.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5 * speed, ease: "power2.out" },
          )
          .fromTo(
            panel.current,
            hidden,
            {
              autoAlpha: 1,
              yPercent: 0,
              scale: 1,
              duration: 0.9 * speed,
              ease: EASE.expo,
            },
            0.05,
          )
          .from(
            "[data-brief-anim]",
            {
              y: 18,
              autoAlpha: 0,
              duration: 0.7 * speed,
              stagger: 0.045,
              ease: EASE.soft,
            },
            0.25,
          )
          // Waits for the panel to be painted: focus() is a no-op while GSAP
          // still holds it at visibility: hidden.
          .call(
            () => panel.current?.focus({ preventScroll: true }),
            undefined,
            0.3 * speed,
          );

        return;
      }

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(root.current, { pointerEvents: "none" });
            trigger.current?.focus({ preventScroll: true });
            setStep(0);
            setSending(false);
            setError("");
            if (sent) {
              setSent(false);
              setForm(EMPTY_BRIEF_FORM);
            }
          },
        })
        .to(panel.current, {
          ...hidden,
          duration: 0.45 * speed,
          ease: EASE.quart,
        })
        .to(
          backdrop.current,
          { autoAlpha: 0, duration: 0.4 * speed, ease: "power2.in" },
          0.05,
        );
    },
    { dependencies: [briefOpen], scope: root },
  );

  useGSAP(
    () => {
      if (!sent) {
        gsap.to("[data-brief-bar]", {
          scaleX: (step + 1) / STEPS.length,
          duration: prefersReducedMotion() ? 0 : 0.7,
          ease: EASE.quart,
        });
      }

      if (!briefOpen || prefersReducedMotion()) return;

      // The sheet already fills the mobile viewport; only the desktop dialog
      // needs to grow or shrink between steps.
      const el = panel.current;
      if (el && lastHeight.current && window.matchMedia("(min-width: 768px)").matches) {
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: "height" });
        gsap.fromTo(
          el,
          { height: lastHeight.current },
          {
            height: el.offsetHeight,
            duration: 0.6,
            ease: EASE.quart,
            onComplete: () => gsap.set(el, { clearProps: "height" }),
          },
        );
      }

      gsap.fromTo(
        "[data-brief-step] [data-brief-anim]",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: EASE.soft,
          overwrite: true,
        },
      );
    },
    { dependencies: [step, sent], scope: root },
  );

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-[80]"
      inert={!briefOpen}
    >
      <div
        ref={backdrop}
        onClick={closeBrief}
        className="invisible absolute inset-0 bg-ink/80 opacity-0 backdrop-blur-md"
      />

      <div className="absolute inset-0 flex items-end justify-center md:items-center md:p-6">
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="brief-title"
          tabIndex={-1}
          data-focus-shell
          onKeyDown={trapFocus}
          className="invisible relative flex max-h-[94svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-ink-line bg-ink-soft opacity-0 md:max-h-[88svh] md:rounded-2xl"
        >
          <span
            className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-ink-line md:hidden"
            aria-hidden="true"
          />

          <header className="flex items-start justify-between gap-6 px-5 pt-5 pb-6 md:px-8 md:pt-8">
            <div data-brief-anim>
              <p className="eyebrow">Briefing</p>
              <h2
                id="brief-title"
                className="display mt-3 text-[clamp(1.6rem,4.6vw,2.5rem)]"
              >
                {sent ? "Briefing recebido." : "Vamos ao seu projeto."}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeBrief}
              aria-label="Fechar formulário"
              className="group relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center"
            >
              <span className="absolute h-px w-5 rotate-45 bg-bone transition-colors duration-500 group-hover:bg-cyan" />
              <span className="absolute h-px w-5 -rotate-45 bg-bone transition-colors duration-500 group-hover:bg-cyan" />
            </button>
          </header>

          {sent ? (
            <div
              data-brief-step
              className="flex flex-1 flex-col justify-center px-5 pb-10 md:px-8"
            >
              <p
                data-brief-anim
                className="max-w-prose text-base leading-relaxed text-bone-dim"
              >
                Obrigado, {form.name || "tudo certo"}. Suas respostas já dão o
                contexto necessário para uma primeira proposta de escopo, prazo
                e investimento. Respondo em até 24h no e-mail informado.
              </p>
              <a
                data-brief-anim
                href={`mailto:${CONTACT.email}`}
                className="mt-6 self-start text-sm text-bone transition-colors hover:text-cyan"
              >
                {CONTACT.email}
              </a>
              <button
                data-brief-anim
                type="button"
                onClick={closeBrief}
                className="group relative mt-10 inline-flex self-start overflow-hidden rounded-full bg-cyan px-6 py-3 text-xs font-medium tracking-[0.14em] text-ink uppercase"
              >
                <span className="relative z-10">Fechar</span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
              <div data-brief-anim className="px-5 md:px-8">
                <div className="flex items-center gap-5">
                  {STEPS.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => goToStep(i)}
                      aria-current={i === step}
                      className={`font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-colors ${
                        i === step
                          ? "text-cyan"
                          : "text-bone-dim hover:text-bone"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <span className="mt-4 block h-px w-full bg-ink-line">
                  <span
                    data-brief-bar
                    className="block h-full origin-left scale-x-[0.333] bg-cyan"
                  />
                </span>
              </div>

              <div
                ref={body}
                data-lenis-prevent
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 md:min-h-[19rem] md:px-8"
              >
                <div data-brief-step className="space-y-9">
                  {step === 0 && (
                    <>
                      <ChipField
                        label="Tipo de serviço"
                        hint="Pode marcar mais de um."
                        options={SERVICE_OPTIONS}
                        value={form.services}
                        onSelect={toggleService}
                      />
                      <ChipField
                        label="Quando pretende começar"
                        options={START_OPTIONS}
                        value={form.start}
                        onSelect={(option) => set("start", option)}
                      />
                      <TextField
                        label="Descreva o que você precisa."
                        placeholder="Ex.: um portal para clientes acompanharem pedidos"
                        value={form.message}
                        onChange={(value) => set("message", value)}
                        multiline
                      />
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <TextField
                        label="Empresa"
                        placeholder="Nome da empresa"
                        value={form.company}
                        onChange={(value) => set("company", value)}
                      />
                      <ChipField
                        label="Pessoas na empresa"
                        options={TEAM_OPTIONS}
                        value={form.team}
                        onSelect={(option) => set("team", option)}
                      />
                      <ChipField
                        label="Pessoas que vão usar a aplicação"
                        hint="Uma média já ajuda a dimensionar a infraestrutura."
                        options={USER_OPTIONS}
                        value={form.users}
                        onSelect={(option) => set("users", option)}
                      />
                      <ChipField
                        label="Investimento previsto"
                        options={BUDGET_OPTIONS}
                        value={form.budget}
                        onSelect={(option) => set("budget", option)}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <TextField
                        label="Nome"
                        placeholder="Como devo te chamar"
                        value={form.name}
                        onChange={(value) => set("name", value)}
                        autoComplete="name"
                        required
                      />
                      <TextField
                        label="E-mail"
                        type="email"
                        placeholder="voce@empresa.com.br"
                        value={form.email}
                        onChange={(value) => set("email", value)}
                        autoComplete="email"
                        required
                      />
                      <TextField
                        label="WhatsApp"
                        type="tel"
                        inputMode="tel"
                        placeholder="(11) 90000-0000"
                        value={form.phone}
                        onChange={(value) => set("phone", value)}
                        autoComplete="tel"
                      />
                      <p
                        data-brief-anim
                        className="text-xs leading-relaxed text-bone-dim"
                      >
                        Respondo em até 24h com uma proposta de escopo, prazo e
                        investimento. Sem disparo automático e sem lista de
                        e-mails.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div
                data-brief-anim
                className="flex flex-col gap-3 border-t border-ink-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8 md:py-5"
              >
                {error ? (
                  <p role="alert" className="text-xs text-cyan">
                    {error}
                  </p>
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => (step === 0 ? closeBrief() : goToStep(step - 1))}
                    className="text-xs tracking-[0.16em] text-bone-dim uppercase transition-colors hover:text-bone"
                  >
                    {step === 0 ? "Cancelar" : "Voltar"}
                  </button>

                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="group relative inline-flex overflow-hidden rounded-full bg-cyan px-6 py-3 text-xs font-medium tracking-[0.14em] text-ink uppercase disabled:cursor-wait disabled:opacity-70"
                  >
                    <span className="relative z-10">
                      {sending
                        ? "Enviando..."
                        : isLast
                          ? "Enviar briefing"
                          : "Avançar"}
                    </span>
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

type ChipFieldProps = {
  label: string;
  hint?: string;
  options: readonly string[];
  value: string | string[];
  onSelect: (option: string) => void;
};

function ChipField({ label, hint, options, value, onSelect }: ChipFieldProps) {
  const isOn = (option: string) =>
    Array.isArray(value) ? value.includes(option) : value === option;

  return (
    <fieldset data-brief-anim>
      <legend className="eyebrow">{label}</legend>
      {hint && <p className="mt-2 text-xs text-bone-dim">{hint}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={isOn(option)}
            onClick={() => onSelect(option)}
            className={`rounded-full border px-4 py-2 text-[0.6875rem] tracking-[0.08em] transition-colors duration-300 ${
              isOn(option)
                ? "border-cyan bg-cyan text-ink"
                : "border-ink-line text-bone-dim hover:border-cyan hover:text-cyan"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  multiline?: boolean;
  required?: boolean;
};

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  multiline,
  required,
}: TextFieldProps) {
  const className =
    "mt-3 w-full border-b border-ink-line bg-transparent pb-3 text-base text-bone transition-colors placeholder:text-bone-dim/50 focus:border-cyan";

  return (
    <label data-brief-anim className="block">
      <span className="eyebrow">{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          className="mt-3 w-full resize-none rounded-sm border border-ink-line bg-transparent px-3 py-3 text-base text-bone outline-none transition-colors placeholder:text-bone-dim/50 focus:border-cyan"
        />
      ) : (
        <input
          type={type}
          value={value}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      )}
    </label>
  );
}
