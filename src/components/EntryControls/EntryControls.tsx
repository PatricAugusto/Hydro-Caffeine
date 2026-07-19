"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 8px;
  z-index: 1;
`;

const GhostButton = styled.button<{ $danger?: boolean }>`
  background: transparent;
  border: ${({ theme }) => theme.border.thin};
  border-color: ${({ theme, $danger }) =>
    $danger ? theme.colors.alert : theme.colors.ink};
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.alert : theme.colors.ink};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 6px 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 700;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.94);
  }
`;

interface EntryControlsProps {
  hasEntries: boolean;
  onUndo: () => void;
  onReset: () => void;
}

export function EntryControls({
  hasEntries,
  onUndo,
  onReset,
}: EntryControlsProps) {
  const [confirming, setConfirming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // limpa o timeout se o componente desmontar com a confirmação pendente
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleResetClick = () => {
    if (!confirming) {
      setConfirming(true);
      timeoutRef.current = setTimeout(() => setConfirming(false), 2500);
      return;
    }
    clearTimeout(timeoutRef.current);
    setConfirming(false);
    onReset();
  };

  return (
    <Row>
      <GhostButton disabled={!hasEntries} onClick={onUndo}>
        ↺ DESFAZER
      </GhostButton>
      <GhostButton disabled={!hasEntries} $danger onClick={handleResetClick}>
        {confirming ? "CONFIRMAR?" : "ZERAR"}
      </GhostButton>
    </Row>
  );
}
