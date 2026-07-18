'use client';

import { useState } from 'react';
import styled from 'styled-components';
import type { Goals } from '@/types/tracker';

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

const Card = styled.div`
  background: ${({ theme }) => theme.colors.paper};
  border: ${({ theme }) => theme.border.thick};
  border-radius: ${({ theme }) => theme.radii.panel};
  box-shadow: ${({ theme }) => theme.shadow.comic};
  padding: 32px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  letter-spacing: 0.04em;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Input = styled.input<{ $accent: string }>`
  border: ${({ theme }) => theme.border.thin};
  border-radius: 8px;
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};

  &:focus {
    outline: none;
    border-color: ${({ $accent }) => $accent};
    box-shadow: 0 0 0 3px ${({ $accent }) => $accent}33;
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.alert};
  font-size: 0.75rem;
  text-transform: none;
  letter-spacing: normal;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.button<{ $variant: 'primary' | 'ghost' }>`
  flex: 1;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1rem;
  letter-spacing: 0.03em;
  cursor: pointer;
  border: ${({ theme }) => theme.border.thin};

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `background: ${theme.colors.pop}; color: ${theme.colors.ink};`
      : `background: transparent; color: ${theme.colors.ink};`}

  &:active {
    transform: scale(0.96);
  }
`;

interface GoalsSettingsProps {
  goals: Goals;
  hydroColor: string;
  caffeineColor: string;
  onSave: (goals: Goals) => void;
  onClose: () => void;
}

export function GoalsSettings({ goals, hydroColor, caffeineColor, onSave, onClose }: GoalsSettingsProps) {
  const [waterMl, setWaterMl] = useState(String(goals.waterMl));
  const [caffeineMg, setCaffeineMg] = useState(String(goals.caffeineMg));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const water = Number(waterMl);
    const caffeine = Number(caffeineMg);

    if (!water || water <= 0 || !caffeine || caffeine <= 0) {
      setError('Os valores precisam ser maiores que zero.');
      return;
    }
    if (caffeine > 600) {
      setError('Limite de cafeína acima de 600mg não é recomendado.');
      return;
    }

    onSave({ waterMl: water, caffeineMg: caffeine });
    onClose();
  };

  return (
    <Backdrop onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Heading>METAS DO DIA</Heading>

        <Field>
          ÁGUA (ML)
          <Input
            $accent={hydroColor}
            type="number"
            inputMode="numeric"
            value={waterMl}
            onChange={(e) => setWaterMl(e.target.value)}
          />
        </Field>

        <Field>
          CAFEÍNA (MG)
          <Input
            $accent={caffeineColor}
            type="number"
            inputMode="numeric"
            value={caffeineMg}
            onChange={(e) => setCaffeineMg(e.target.value)}
          />
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

        <Actions>
          <Button $variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button $variant="primary" onClick={handleSave}>Salvar</Button>
        </Actions>
      </Card>
    </Backdrop>
  );
}