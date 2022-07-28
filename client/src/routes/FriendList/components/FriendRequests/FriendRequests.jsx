import { Box } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import FriendActionBlock from '../../../../components/FriendActionBlock/FriendActionBlock';
import {
  $friendRequests,
  acceptRequestFx,
  declineRequestFx,
  FriendRequestsGate
} from '../../../../store/FriendList/FriendList.model';

const FriendRequests = () => {
  useGate(FriendRequestsGate);
  const friendRequests = useStore($friendRequests);
  return (
    <Box paddingLeft={'2%'} paddingRight={'2%'}>
      {
        friendRequests.map((profile) => (
          <FriendActionBlock
            key={profile.UserId}
            UserId={profile.UserId}
            actionFx={[acceptRequestFx, declineRequestFx]}
            actionFlag={'FriendRequestActions'}
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

export default FriendRequests;