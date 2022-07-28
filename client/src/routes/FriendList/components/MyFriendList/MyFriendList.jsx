import { Box } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import FriendActionBlock from '../../../../components/FriendActionBlock/FriendActionBlock';
import {
  $friendList, deleteFriendFx,
  MyFriendListGate
} from '../../../../store/FriendList/FriendList.model';

const MyFriendList = () => {
  useGate(MyFriendListGate);
  const friendList = useStore($friendList);

  return (
    <Box paddingLeft={'2%'} paddingRight={'2%'}>
      {
        friendList.map((profile) => (
          <FriendActionBlock
            key={profile.UserId}
            UserId={profile.UserId}
            actionFlag={'Remove'}
            actionFx={deleteFriendFx}
            UserName={profile.UserName}
            UserEmail={profile.Email}
            AvatarId={profile?.profiles.AvatarId}
            UserReputation={profile?.profiles.UserReputation}
            WeeksLived={profile?.profiles.WeeksLived}
          />
        ))
      }
    </Box>
  );
};

export default MyFriendList;