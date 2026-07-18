'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // lê do localStorage só depois do mount (evita mismatch de SSR)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored));
    } catch (err) {
      console.error(`Erro ao ler localStorage[${key}]`, err);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const set = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = newValue instanceof Function ? newValue(prev) : newValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch (err) {
        console.error(`Erro ao salvar localStorage[${key}]`, err);
      }
      return resolved;
    });
  }, [key]);

  return { value, set, hydrated } as const;
}