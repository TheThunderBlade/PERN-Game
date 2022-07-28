import { Box } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import PageTitle from '../../components/PageTitle/PageTitle';
import { $messages, selectChatRoomFx, UserListGate } from '../../store/Chat/Chat.model';
import MessageList from './components/MessageList/MessageList';
import UserList from './components/UserList/UserList';

const ChatRooms = () => {
  useGate(UserListGate);
  const messagePending = useStore(selectChatRoomFx?.pending);
  const messages = useStore($messages);

  return (
    <Layout>
      <PageTitle titleName={'Chat Rooms'}/>
      <Box padding={'1% 2% 0 2%'} display={'grid'} gridTemplateColumns={'25% 75%'} height={'93%'}>
        <Box overflow={'auto'}>
          <UserList />
        </Box>
        <Box border={'1px solid whitesmoke'}>
          {
            (!messagePending && messages.length > 0) && (
              <MessageList />
            )
          }
        </Box>
      </Box>
    </Layout>
  );
};

export default ChatRooms;