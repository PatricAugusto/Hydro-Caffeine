'use client';

import styled from 'styled-components';
import { dateKey } from '@/utils/date';

type DotStatus = 'empty' | 'partial' | 'complete' | 'over';

const Cell = styled.button<{ $isCurrentMonth: boolean; $isToday: boolean; $isSelected: boolean }>`
  aspect-ratio: 1;
  border: ${({ theme, $isToday }) => ($isToday ? theme.border.thick : theme.border.thin)};
  border-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.pop : theme.colors.ink)};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.paper};
  opacity: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 1 : 0.35)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  font-weight: 700;

  &:active {
    transform: scale(0.94);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 3px;
`;

const Dot = styled.span<{ $variant: 'water' | 'caffeine'; $status: DotStatus }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.ink};
  background: ${({ $status, $variant, theme }) => {
    if ($status === 'empty') return 'transparent';
    if ($status === 'over') return theme.colors.alert;
    return $variant === 'water' ? theme.colors.hydro : theme.colors.caffeine;
  }};
`;

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  waterStatus: DotStatus;
  caffeineStatus: DotStatus;
  onSelect: (date: Date) => void;
}

export function DayCell({
  date, isCurrentMonth, isToday, isSelected, waterStatus, caffeineStatus, onSelect,
}: DayCellProps) {
  return (
    <Cell
      $isCurrentMonth={isCurrentMonth}
      $isToday={isToday}
      $isSelected={isSelected}
      onClick={() => onSelect(date)}
      aria-label={`Ver consumo de ${dateKey(date)}`}
    >
      {date.getDate()}
      <Dots>
        <Dot $variant="water" $status={waterStatus} />
        <Dot $variant="caffeine" $status={caffeineStatus} />
      </Dots>
    </Cell>
  );
}