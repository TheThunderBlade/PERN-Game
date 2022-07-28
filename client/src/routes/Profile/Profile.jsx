import { Box, Button, Container, LinearProgress } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import PageTitle from '../../components/PageTitle/PageTitle';
import CustomTable from '../../components/Table/CustomTable';
import {
  $userProfile,
  ProfileGate,
  fetchProfileFx,
  $selectedAvatar,
  updateTrigger,
} from '../../store/User/User.model';
import { TimeFormat } from '../../utils/timeFormat';
import AvatarPicker from './components/AvatarPicker/AvatarPicker';
import EditProfile from './components/EditProfile/EditProfile';
import ProfileToggleButton from './components/ProfileToggleButton/ProfileToggleButton';
import { $alignment } from './components/ProfileToggleButton/ProfileToggleButton.model';

const Profile = () => {
  useGate(ProfileGate);
  const pending = useStore(fetchProfileFx.pending);
  const selectedAvatar = useStore($selectedAvatar);
  const actionChecker = useStore($alignment);

  const profileData = useStore($userProfile);
  const processedUserData = (userData) => {
    return [
      { info: 'User name', data: userData.User?.UserName },
      { info: 'User email', data: userData.User?.Email },
      { info: 'Weeks lived', data: userData.UserProfile?.WeeksLived },
      { info: 'User reputation', data: userData.UserProfile?.UserReputation },
      { info: 'Create date', data: TimeFormat(userData.UserProfile?.createdAt) },
      { info: 'Last update date', data: TimeFormat(userData.UserProfile?.updatedAt) },
    ];
  };
  const tableHeadData = ['User info', 'Info data'];

  const profileOptions = () => {
    return actionChecker === 'Profile table'
      ? <CustomTable
        headData={tableHeadData}
        tableData={processedUserData(profileData)}
      />
      : <EditProfile/>;
  };

  const avatarOptions = () => {
    return selectedAvatar
      ? <img style={{ width: '250px', height: 'auto', borderRadius: '25px' }} src={require(`../../assets/userAvatars/${selectedAvatar}.png`)} alt="User avatar"/>
      : <AvatarPicker/>;
  };

  return (
    <Layout>
      {
        pending
          ? <LinearProgress/>
          : (
            <>
              <PageTitle titleName={'Profile'}/>
              <Container>
                <Box paddingTop={'1%'} display={'grid'} gridTemplateColumns={'25% 75%'}>
                  <Box display={'flex'} alignItems={'center'} flexDirection={'column'} borderRight={'1px solid whitesmoke'}>
                    {avatarOptions()}

                    <Button
                      onClick={() => updateTrigger()}
                      variant={'outlined'}
                      sx={{ width: '90%', marginTop: '10%' }}
                    >
                      Update profile
                    </Button>
                  </Box>

                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    paddingLeft={'1%'}
                  >
                    <ProfileToggleButton/>
                    {profileOptions()}
                  </Box>
                </Box>
              </Container>
            </>
          )
      }
    </Layout>
  );
};

export default Profile;