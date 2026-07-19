'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, getServerSnapshot, setThemeMode } from '@/styles/themeStore';

export function useThemeMode() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    setThemeMode(mode === 'light' ? 'dark' : 'light');
  }, [mode]);

  return { mode, toggle };
}