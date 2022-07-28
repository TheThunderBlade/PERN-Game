import { Box, Typography } from '@mui/material';
import React from 'react';

const DialogWindow = ({ NPCName, NPCText }) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'flex-start'}
      flexDirection={'column'}
      paddingLeft={'3%'}
    >
      <Typography variant={'h5'}>{NPCName}</Typography>
      <Typography maxHeight={'200px'} overflow={'auto'} variant={'p'}>{NPCText}</Typography>
    </Box>
  );
};

export default DialogWindow;