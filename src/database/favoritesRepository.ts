import type { SQLiteDatabase } from 'expo-sqlite';

export interface Favorite {
  pointId: string;
  pointName: string;
  createdAt: string;
}

interface FavoriteRow {
  point_id: string;
  point_name: string;
  created_at: string;
}

export async function listFavorites(db: SQLiteDatabase): Promise<Favorite[]> {
  const rows = await db.getAllAsync<FavoriteRow>(
    'SELECT * FROM favorites ORDER BY created_at DESC',
  );
  return rows.map((r) => ({ pointId: r.point_id, pointName: r.point_name, createdAt: r.created_at }));
}

export async function isFavorite(db: SQLiteDatabase, pointId: string): Promise<boolean> {
  const row = await db.getFirstAsync('SELECT 1 FROM favorites WHERE point_id = ?', pointId);
  return row !== null;
}

export async function addFavorite(db: SQLiteDatabase, pointId: string, pointName: string) {
  await db.runAsync(
    'INSERT OR REPLACE INTO favorites (point_id, point_name, created_at) VALUES (?, ?, ?)',
    pointId,
    pointName,
    new Date().toISOString(),
  );
}

export async function removeFavorite(db: SQLiteDatabase, pointId: string) {
  await db.runAsync('DELETE FROM favorites WHERE point_id = ?', pointId);
}
