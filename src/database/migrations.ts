import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'fresquim.db';

const DATABASE_VERSION = 1;

/** Cria ou atualiza as tabelas. Usa PRAGMA user_version para controlar a versão. */
export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) return;

  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS favorites (
        point_id   TEXT PRIMARY KEY NOT NULL,
        point_name TEXT NOT NULL,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS reports (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        kind        TEXT NOT NULL,
        point_id    TEXT,
        point_name  TEXT,
        description TEXT NOT NULL,
        created_at  TEXT NOT NULL
      );
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
