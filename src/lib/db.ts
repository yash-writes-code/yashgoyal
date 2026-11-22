import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default sql;

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS activity_categories (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      color TEXT NOT NULL DEFAULT '#888880',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS activity_entries (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      productive_hours NUMERIC(4,2) NOT NULL,
      activity TEXT NOT NULL,
      category_id INTEGER NOT NULL REFERENCES activity_categories(id),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
