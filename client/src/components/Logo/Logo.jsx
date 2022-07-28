import { Box, Typography } from '@mui/material';
import React from 'react';
import ShieldMoonIcon from '@mui/icons-material/ShieldMoon';

const Logo = ({ iconSize, textStyle, variant }) => {
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
      <ShieldMoonIcon sx={{ width: `${iconSize}px`, height: 'auto', color: 'whitesmoke' }}/>
      <Typography variant={variant} className={textStyle}>Name</Typography>
    </Box>
  );
};

export default Logo;