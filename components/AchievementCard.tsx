import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AchievementTracker } from '../types/achievements';

interface AchievementCardProps {
  tracker: AchievementTracker;
}

function AchievementCard({ tracker }: AchievementCardProps) {
  const { id, title, description } = tracker;

  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardHeader
          avatar={<Checkbox checked={isChecked} onChange={handleChange} />}
          title={title}
          action={(
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )}
        />
        <Menu
          id={`card-menu-${id}`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>Push to Current</MenuItem>
          <MenuItem onClick={handleMenuClose}>Push to Upcoming</MenuItem>
          <MenuItem onClick={handleMenuClose}>Push to ...</MenuItem>
        </Menu>
        <CardContent>
          {description}
        </CardContent>
      </Card>
    </Box>
  );
}

export default AchievementCard;
