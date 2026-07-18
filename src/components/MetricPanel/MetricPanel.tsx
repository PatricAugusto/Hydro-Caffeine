"use client";

import styled, { keyframes, css } from "styled-components";
import { ProgressRing } from "../ProgressRing/ProgressRing";
import { QuickAdd } from "../QuickAdd/QuickAdd";
import { FeedbackBubble } from "../FeedbackBubble/FeedbackBubble";
import { useFeedbackBubble } from "@/hooks/useFeedbackBubble";
import type { DrinkType } from "@/types/tracker";

const alertPulse = keyframes`
  0%, 100% { border-color: ${({ theme }) => theme.colors.ink}; }
  50% { border-color: ${({ theme }) => theme.colors.alert}; }
`;

const Panel = styled.div<{ $accent: string; $alert: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.paper};
  border: ${({ theme }) => theme.border.thick};
  border-radius: ${({ theme }) => theme.radii.panel};
  box-shadow: ${({ theme }) => theme.shadow.comic};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  overflow: visible; /* precisa ser visible pro balão vazar pra fora do painel */

  ${({ $alert }) =>
    $alert &&
    css`
      animation: ${alertPulse} 1.2s ease-in-out infinite;
    `}

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.radii.panel};
    background-image: radial-gradient(
      ${({ $accent }) => $accent} 1.5px,
      transparent 1.5px
    );
    background-size: 12px 12px;
    opacity: 0.12;
    pointer-events: none;
  }
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.ink};
  z-index: 1;
`;

const GaugeWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const CenterLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const Value = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
`;

const Unit = styled.span`
  font-size: 0.85rem;
  opacity: 0.6;
`;

interface MetricPanelProps {
  title: string;
  type: DrinkType;
  current: number;
  goal: number;
  unit: string;
  accent: string;
  presets: number[];
  isOverLimit?: boolean;
  onAdd: (amount: number) => void;
}

export function MetricPanel({
  title,
  type,
  current,
  goal,
  unit,
  accent,
  presets,
  isOverLimit,
  onAdd,
}: MetricPanelProps) {
  const progress = goal > 0 ? current / goal : 0;
  const { bubble, trigger } = useFeedbackBubble();

  const handleAdd = (amount: number) => {
    onAdd(amount);
    trigger(type);
  };

  return (
    <Panel $accent={accent} $alert={!!isOverLimit}>
      {bubble && <FeedbackBubble text={bubble.text} color={accent} />}
      <Title>{title}</Title>
      <GaugeWrapper>
        <ProgressRing
          progress={progress}
          color={isOverLimit ? accent : accent}
        />
        <CenterLabel>
          <Value>{current}</Value>
          <Unit>
            / {goal} {unit}
          </Unit>
        </CenterLabel>
      </GaugeWrapper>
      <QuickAdd
        type={type}
        color={accent}
        unit={unit}
        presets={presets}
        onAdd={handleAdd}
      />
    </Panel>
  );
}
