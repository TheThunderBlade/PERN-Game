import { Box, Menu, Button, Typography } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import { $userProfile, fetchProfileFx } from '../../store/User/User.model';
import { ResourcesImageList } from './components/ResourcesImageList/ResourcesImageList';

const ResourcesBlock = () => {
  const { UserResources } = useStore($userProfile);
  const pending = useStore(fetchProfileFx.pending);
  const resourcesKeys = UserResources ? Object.keys(UserResources) : [];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (pending) {
    return null;
  }

  return (
    <Box>
      <Button
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        variant={'outlined'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Resources
      </Button>
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{ minWidth: '500px', maxWidth: '400px', height: 'auto', padding: '1%' }}
          display={'grid'}
          gridTemplateColumns={'50% 50%'}
        >
          <Box display={'grid'} gridTemplateRows={'1fr 1fr 1fr'} paddingRight={'2%'}>
            {
              resourcesKeys.map((item, index) => {
                if (index + 1 <= resourcesKeys.length / 2) {
                  return (
                    <Box
                      key={index}
                      margin={'2px'}
                      display={'flex'}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <img width={'15%'} src={ResourcesImageList.get(item)} alt={item}/>
                      <Typography variant={'p'}>{item}: </Typography>
                      <Typography variant={'p'}>{UserResources[item]}</Typography>
                    </Box>
                  );
                }
                return null;
              })
            }
          </Box>
          <Box display={'grid'} gridTemplateRows={'1fr 1fr 1fr'} paddingLeft={'2%'}>
            {
              resourcesKeys.map((item, index) => {
                if (index + 1 > resourcesKeys.length / 2) {
                  return (
                    <Box
                      key={index}
                      margin={'2px'}
                      display={'flex'}
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <img width={'15%'} src={ResourcesImageList.get(item)} alt={item}/>
                      <Typography variant={'p'}>{item}: </Typography>
                      {UserResources[item]}
                    </Box>
                  );
                }
                return null;
              })
            }
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default ResourcesBlock;