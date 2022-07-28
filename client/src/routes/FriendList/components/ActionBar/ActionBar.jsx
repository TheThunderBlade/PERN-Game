import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import { $userProfile } from '../../../../store/User/User.model';
import { $alignment, setAlignment } from './ActionBar.model';

const ActionBar = () => {
  const { RequestsAmount } = useStore($userProfile);
  const alignment = useStore($alignment);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box paddingLeft={'3%'} paddingRight={'3%'} marginTop={'1%'}>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        sx={{ width: '100%' }}
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton sx={{ width: '100%' }} fullWidth value="My friends">My friends</ToggleButton>
        <ToggleButton sx={{ width: '100%' }} fullWidth value="Search friends">Search friends</ToggleButton>
        <ToggleButton sx={{ width: '100%' }} fullWidth value="Friend requests">Friend requests {RequestsAmount ? `+${RequestsAmount}` : ''}</ToggleButton>
        <ToggleButton sx={{ width: '100%' }} fullWidth value="My requests">My requests</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ActionBar;