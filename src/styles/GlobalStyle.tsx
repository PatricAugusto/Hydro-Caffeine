'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root,
  [data-theme='light'] {
    --color-paper: #FFFDF6;
    --color-ink: #14110F;
    --color-hydro: #1E7FE8;
    --color-hydro-light: #7FC4FF;
    --color-caffeine: #FF4B26;
    --color-caffeine-light: #FFB199;
    --color-pop: #FFD400;
    --color-alert: #FF2D95;
  }

  [data-theme='dark'] {
    --color-paper: #1A1620;
    --color-ink: #F3EFE6;
    --color-hydro: #5EB0FF;
    --color-hydro-light: #2E5C94;
    --color-caffeine: #FF8A63;
    --color-caffeine-light: #99432C;
    --color-pop: #FFE066;
    --color-alert: #FF6FBB;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: ${({ theme }) => theme.fonts.body};
    transition: background 0.25s ease, color 0.25s ease;
  }

  .halftone {
    background-image: radial-gradient(currentColor 1.5px, transparent 1.5px);
    background-size: 10px 10px;
    opacity: 0.15;
  }
`;
