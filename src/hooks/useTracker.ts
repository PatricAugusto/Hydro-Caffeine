'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { TrackerState, DrinkType, Entry } from '@/types/tracker';

const DEFAULT_STATE: TrackerState = {
  goals: { waterMl: 2000, caffeineMg: 400 },
  logs: [],
};

function todayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function useTracker() {
  const { value: state, set: setState, hydrated } = useLocalStorage<TrackerState>(
    'tracker-state',
    DEFAULT_STATE
  );

  const todayLog = useMemo(() => {
    return state.logs.find((log) => log.date === todayKey())?.entries ?? [];
  }, [state.logs]);

  const totals = useMemo(() => {
    return todayLog.reduce(
      (acc, entry) => {
        acc[entry.type] += entry.amount;
        return acc;
      },
      { water: 0, caffeine: 0 } as Record<DrinkType, number>
    );
  }, [todayLog]);

  const addEntry = useCallback((type: DrinkType, amount: number) => {
    const entry: Entry = { id: crypto.randomUUID(), type, amount, timestamp: Date.now() };
    const key = todayKey();

    setState((prev) => {
      const existingDay = prev.logs.find((log) => log.date === key);
      const logs = existingDay
        ? prev.logs.map((log) =>
            log.date === key ? { ...log, entries: [...log.entries, entry] } : log
          )
        : [...prev.logs, { date: key, entries: [entry] }];
      return { ...prev, logs };
    });
  }, [setState]);

  const updateGoals = useCallback((goals: Partial<TrackerState['goals']>) => {
    setState((prev) => ({ ...prev, goals: { ...prev.goals, ...goals } }));
  }, [setState]);

  // status de alerta: acima da meta = "excesso", dentro = "ok"
  const status = useMemo(() => {
    const waterRatio = totals.water / state.goals.waterMl;
    const caffeineRatio = totals.caffeine / state.goals.caffeineMg;
    return {
      water: waterRatio >= 1 ? 'complete' : waterRatio >= 0.7 ? 'close' : 'low',
      caffeine: caffeineRatio >= 1 ? 'over' : caffeineRatio >= 0.8 ? 'close' : 'ok',
    } as const;
  }, [totals, state.goals]);

  return { goals: state.goals, totals, status, addEntry, updateGoals, hydrated };
}