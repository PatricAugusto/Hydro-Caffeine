"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.body};
  }

  /* textura de halftone reutilizável via classe utilitária */
  .halftone {
    background-image: radial-gradient(currentColor 1.5px, transparent 1.5px);
    background-size: 10px 10px;
    opacity: 0.15;
  }
`;
