import { Box } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import { $alignment } from '../ActionBar/ActionBar.model';
import ComponentsMap from './ComponentsMap';

const ComponentSelector = () => {
  const alignment = useStore($alignment);
  const component = ComponentsMap.get(alignment);

  return (
    <Box>
      {component}
    </Box>
  );
};

export default ComponentSelector;