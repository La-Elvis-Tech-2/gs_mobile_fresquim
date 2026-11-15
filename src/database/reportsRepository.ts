import type { SQLiteDatabase } from 'expo-sqlite';
import type { NewReport, Report, ReportKind } from '@/types';

interface ReportRow {
  id: number;
  kind: ReportKind;
  point_id: string | null;
  point_name: string | null;
  description: string;
  created_at: string;
}

function toReport(row: ReportRow): Report {
  return {
    id: row.id,
    kind: row.kind,
    pointId: row.point_id,
    pointName: row.point_name,
    description: row.description,
    createdAt: row.created_at,
  };
}

export async function listReports(db: SQLiteDatabase): Promise<Report[]> {
  const rows = await db.getAllAsync<ReportRow>('SELECT * FROM reports ORDER BY id DESC');
  return rows.map(toReport);
}

export async function createReport(db: SQLiteDatabase, report: NewReport): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO reports (kind, point_id, point_name, description, created_at) VALUES (?, ?, ?, ?, ?)',
    report.kind,
    report.pointId ?? null,
    report.pointName ?? null,
    report.description.trim(),
    new Date().toISOString(),
  );
  return result.lastInsertRowId;
}

export async function deleteReport(db: SQLiteDatabase, id: number) {
  await db.runAsync('DELETE FROM reports WHERE id = ?', id);
}
