import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { mineResourcesFx, saveCaveResourcesFx } from '../../store/Mining/Mining.model';
import DialogWindow from '../DialogWindow/DialogWindow';
import PageTitle from '../PageTitle/PageTitle';
import { ResourcesImageList } from '../ResourcesBlock/components/ResourcesImageList/ResourcesImageList';
import UpgradeBlock from '../UpgradeBlock/UpgradeBlock';

const MainResourcesBlock = ({ resources, buildingsFlag, resourcesAmountKeys, resourcesAmount, pageTitle, NPC, NPC_Name, upgradeData }) => {
  return (
    <Box>
      <PageTitle titleName={pageTitle}/>
      <Box sx={{ maxHeight: '84vh' }} display={'grid'} gridTemplateColumns={'75% 25%'}>
        <Box
          display={'grid'}
          height={'84vh'}
          gridTemplateRows={'80% 20%'}
          borderRight={'1px solid whitesmoke'}
        >
          <Box
            borderBottom={'1px solid whitesmoke'}
            display={'grid'}
            gridTemplateColumns={'50% 50%'}
          >
            <Box
              display={'grid'}
              gridTemplateRows={'50% 50%'}
              borderRight={'1px solid whitesmoke'}
              paddingTop={'5%'}
            >
              <Box
                borderBottom={'1px solid whitesmoke'}
                display={'flex'}
                justifyContent={'center'}
                paddingBottom={'5%'}
              >
                <img
                  style={{
                    width: '50%',
                    border: '1px solid whitesmoke',
                    borderRadius: '25px',
                    cursor: 'pointer',
                  }}
                  src={NPC}
                  alt={'NPC'}
                />
              </Box>
              <DialogWindow NPCName={NPC_Name} NPCText={'Hello traveller!'}/>
            </Box>
            <UpgradeBlock buildingsFlag={buildingsFlag} upgradeInfo={upgradeData}/>
          </Box>

          <Box>
            <Button
              sx={{ minWidth: '100%', minHeight: '100%', fontSize: '30px' }}
              variant={'outlined'}
              onClick={() => mineResourcesFx(buildingsFlag)}
            >
              Mine resources
            </Button>
          </Box>
        </Box>
        <Box display={'grid'} height={'84vh'} gridTemplateRows={'60% 20% 20%'}>
          <Box overflow={'auto'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            {
              resources.length > 0 && resources.map((item) => {
                const itemName = Object.keys(item);
                const itemValue = Object.values(item);
                return itemName.map((name, index) => (
                  <Box
                    key={index}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    border={'1px solid whitesmoke'}
                    borderRadius={'15px'}
                    margin={'3%'}
                    paddingLeft={'5%'}
                    paddingRight={'5%'}
                  >
                    <img width={'15%'} src={ResourcesImageList.get(name)} alt={name}/>
                    <Typography variant={'p'}>{name}: </Typography>
                    <Typography variant={'p'}>{itemValue[index]}</Typography>
                  </Box>
                ));
              })
            }
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            overflow={'auto'}
            borderTop={'1px solid whitesmoke'}
          >
            {
              resources.length > 0
                ? resourcesAmountKeys.map((key) => resourcesAmount[key] ? (
                  <Box
                    key={key}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    border={'1px solid whitesmoke'}
                    borderRadius={'15px'}
                    margin={'3%'}
                    paddingLeft={'5%'}
                    paddingRight={'5%'}
                  >
                    <img width={'15%'} src={ResourcesImageList.get(key)} alt={key}/>
                    <Typography variant={'p'}>{key}: </Typography>
                    <Typography variant={'p'}>{resourcesAmount[key]}</Typography>
                  </Box>
                ) : null)
                : <Typography variant={'p'}>No resources</Typography>
            }
          </Box>
          <Box borderTop={'1px solid whitesmoke'}>
            <Button
              sx={{ minWidth: '100%', minHeight: '100%', fontSize: '15px' }}
              variant={'outlined'}
              disabled={(resources.length <= 0)}
              onClick={() => saveCaveResourcesFx(resourcesAmount)}
            >
              Collect all resources
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainResourcesBlock;