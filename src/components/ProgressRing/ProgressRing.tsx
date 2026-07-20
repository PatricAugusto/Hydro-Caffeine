'use client';

import styled from 'styled-components';

interface ProgressRingProps {
  progress: number;      // 0 a 1
  color: string;
  size?: number;
  strokeWidth?: number;
}

const Svg = styled.svg`
  transform: rotate(-90deg); /* começa do topo, não da direita */
`;

const TrackCircle = styled.circle`
  fill: none;
  stroke: color-mix(in srgb, ${({ theme }) => theme.colors.ink} 13%, transparent);
`;

const ProgressCircle = styled.circle<{ $color: string }>`
  fill: none;
  stroke: ${({ $color }) => $color};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s cubic-bezier(0.65, 0, 0.35, 1);
`;

export function ProgressRing({ progress, color, size = 200, strokeWidth = 16 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const offset = circumference * (1 - clampedProgress);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <TrackCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <ProgressCircle
        $color={color}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </Svg>
  );
}