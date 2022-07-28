import PersonIcon from '@mui/icons-material/Person';
import { Box, Divider, Typography } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import { selectChatRoomFx } from '../../store/Chat/Chat.model';
import { $userProfile } from '../../store/User/User.model';

const UserProfileChatBlock = ({ AvatarId, UserName, LastMessage, ChatRoomId }) => {
  const { User } = useStore($userProfile);
  const UserAvatar = () => {
    return AvatarId
      ? <img style={{ width: '50px', height: 'auto', borderRadius: '25px' }} src={require(`../../assets/userAvatars/${AvatarId}.png`)} alt={`User avatar ${AvatarId}`}/>
      : <PersonIcon sx={{  width: '70px', height: 'auto', borderRadius: '25px' }} />
  }

  const LastMessageData = () => {
    return User?.UserId === LastMessage?.SenderId
      ? (<>You: {LastMessage?.Message.length > 18 ? LastMessage?.Message.slice(0, 18).concat('...') : LastMessage?.Message}</>)
      : (<>{LastMessage?.Message.length > 18 ? LastMessage?.Message.slice(0, 18).concat('...') : LastMessage?.Message}</>)
  }

  return (
    <Box
      display={'grid'}
      gridTemplateColumns={'20% 80%'}
      border={'1px solid whitesmoke'}
      borderRadius={'15px'}
      maxHeight={'100%'}
      padding={'1% 0 1% 0'}
      marginBottom={'2%'}
      sx={{ cursor: 'pointer' }}
      onClick={() => selectChatRoomFx(ChatRoomId)}
    >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {UserAvatar()}
      </Box>

      <Box display={'flex'} flexDirection={'column'}>
        <Box>
          <Typography variant={'p'}>{UserName}</Typography>
        </Box>
        <Divider/>
        <Box>
          <Typography variant={'p'}>{LastMessageData()}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileChatBlock;