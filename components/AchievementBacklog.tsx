import * as React from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AchievementBlock from './AchievementBlock';
import { AchievementGroup } from '../types/achievements';
import { AchievementContext } from '../context/achievements';

type AchievementBacklogDefinition = {
  [key in AchievementGroup]: {
    index: number;
    label: AchievementGroup;
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  label: AchievementGroup;
  isHidden: boolean;
}

const ACHIEVEMENT_BACKLOG_TABS: AchievementBacklogDefinition = {
  Weekly: {
    index: 0,
    label: 'Weekly',
  },
  Seasonal: {
    index: 1,
    label: 'Seasonal',
  },
  Lifetime: {
    index: 2,
    label: 'Lifetime',
  },
  Weapons: {
    index: 3,
    label: 'Weapons',
  },
  Builds: {
    index: 4,
    label: 'Builds',
  },
};

function TabPanel({
  label, isHidden, children = null,
}: TabPanelProps) {
  const id = `backlog-tab-${label}`;
  return (
    <div
      role="tabpanel"
      hidden={isHidden}
      id={id}
      aria-labelledby={id}
    >
      {!isHidden && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AchievementBacklog() {
  const achievementHandler = React.useContext(AchievementContext);
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleChange} aria-label="Achievement Backlog Tabs" variant="fullWidth">
        {Object.entries(ACHIEVEMENT_BACKLOG_TABS).map(([, value]) => (
          <Tab
            key={value.label}
            label={value.label}
            id={`backlog-tab-${value.label}`}
            aria-controls={`backlog-tabpanel-${value.label}`}
          />
        ))}
      </Tabs>
      {Object.entries(ACHIEVEMENT_BACKLOG_TABS).map(([, value]) => (
        <TabPanel key={value.label} label={value.label} isHidden={value.index !== selectedTab}>
          <AchievementBlock data={achievementHandler.data} filter={value.label} />
        </TabPanel>
      ))}
    </div>
  );
}

export default AchievementBacklog;
