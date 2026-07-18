export type DrinkType = 'water' | 'caffeine';

export interface Entry {
  id: string;
  type: DrinkType;
  amount: number;       // ml para água, mg para cafeína
  timestamp: number;     // Date.now()
}

export interface Goals {
  waterMl: number;       // ex: 2000
  caffeineMg: number;    // ex: 400 (limite recomendado adulto saudável)
}

export interface DayLog {
  date: string;           // 'YYYY-MM-DD', chave de agrupamento por dia
  entries: Entry[];
}

export interface TrackerState {
  goals: Goals;
  logs: DayLog[];
}