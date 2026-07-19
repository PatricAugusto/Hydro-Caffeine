type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme-mode';
const listeners = new Set<() => void>();

export function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getSnapshot(): ThemeMode {
  const current = document.documentElement.getAttribute('data-theme');
  return current === 'dark' ? 'dark' : 'light';
}

export function getServerSnapshot(): ThemeMode {
  // no servidor não existe DOM ainda; o script anti-flash no layout
  // já vai corrigir isso no cliente antes do primeiro paint
  return 'light';
}

export function setThemeMode(mode: ThemeMode): void {
  document.documentElement.setAttribute('data-theme', mode);
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // localStorage indisponível — a troca ainda funciona visualmente
  }
  listeners.forEach((listener) => listener());
}