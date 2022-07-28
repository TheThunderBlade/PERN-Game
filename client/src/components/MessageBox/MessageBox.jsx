import { Box, Typography } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import { $userProfile } from '../../store/User/User.model';

const MessageBox = ({ message, SenderId }) => {
  const { User } = useStore($userProfile);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: (SenderId === User.UserId) ? 'flex-end' : 'flex-start',
      }}
    >
      <Typography
        width={'40%'}
        padding={'1% 2% 1% 2%'}
        variant={'p'}
        border={'1px solid whitesmoke'}
        borderRadius={'15px'}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default MessageBox;