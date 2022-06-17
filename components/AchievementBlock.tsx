import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import AchievementCard from './AchievementCard';
import { AchievementGroup, AchievementTracker } from '../types/achievements';

interface AchievementBlockProps {
  filter?: AchievementGroup;
  data?: AchievementTracker[];
}

function AchievementBlock({ data = [], filter }: AchievementBlockProps) {
  return (
    <Container>
      <Box>
        {data.map((tracker) => {
          if (filter && tracker.group !== filter) {
            return null;
          }
          return (
            <AchievementCard key={tracker.id} tracker={tracker} />
          );
        })}
      </Box>
      <Button
        color="success"
        startIcon={<AddIcon />}
        variant="outlined"
        aria-label="Add achievement"
      >
        Add achievement
      </Button>
    </Container>
  );
}

export default AchievementBlock;
