'use client';

import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
  0% { transform: scale(0) rotate(-8deg); opacity: 0; }
  60% { transform: scale(1.15) rotate(4deg); opacity: 1; }
  100% { transform: scale(1) rotate(-3deg); opacity: 1; }
`;

const fadeOut = keyframes`
  to { opacity: 0; transform: translateY(-12px) scale(0.9); }
`;

const Bubble = styled.div<{ $color: string }>`
  position: absolute;
  top: -20px;
  right: -10px;
  background: ${({ theme }) => theme.colors.pop};
  color: ${({ theme }) => theme.colors.ink};
  border: ${({ theme }) => theme.border.thick};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 6px 16px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  letter-spacing: 0.03em;
  box-shadow: ${({ theme }) => theme.shadow.comic};
  animation: ${popIn} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
             ${fadeOut} 0.3s ease-in 0.6s forwards;
  pointer-events: none;
  z-index: 10;
`;

interface FeedbackBubbleProps {
  text: string;
  color: string;
}

export function FeedbackBubble({ text, color }: FeedbackBubbleProps) {
  return <Bubble $color={color}>{text}</Bubble>;
}