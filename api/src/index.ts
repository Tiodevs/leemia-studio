import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { migrate, pool } from "./db";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  START_OPTIONS,
  TEAM_OPTIONS,
  USER_OPTIONS,
} from "./options";

const port = Number(process.env.PORT) || 8080;
const apiSecret = process.env.API_SECRET ?? "";
const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const briefingSchema = z.object({
  services: z
    .array(z.enum(SERVICE_OPTIONS))
    .max(SERVICE_OPTIONS.length)
    .default([]),
  start: z.enum(START_OPTIONS).or(z.literal("")).default(""),
  company: z.string().trim().max(200).default(""),
  team: z.enum(TEAM_OPTIONS).or(z.literal("")).default(""),
  users: z.enum(USER_OPTIONS).or(z.literal("")).default(""),
  budget: z.enum(BUDGET_OPTIONS).or(z.literal("")).default(""),
  name: z.string().trim().min(2, "Informe seu nome.").max(120),
  email: z.string().trim().email("Informe um e-mail válido.").max(254),
  phone: z.string().trim().max(40).default(""),
  message: z.string().trim().max(4000).default(""),
});

const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(header: string | undefined) {
  return header?.split(",")[0]?.trim() || "unknown";
}

function allowRequest(ip: string, limit = 8, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const current = hits.get(ip);

  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  current.count += 1;
  return current.count <= limit;
}

const app = new Hono();

app.use(
  "*",
  cors({
    origin: (origin) => (origin && allowedOrigins.has(origin) ? origin : ""),
    allowHeaders: ["Content-Type", "x-api-key"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    maxAge: 86400,
  }),
);

app.get("/health", (c) => c.json({ ok: true }));

app.post("/briefings", async (c) => {
  if (!apiSecret) {
    return c.json(
      { ok: false, error: "API_SECRET não configurado no servidor." },
      500,
    );
  }

  const provided = c.req.header("x-api-key");
  if (provided !== apiSecret) {
    return c.json({ ok: false, error: "Não autorizado." }, 401);
  }

  const ip = clientIp(
    c.req.header("x-forwarded-for") ?? c.req.header("x-real-ip"),
  );
  if (!allowRequest(ip)) {
    return c.json(
      { ok: false, error: "Muitas tentativas. Aguarde alguns minutos." },
      429,
    );
  }

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "JSON inválido." }, 400);
  }

  const parsed = briefingSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return c.json({ ok: false, error: first }, 400);
  }

  const data = parsed.data;
  const userAgent = c.req.header("user-agent")?.slice(0, 400) ?? null;

  try {
    const result = await pool.query<{ id: string }>(
      `INSERT INTO briefings (
        services, start_timing, company, team_size, users_count, budget,
        name, email, phone, message, ip, user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id`,
      [
        data.services,
        data.start,
        data.company,
        data.team,
        data.users,
        data.budget,
        data.name,
        data.email.toLowerCase(),
        data.phone,
        data.message,
        ip === "unknown" ? null : ip,
        userAgent,
      ],
    );

    return c.json({ ok: true, id: result.rows[0]?.id }, 201);
  } catch (error) {
    console.error("Failed to insert briefing", error);
    return c.json(
      { ok: false, error: "Não foi possível salvar o briefing." },
      500,
    );
  }
});

await migrate();

serve({ fetch: app.fetch, port }, () => {
  console.log(`Leemia API listening on ${port}`);
});
