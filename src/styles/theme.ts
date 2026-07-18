export const theme = {
  colors: {
    paper: '#FFFDF6',
    ink: '#14110F',
    hydro: '#1E7FE8',
    hydroLight: '#7FC4FF',
    caffeine: '#FF4B26',
    caffeineLight: '#FFB199',
    pop: '#FFD400',
    alert: '#FF2D95',
  },
  fonts: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
  border: {
    thick: '4px solid #14110F',
    thin: '2px solid #14110F',
  },
  radii: {
    panel: '16px',
    pill: '999px',
  },
  shadow: {
    // sombra "deslocada" estilo quadrinho, sem blur
    comic: '6px 6px 0px #14110F',
  },
} as const;

export type AppTheme = typeof theme;