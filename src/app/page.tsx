'use client';

import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useTracker } from '@/hooks/useTracker';
import { TrackerDashboard } from '@/components/TrackerDashboard/TrackerDashboard';
import { GoalsSettings } from '@/components/GoalsSettings/GoalsSettings';
import { GearButton } from '@/components/GearButton/GearButton';

const Page = styled.main`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px 0;
  max-width: 900px;
  margin: 0 auto;
`;

const AppTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  letter-spacing: 0.03em;
`;

export default function Home() {
  const theme = useTheme();
  const { goals, updateGoals } = useTracker();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Page>
      <Header>
        <AppTitle>HYDRO<span style={{ color: theme.colors.caffeine }}>+</span>ZAP</AppTitle>
        <GearButton onClick={() => setSettingsOpen(true)} />
      </Header>

      <TrackerDashboard />

      {settingsOpen && (
        <GoalsSettings
          goals={goals}
          hydroColor={theme.colors.hydro}
          caffeineColor={theme.colors.caffeine}
          onSave={updateGoals}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </Page>
  );
}