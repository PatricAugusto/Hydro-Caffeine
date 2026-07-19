'use client';

import styled from 'styled-components';
import { DayCell } from './DayCell';
import { getMonthMatrix, WEEKDAY_LABELS } from '@/utils/calendar';
import { dateKey } from '@/utils/date';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

const WeekdayLabel = styled.span`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  opacity: 0.5;
`;

type DotStatus = 'empty' | 'partial' | 'complete' | 'over';

interface CalendarGridProps {
  year: number;
  month: number;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  getDayStatus: (date: Date) => { water: DotStatus; caffeine: DotStatus };
}

export function CalendarGrid({ year, month, selectedDate, onSelectDate, getDayStatus }: CalendarGridProps) {
  const weeks = getMonthMatrix(year, month);
  const todayStr = dateKey(new Date());

  return (
    <Grid>
      {WEEKDAY_LABELS.map((label, i) => (
        <WeekdayLabel key={i}>{label}</WeekdayLabel>
      ))}
      {weeks.flatMap((week) =>
        week.map((date) => {
          const status = getDayStatus(date);
          return (
            <DayCell
              key={dateKey(date)}
              date={date}
              isCurrentMonth={date.getMonth() === month}
              isToday={dateKey(date) === todayStr}
              isSelected={!!selectedDate && dateKey(date) === dateKey(selectedDate)}
              waterStatus={status.water}
              caffeineStatus={status.caffeine}
              onSelect={onSelectDate}
            />
          );
        })
      )}
    </Grid>
  );
}