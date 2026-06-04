import { Pool, type QueryResultRow } from "pg";

export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL
    })
  : null;

export async function query<T extends QueryResultRow>(sql: string, values: unknown[] = []) {
  if (!pool) {
    return null;
  }

  return pool.query<T>(sql, values);
}
