import { useStore } from 'effector-react';
import React from 'react';
import { Alert, Box } from '@mui/material';
import { $alertMessage, $isOpen } from './CustomAlert.model';

const CustomAlert = () => {
  const isAlert = useStore($isOpen);
  const alert = useStore($alertMessage);

  return (
    <Box position={'absolute'} width={'450px'} left={'35%'} top={'10px'}>
      {isAlert && (<Alert variant={'filled'} severity={alert.type}>{alert.message}</Alert>)}
    </Box>);
};

export default CustomAlert;