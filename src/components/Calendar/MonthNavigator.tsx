'use client';

import styled from 'styled-components';

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavButton = styled.button`
  background: transparent;
  border: ${({ theme }) => theme.border.thin};
  border-radius: ${({ theme }) => theme.radii.pill};
  width: 32px;
  height: 32px;
  font-family: ${({ theme }) => theme.fonts.mono};
  cursor: pointer;

  &:active { transform: scale(0.9); }
`;

const MonthLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.4rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

interface MonthNavigatorProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

export function MonthNavigator({ year, month, onPrev, onNext }: MonthNavigatorProps) {
  return (
    <Nav>
      <NavButton onClick={onPrev} aria-label="Mês anterior">←</NavButton>
      <MonthLabel>{MONTH_NAMES[month]} {year}</MonthLabel>
      <NavButton onClick={onNext} aria-label="Próximo mês">→</NavButton>
    </Nav>
  );
}