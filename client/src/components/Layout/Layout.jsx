import { Box, Button, Divider, Typography } from '@mui/material';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { $token, logoutFx, refreshFx } from '../../store/Auth/Auth.model';
import { $userProfile, fetchProfileFx } from '../../store/User/User.model';
import { toNextDayFx } from '../../store/User/UserResources.model';
import CustomAlert from '../CustomAlert/CustomAlert';
import Logo from '../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';
import ResourcesBlock from '../ResourcesBlock/ResourcesBlock';
import styles from './Layout.module.css';
import { navItems } from './NavItems';
import DayHelper from '../../helpers/Day.helper';

const Layout = ({ children }) => {
  const profile = useStore($userProfile);
  const { UserProfile } = useStore($userProfile);
  const token = useStore($token);
  const profilePending = useStore(fetchProfileFx.pending);

  useEffect(() => {
    if (token && Object.keys(profile).length === 0 && !profilePending) {
      fetchProfileFx();
    }
  }, [profile, profilePending, token]);

  return (
    <Box className={styles.wrapper}>
      <CustomAlert/>
      <Box className={styles.layout_grid}>
        <Box className={styles.layout_header}>
          <Box display={'flex'} alignItems={'center'}>
            <Logo variant={'h4'} textStyle={styles.custom_logo} iconSize={25}/>
          </Box>
          {
            !profilePending ? (
                <Box display={'grid'} gridTemplateColumns={'1fr 1.5fr 1fr'}>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <ResourcesBlock/>
                  </Box>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-around'}
                  >
                    <Box padding={'3%'} textAlign={'center'} width={'150px'} border={'1px solid whitesmoke'} borderRadius={'25px'}>
                      <Typography variant={'p'}>{DayHelper.get(UserProfile?.CurrentDay)}: {UserProfile?.CurrentDay}</Typography>
                    </Box>
                    <Box padding={'3%'} border={'1px solid whitesmoke'} borderRadius={'25px'}>
                      <Typography variant={'p'}>Energy: {UserProfile?.Energy}/100</Typography>
                    </Box>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Button onClick={() => toNextDayFx()} variant={'outlined'} endIcon={<ArrowRightIcon/>}>To next
                      day</Button>
                  </Box>
                </Box>
              )
              : null
          }
        </Box>

        <Box className={styles.layout_nav}>
          <Box className={styles.layout_navigation}>
            {navItems.map((item, index) => (
              <NavigationItem key={index} itemText={item.itemText} itemLink={item.link}/>
            ))}
            <Divider sx={{ width: '100%', marginBottom: '5%' }}/>
            <Button sx={{ marginBottom: '5%' }} onClick={() => refreshFx()} variant="outlined"
                    fullWidth>Refresh</Button>
            <Button onClick={() => logoutFx()} variant="outlined" fullWidth>Logout</Button>
          </Box>

          <Box className={styles.layout_children}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;