import { Box, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import { $alignment, setAlignment } from './ProfileToggleButton.model';

const ProfileToggleButton = () => {
  const alignment = useStore($alignment)

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box width='100%'>
      <Box width='100%'>
        <ToggleButtonGroup
          fullWidth
          color="primary"
          sx={{ width: '100%' }}
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton sx={{ width: '100%' }} fullWidth value="Profile table">Profile table</ToggleButton>
          <ToggleButton sx={{ width: '100%' }} fullWidth value="Update profile">Update profile</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Divider sx={{ marginTop: '2%'}}/>
    </Box>
  );
};

export default ProfileToggleButton;