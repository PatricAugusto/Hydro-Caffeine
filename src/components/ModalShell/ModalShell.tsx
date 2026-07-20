'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.ink} 67%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
`;

const Card = styled.div<{ $maxWidth?: string }>`
  background: ${({ theme }) => theme.colors.paper};
  border: ${({ theme }) => theme.border.thick};
  border-radius: ${({ theme }) => theme.radii.panel};
  box-shadow: ${({ theme }) => theme.shadow.comic};
  padding: 32px;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth ?? '380px'};
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface ModalShellProps {
  onClose: () => void;
  maxWidth?: string;
  titleId: string;
  children: React.ReactNode;
}

export function ModalShell({ onClose, maxWidth, titleId, children }: ModalShellProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <Backdrop onClick={onClose}>
      <Card
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        $maxWidth={maxWidth}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Card>
    </Backdrop>
  );
}