// src/app/page.tsx (atualizado)
"use client";

import { useState } from "react";
import styled, { useTheme } from "styled-components";
import { useTracker } from "@/hooks/useTracker";
import { TrackerDashboard } from "@/components/TrackerDashboard/TrackerDashboard";
import { GoalsSettings } from "@/components/GoalsSettings/GoalsSettings";
import { CalendarModal } from "@/components/Calendar/CalendarModal";
import { IconButton } from "@/components/IconButton/IconButton";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

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

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export default function Home() {
  const theme = useTheme();
  const { goals, updateGoals } = useTracker();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Page>
      <Header>
        <AppTitle>
          HYDRO<span style={{ color: theme.colors.caffeine }}>+</span>ZAP
        </AppTitle>
        <HeaderActions>
          <ThemeToggle />
          <IconButton
            icon="📅"
            label="Ver histórico"
            onClick={() => setCalendarOpen(true)}
          />
          <IconButton
            icon="⚙️"
            label="Configurar metas"
            onClick={() => setSettingsOpen(true)}
          />
        </HeaderActions>
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

      {calendarOpen && <CalendarModal onClose={() => setCalendarOpen(false)} />}
    </Page>
  );
}
