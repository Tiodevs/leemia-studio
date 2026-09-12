import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

export const pool = new Pool({
  connectionString,
  max: 5,
  ssl: connectionString.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

export async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS briefings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      services TEXT[] NOT NULL DEFAULT '{}',
      start_timing TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      team_size TEXT NOT NULL DEFAULT '',
      users_count TEXT NOT NULL DEFAULT '',
      budget TEXT NOT NULL DEFAULT '',
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      ip TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS briefings_created_at_idx
    ON briefings (created_at DESC)
  `);
}
