import { Box } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';
import MessageBox from '../../../../components/MessageBox/MessageBox';
import { $messages } from '../../../../store/Chat/Chat.model';

const MessageList = () => {
  const messages = useStore($messages);

  return (
    <Box
      display={'flex'}
      flexDirection={'column-reverse'}
      padding={'0 1% 0 1%'}
      overflow={'scroll'}
      height={'100%'}
    >
      {
        messages.map((message) => (
          <MessageBox
            key={message.MessageId}
            message={message.Message}
            SenderId={message.SenderId}
          />
        ))
      }
    </Box>
  );
};

export default MessageList;