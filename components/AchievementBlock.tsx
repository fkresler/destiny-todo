import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AchievementData, AchievementGroup, InstancedAchievementData } from '../types/achievements';
import AchievementCard from './AchievementCard';
import AchievementForm from './AchievementForm';
import { AchievementContext } from '../context/achievements';

interface AchievementBlockProps {
  filter?: AchievementGroup;
  data?: InstancedAchievementData[];
}

function AchievementBlock({ data = [], filter }: AchievementBlockProps) {
  const [achievementDialog, setAchievementDialog] = React.useState<string | null>(null);
  const achievementHandler = React.useContext(AchievementContext);

  const handleSubmitNewAchievement = async (newData: AchievementData) => {
    try {
      await achievementHandler.addAchievement('new-achievement', newData);
      setAchievementDialog(null);
    } catch {
      // TODO: error handling
      console.log('Something went wrong');
    }
  };

  const handleCreateNewAchievement = () => {
    setAchievementDialog('new');
  };

  const handleClose = () => {
    setAchievementDialog(null);
  };

  return (
    <Container>
      <Dialog open={!!achievementDialog} onClose={handleClose}>
        <DialogTitle>Achievements</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can edit or create a new achievement
          </DialogContentText>
          <AchievementForm onSubmit={handleSubmitNewAchievement} />
        </DialogContent>
      </Dialog>
      <Box>
        {data.map((achievement) => {
          if (filter && achievement.group !== filter) {
            return null;
          }
          return (
            <AchievementCard key={achievement.id} data={achievement} />
          );
        })}
      </Box>
      <Button
        color="success"
        startIcon={<AddIcon />}
        variant="outlined"
        aria-label="Add achievement"
        onClick={handleCreateNewAchievement}
      >
        Add achievement
      </Button>
    </Container>
  );
}

export default AchievementBlock;
