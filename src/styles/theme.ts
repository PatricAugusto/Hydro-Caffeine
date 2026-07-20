export const theme = {
  colors: {
    paper: 'var(--color-paper)',
    ink: 'var(--color-ink)',
    inkOnAccent: 'var(--color-ink-on-accent)',
    hydro: 'var(--color-hydro)',
    hydroLight: 'var(--color-hydro-light)',
    caffeine: 'var(--color-caffeine)',
    caffeineLight: 'var(--color-caffeine-light)',
    pop: 'var(--color-pop)',
    alert: 'var(--color-alert)',
    alertText: 'var(--color-alert-text)',
  },
  fonts: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
  border: {
    thick: '4px solid var(--color-ink)',
    thin: '2px solid var(--color-ink)',
  },
  radii: {
    panel: '16px',
    pill: '999px',
  },
  shadow: {
    comic: '6px 6px 0px var(--color-ink)',
  },
} as const;

export type AppTheme = typeof theme;