'use client';

import styled from 'styled-components';
import type { DrinkType } from '@/types/tracker';

const Row = styled.div`
  display: flex;
  gap: 8px;
  z-index: 1;
`;

const AddButton = styled.button<{ $color: string }>`
  background: ${({ theme }) => theme.colors.paper};
  border: ${({ theme }) => theme.border.thin};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 8px 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;

  &:hover {
    background: ${({ $color }) => $color};
    color: ${({ theme }) => theme.colors.paper};
  }

  &:active {
    transform: scale(0.92) translate(2px, 2px);
  }
`;

interface QuickAddProps {
  type: DrinkType;
  color: string;
  presets: number[];
  unit: string;
  onAdd: (amount: number) => void;
}

export function QuickAdd({ color, presets, unit, onAdd }: QuickAddProps) {
  return (
    <Row>
      {presets.map((amount) => (
        <AddButton key={amount} $color={color} onClick={() => onAdd(amount)}>
          +{amount}{unit}
        </AddButton>
      ))}
    </Row>
  );
}