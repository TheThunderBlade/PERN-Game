import { Box } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import UserProfileChatBlock from '../../../../components/UserProfileChatBlock/UserProfileChatBlock';
import { $userChatList, fetchUserChatListFx } from '../../../../store/Chat/Chat.model';

const UserList = () => {
  const userChatList = useStore($userChatList);
  const listPending = useStore(fetchUserChatListFx.pending);
  return (
    <Box padding={'1%'}>
      {
       !listPending && userChatList.map((user) => (
         <UserProfileChatBlock
           key={user.UserId}
           AvatarId={user.profiles.AvatarId}
           UserName={user.UserName}
           LastMessage={user.chatRooms[0].chatMessages[user.chatRooms[0].chatMessages.length - 1]}
           ChatRoomId={user.chatRooms[0].ChatRoomId}
         />
        ))
      }
    </Box>
  );
};

export default UserList;