'use client';

import styled from 'styled-components';

const Button = styled.button`
  background: ${({ theme }) => theme.colors.paper};
  border: ${({ theme }) => theme.border.thick};
  border-radius: ${({ theme }) => theme.radii.pill};
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.comic};

  &:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;

interface IconButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <Button onClick={onClick} aria-label={label}>
      <span aria-hidden="true">{icon}</span>
    </Button>
  );
}