import { Container, Divider, Typography } from '@mui/material';
import React from 'react';

const PageTitle = ({ titleName }) => {
  return (
    <Container>
      <Typography variant={'h4'}>{titleName}</Typography>
      <Divider/>
    </Container>
  );
};

export default PageTitle;