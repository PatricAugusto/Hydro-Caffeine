'use client';

import styled from 'styled-components';

const Gear = styled.button`
  background: ${({ theme }) => theme.colors.paper};
  border: ${({ theme }) => theme.border.thick};
  border-radius: ${({ theme }) => theme.radii.pill};
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.comic};

  &:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;

export function GearButton({ onClick }: { onClick: () => void }) {
  return <Gear onClick={onClick} aria-label="Configurar metas">⚙️</Gear>;
}