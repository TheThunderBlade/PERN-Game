import { Box } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import FriendActionBlock from '../../../../components/FriendActionBlock/FriendActionBlock';
import { $myRequests, MyRequestsGate, removeMyRequestsFx } from '../../../../store/FriendList/FriendList.model';

const MyRequests = () => {
  useGate(MyRequestsGate);
  const myRequests = useStore($myRequests);
  return (
    <Box paddingLeft={'2%'} paddingRight={'2%'}>
      <Box display={'flex'} flexDirection={'column'} maxHeight={'35rem'} overflow={'auto'}>
        {
          myRequests.map((profile) => (
            <FriendActionBlock
              key={profile.UserId}
              UserId={profile.UserId}
              actionFx={removeMyRequestsFx}
              actionFlag={'Remove'}
              UserName={profile.UserName}
              UserEmail={profile.Email}
              AvatarId={profile?.profiles.AvatarId}
              UserReputation={profile?.profiles.UserReputation}
              WeeksLived={profile?.profiles.WeeksLived}
            />
          ))
        }
      </Box>
    </Box>
  );
};

export default MyRequests;