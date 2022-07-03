import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { AchievementGroup, AchievementData, InstancedAchievementData } from '../types/achievements';

interface AchievementFormProps {
  data?: InstancedAchievementData | null;
  onSubmit: (data: AchievementData) => void;
}

type AchievementFormErrors = {
  [error in keyof AchievementData]?: string;
};

const defaultFormData: AchievementData = {
  title: 'Achievement title',
  group: 'Lifetime',
  priority: 'Medium',
};

function AchievementForm({ data = null, onSubmit }: AchievementFormProps) {
  const initialFormData = data || defaultFormData;
  const [formData, setFormData] = React.useState<AchievementData>(initialFormData);
  const [errors, setErrors] = React.useState<AchievementFormErrors>({});

  const handleSubmit = () => {
    if (Object.keys(errors).length) {
      return;
    }
    onSubmit({
      ...formData,
      title: formData.title,
      group: formData.group,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { title, ...otherErrors } = errors;
    setErrors(otherErrors);
    const { value } = event.target;
    if (!value) {
      setErrors({
        ...otherErrors,
        title: 'You need to provide a title',
      });
      return;
    }
    setFormData({
      ...formData,
      title: value,
    });
  };

  const handleGroupChange = (event: SelectChangeEvent) => {
    const newGroup = event.target.value as AchievementGroup;
    const { group, ...otherErrors } = errors;
    setErrors(otherErrors);
    if (!newGroup) {
      setErrors({
        ...otherErrors,
        group: 'You need to provide a group',
      });
      return;
    }
    setFormData({
      ...formData,
      group: newGroup,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        id="title"
        label="title"
        variant="outlined"
        required
        fullWidth
        value={formData.title}
        onChange={handleTitleChange}
        error={!!errors.title}
        helperText={errors.title}
      />
      <FormControl fullWidth>
        <InputLabel id="achievement-group">Group</InputLabel>
        <Select
          labelId="achievement-group"
          id="group"
          label="Group"
          required
          value={formData.group}
          onChange={handleGroupChange}
          error={!!errors.group}
        >
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Seasonal">Seasonal</MenuItem>
          <MenuItem value="Lifetime">Lifetime</MenuItem>
          <MenuItem value="Weapons">Weapons</MenuItem>
          <MenuItem value="Builds">Builds</MenuItem>
        </Select>
        {errors.group && (<FormHelperText>{errors.group}</FormHelperText>)}
      </FormControl>
      <Stack direction="row">
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add achievement
        </Button>
      </Stack>
    </Box>
  );
}

export default AchievementForm;
