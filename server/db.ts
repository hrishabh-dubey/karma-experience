import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Supabase: use the pooler URL (port 6543, pooler.supabase.com) on Render
// so the connection uses IPv4; the direct URL (port 5432) can resolve to IPv6 and fail with ENETUNREACH.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("supabase.co")
    ? { rejectUnauthorized: false }
    : undefined,
});
export const db = drizzle(pool, { schema });
