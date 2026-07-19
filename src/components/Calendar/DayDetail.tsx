'use client';

import styled from 'styled-components';
import type { Entry } from '@/types/tracker';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: ${({ theme }) => theme.border.thin};
  padding-top: 16px;
`;

const DateLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  opacity: 0.6;
  text-transform: capitalize;
`;

const TotalsRow = styled.div`
  display: flex;
  gap: 16px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 700;
`;

const EntryLine = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
`;

const EmptyState = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  opacity: 0.5;
  font-size: 0.9rem;
`;

interface DayDetailProps {
  label: string;
  entries: Entry[];
  totals: { water: number; caffeine: number };
}

export function DayDetail({ label, entries, totals }: DayDetailProps) {
  const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <Wrapper>
      <DateLabel>{label}</DateLabel>
      <TotalsRow>
        <span>💧 {totals.water}ml</span>
        <span>☕ {totals.caffeine}mg</span>
      </TotalsRow>
      {sorted.length === 0 ? (
        <EmptyState>Nenhum registro nesse dia.</EmptyState>
      ) : (
        sorted.map((entry) => (
          <EntryLine key={entry.id}>
            {new Date(entry.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            {' — '}
            {entry.type === 'water' ? '💧' : '☕'} {entry.amount}{entry.type === 'water' ? 'ml' : 'mg'}
          </EntryLine>
        ))
      )}
    </Wrapper>
  );
}