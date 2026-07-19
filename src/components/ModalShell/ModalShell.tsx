'use client';

import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.ink}aa;
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
  children: React.ReactNode;
}

export function ModalShell({ onClose, maxWidth, children }: ModalShellProps) {
  return (
    <Backdrop onClick={onClose}>
      <Card $maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        {children}
      </Card>
    </Backdrop>
  );
}