import * as React from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AchievementBlock from './AchievementBlock';
import { AchievementTracker } from '../types/achievements';

enum AchievementBacklogLabel {
  'backlog-tab-weekly',
  'backlog-tab-lifetime',
  'backlog-tab-seasonal',
  'backlog-tab-weapons',
  'backlog-tab-builds',
}

type AchievementBacklogDefinition = {
  [key in AchievementBacklogLabel]: {
    index: number;
  }
};

const ACHIEVEMENT_BACKLOG_TABS: AchievementBacklogDefinition = {
  [AchievementBacklogLabel['backlog-tab-weekly']]: {
    index: 0,
  },
  [AchievementBacklogLabel['backlog-tab-lifetime']]: {
    index: 1,
  },
  [AchievementBacklogLabel['backlog-tab-seasonal']]: {
    index: 2,
  },
  [AchievementBacklogLabel['backlog-tab-weapons']]: {
    index: 3,
  },
  [AchievementBacklogLabel['backlog-tab-builds']]: {
    index: 4,
  },
};

interface TabPanelProps {
  children?: React.ReactNode;
  label: AchievementBacklogLabel;
  selectedIndex: number;
}

interface AchievementBacklogProps {
  data?: AchievementTracker[];
}

function TabPanel({
  label, selectedIndex, children = null,
}: TabPanelProps) {
  const { index } = ACHIEVEMENT_BACKLOG_TABS[label];
  const hidden = index !== selectedIndex;
  const id = AchievementBacklogLabel[label];
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={id}
      aria-labelledby={id}
    >
      {!hidden && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AchievementBacklog({ data }: AchievementBacklogProps) {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleChange} aria-label="Achievement Backlog Tabs" variant="fullWidth">
        <Tab label="Weekly" id="backlog-tab-weekly" aria-controls="backlog-tabpanel-weekly" />
        <Tab label="Seasonal" id="backlog-tab-seasonal" aria-controls="backlog-tabpanel-seasonal" />
        <Tab label="Lifetime" id="backlog-tab-lifetime" aria-controls="backlog-tabpanel-lifetime" />
        <Tab label="Weapons" id="backlog-tab-weapons" aria-controls="backlog-tabpanel-weapons" />
        <Tab label="Build" id="backlog-tab-builds" aria-controls="backlog-tabpanel-builds" />
      </Tabs>
      <TabPanel label={AchievementBacklogLabel['backlog-tab-weekly']} selectedIndex={selectedTab}>
        <AchievementBlock data={data} filter="Weekly" />
      </TabPanel>
      <TabPanel label={AchievementBacklogLabel['backlog-tab-seasonal']} selectedIndex={selectedTab}>
        <AchievementBlock data={data} filter="Seasonal" />
      </TabPanel>
      <TabPanel label={AchievementBacklogLabel['backlog-tab-lifetime']} selectedIndex={selectedTab}>
        <AchievementBlock data={data} filter="Lifetime" />
      </TabPanel>
      <TabPanel label={AchievementBacklogLabel['backlog-tab-weapons']} selectedIndex={selectedTab}>
        <AchievementBlock data={data} filter="Weapons" />
      </TabPanel>
      <TabPanel label={AchievementBacklogLabel['backlog-tab-builds']} selectedIndex={selectedTab}>
        <AchievementBlock data={data} filter="Builds" />
      </TabPanel>
    </div>
  );
}

export default AchievementBacklog;
