'use client';

import { IconButton } from '@/components/IconButton/IconButton';
import { useThemeMode } from '@/hooks/useThemeMode';

export function ThemeToggle() {
  const { mode, toggle } = useThemeMode();

  return (
    <IconButton
      icon={mode === 'light' ? '🌙' : '☀️'}
      label={mode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      onClick={toggle}
    />
  );
}