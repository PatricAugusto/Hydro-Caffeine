'use client';

import styled, { useTheme } from 'styled-components';
import { useTracker } from '@/hooks/useTracker';
import { MetricPanel } from '../MetricPanel/MetricPanel';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px; /* aumentado, pra dar espaço ao balão vazar sem sobrepor o painel vizinho */
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
`;

export function TrackerDashboard() {
  const theme = useTheme();
  const { totals, goals, status, addEntry, hydrated } = useTracker();

  if (!hydrated) return null;

  return (
    <Grid>
      <MetricPanel
        title="ÁGUA"
        type="water"
        current={totals.water}
        goal={goals.waterMl}
        unit="ml"
        accent={theme.colors.hydro}
        presets={[200, 300, 500]}
        onAdd={(amount) => addEntry('water', amount)}
      />
      <MetricPanel
        title="CAFEÍNA"
        type="caffeine"
        current={totals.caffeine}
        goal={goals.caffeineMg}
        unit="mg"
        accent={theme.colors.caffeine}
        presets={[80, 95, 150]}
        isOverLimit={status.caffeine === 'over'}
        onAdd={(amount) => addEntry('caffeine', amount)}
      />
    </Grid>
  );
}