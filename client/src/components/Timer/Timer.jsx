import { Typography } from '@mui/material';
import React from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp, onExpire }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({ expiryTimestamp, onExpire: () => onExpire() });

  return (<Typography variant={'p'}> {days}:{hours}:{minutes}:{seconds}</Typography>);
};

export default Timer;