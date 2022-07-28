import { Button } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { $userProfile } from '../../store/User/User.model';

const NavigationItem = ({ itemText, itemLink }) => {
  const { RequestsAmount } = useStore($userProfile);
  const navigate = useNavigate();
  const text = (itemText === 'Friend List' && RequestsAmount > 0) ? `${itemText} +${RequestsAmount}` : itemText;

  return (<Button
    sx={{ marginBottom: '5%' }}
    value={itemText}
    fullWidth
    onClick={() => navigate(itemLink)}
    variant={'outlined'}
  >
    {text}
  </Button>);

};

export default NavigationItem;