// src/hooks/useTracker.ts
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

  // --- LEITURA: precisa vir toda antes do que depende dela ---

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

  const status = useMemo(() => {
    const waterRatio = totals.water / state.goals.waterMl;
    const caffeineRatio = totals.caffeine / state.goals.caffeineMg;
    return {
      water: waterRatio >= 1 ? 'complete' : waterRatio >= 0.7 ? 'close' : 'low',
      caffeine: caffeineRatio >= 1 ? 'over' : caffeineRatio >= 0.8 ? 'close' : 'ok',
    } as const;
  }, [totals, state.goals]);

  const hasEntries = useMemo(() => {
    return {
      water: todayLog.some((e) => e.type === 'water'),
      caffeine: todayLog.some((e) => e.type === 'caffeine'),
    } as Record<DrinkType, boolean>;
  }, [todayLog]);

  // --- ESCRITA: mutações de estado ---

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

  const removeLastEntry = useCallback((type: DrinkType) => {
    const key = todayKey();
    setState((prev) => ({
      ...prev,
      logs: prev.logs.map((log) => {
        if (log.date !== key) return log;
        const lastIndex = [...log.entries].reverse().findIndex((e) => e.type === type);
        if (lastIndex === -1) return log;
        const realIndex = log.entries.length - 1 - lastIndex;
        return { ...log, entries: log.entries.filter((_, i) => i !== realIndex) };
      }),
    }));
  }, [setState]);

  const resetMetric = useCallback((type: DrinkType) => {
    const key = todayKey();
    setState((prev) => ({
      ...prev,
      logs: prev.logs.map((log) =>
        log.date === key
          ? { ...log, entries: log.entries.filter((e) => e.type !== type) }
          : log
      ),
    }));
  }, [setState]);

  const updateGoals = useCallback((goals: Partial<TrackerState['goals']>) => {
    setState((prev) => ({ ...prev, goals: { ...prev.goals, ...goals } }));
  }, [setState]);

  return {
    goals: state.goals,
    totals,
    status,
    hasEntries,
    addEntry,
    removeLastEntry,
    resetMetric,
    updateGoals,
    hydrated,
  };
}