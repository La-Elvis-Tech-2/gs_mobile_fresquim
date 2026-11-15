export type PointType = 'bebedouro' | 'sombra' | 'ubs' | 'estacao';

export type PointStatus = 'funcionando' | 'com_problema';

export interface HydrationPoint {
  id: string;
  name: string;
  type: PointType;
  address: string;
  neighborhood: string;
  hours: string;
  status: PointStatus;
  latitude: number;
  longitude: number;
}

export type RiskLevel = 'baixo' | 'atencao' | 'perigo';

export interface Weather {
  temperature: number;
  feelsLike: number;
  uvIndex: number;
  maxToday: number;
  updatedAt: string;
}

export type ReportKind = 'problema' | 'sugestao';

export interface Report {
  id: number;
  kind: ReportKind;
  pointId: string | null;
  pointName: string | null;
  description: string;
  createdAt: string;
}

export interface NewReport {
  kind: ReportKind;
  pointId?: string | null;
  pointName?: string | null;
  description: string;
}
