import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { upgradeBuilding } from '../../store/Mining/Mining.model';
import { ResourcesImageList } from '../ResourcesBlock/components/ResourcesImageList/ResourcesImageList';

const UpgradeBlock = ({ upgradeInfo, buildingsFlag }) => {
  const upgradeResourcesNames = Object.keys(upgradeInfo?.upgrade || {}) || [];
  const upgradeResourcesValues = Object.values(upgradeInfo?.upgrade || {}) || [];
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      paddingTop={'5%'}
    >
      <Box sx={{ width: '90%', paddingBottom: '2%' }}>
        <Typography variant={'p'}>Current cave level info: {upgradeInfo?.currentDescription}</Typography>
      </Box>
      <Box sx={{ width: '90%', paddingBottom: '2%' }}>
        <Typography variant={'p'}>Next cave level info: {upgradeInfo?.upgradeDescription}</Typography>
      </Box>
      <Divider sx={{ width: '90%', marginBottom: '5%' }}/>
      <Box sx={{ width: '90%', paddingBottom: '2%' }}>
        <Typography variant={'p'}>Upgrade requirements:</Typography>
        {
          upgradeResourcesNames.map((name, index) => (
            <Box display={'flex'} flexDirection={'row'} justifyItems={'flex-start'} alignItems={'center'} key={index}>
              <img width={'10%'} src={ResourcesImageList.get(name)} alt={name}/>
              <Typography key={index} sx={{ marginLeft: '3%' }} variant={'p'}>{name}: {upgradeResourcesValues[index]}</Typography>
            </Box>
          ))
        }
      </Box>
      <Box sx={{ width: '90%' }}>
        <Button
          variant={'outlined'}
          fullWidth
          onClick={() => upgradeBuilding(buildingsFlag)}
        >
          Upgrade {buildingsFlag}
        </Button>
      </Box>
    </Box>
  );
};

export default UpgradeBlock;