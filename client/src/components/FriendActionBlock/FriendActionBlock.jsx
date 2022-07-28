import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import React from 'react';

const FriendActionBlock = ({
  UserId,
  UserName,
  UserEmail,
  AvatarId,
  UserReputation,
  WeeksLived,
  actionFx,
  actionFlag,
}) => {
  const UserAvatar = () => {
    return AvatarId
      ? <img style={{ width: '70px', height: 'auto', borderRadius: '25px' }} src={require(`../../assets/userAvatars/${AvatarId}.png`)} alt={`User avatar ${AvatarId}`}/>
      : <PersonIcon sx={{  width: '70px', height: 'auto', borderRadius: '25px' }} />
  }

  const ActionIcon = () => {
    switch (actionFlag) {
      case 'Invite':
        return (
          <PersonAddIcon
            onClick={() => actionFx(UserId)}
            sx={{  width: '50px', height: 'auto', padding: '2%', border: '1px solid whitesmoke', borderRadius: '15px', cursor: 'pointer' }}
          />
        )
      case 'Remove':
        return (
          <PersonOffIcon
            onClick={() => actionFx(UserId)}
            sx={{  width: '50px', height: 'auto', padding: '2%', border: '1px solid whitesmoke', borderRadius: '15px', cursor: 'pointer' }}
          />
        )
      case 'FriendRequestActions':
        return (
          <>
            <Box>
              <PersonAddIcon
                onClick={() => actionFx[0](UserId)}
                sx={{  width: '40px', height: 'auto', padding: '2%', border: '1px solid whitesmoke', borderRadius: '15px', cursor: 'pointer' }}
              />
            </Box>
            <Box>
              <PersonOffIcon
                onClick={() => actionFx[1](UserId)}
                sx={{  width: '40px', height: 'auto', padding: '2%', border: '1px solid whitesmoke', borderRadius: '15px', cursor: 'pointer' }}
              />
            </Box>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Box
      display={'grid'}
      gridTemplateColumns={'10% 80% 10%'}
      border={'1px solid whitesmoke'}
      marginTop={'1%'}
      borderRadius={'15px'}
      padding={'1% 2% 1% 2%'}
      maxHeight={'100px'}
    >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {UserAvatar()}
      </Box>
      <Box display={'grid'} gridTemplateRows={'50% 50%'}>
        <Box borderBottom={'1px solid whitesmoke'}>
          <Typography variant={'h5'}>{UserName}</Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant={'p'}>User email: {UserEmail}</Typography>
          <Typography variant={'p'}>User reputation: {UserReputation}</Typography>
          <Typography variant={'p'}>Weeks lived: {WeeksLived}</Typography>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={actionFlag !== 'FriendRequestActions' ? 'center' : 'space-around'} alignItems={'center'}>
        {ActionIcon()}
      </Box>
    </Box>
  );
};

export default FriendActionBlock;