'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { ModalShell } from '../ModalShell/ModalShell';
import { MonthNavigator } from './MonthNavigator';
import { CalendarGrid } from './CalendarGrid';
import { DayDetail } from './DayDetail';
import { useTracker } from '@/hooks/useTracker';

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  letter-spacing: 0.04em;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0.6;

  &:hover { opacity: 1; }
`;

interface CalendarModalProps {
  onClose: () => void;
}

export function CalendarModal({ onClose }: CalendarModalProps) {
  const { getDaySummary } = useTracker();
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const getDayStatus = (date: Date) => {
    const summary = getDaySummary(date);
    return { water: summary.water, caffeine: summary.caffeine };
  };

  const selectedSummary = selectedDate ? getDaySummary(selectedDate) : null;
  const selectedLabel = selectedDate
    ? selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
    : '';

  return (
    <ModalShell onClose={onClose} maxWidth="420px">
      <CloseButton onClick={onClose}>FECHAR ✕</CloseButton>
      <Heading>HISTÓRICO</Heading>

      <MonthNavigator
        year={viewDate.year}
        month={viewDate.month}
        onPrev={() =>
          setViewDate(({ year, month }) =>
            month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
          )
        }
        onNext={() =>
          setViewDate(({ year, month }) =>
            month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
          )
        }
      />

      <CalendarGrid
        year={viewDate.year}
        month={viewDate.month}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        getDayStatus={getDayStatus}
      />

      {selectedSummary && (
        <DayDetail label={selectedLabel} entries={selectedSummary.entries} totals={selectedSummary.totals} />
      )}
    </ModalShell>
  );
}