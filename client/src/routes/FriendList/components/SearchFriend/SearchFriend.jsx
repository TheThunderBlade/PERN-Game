import { Box, InputAdornment, TextField } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import FriendActionBlock from '../../../../components/FriendActionBlock/FriendActionBlock';
import {
  $candidatesList,
  clearCandidates,
  fetchFriendListFx,
  inviteFriendFx,
  SearchFriendGate
} from '../../../../store/FriendList/FriendList.model';

const SearchFriend = () => {
  useGate(SearchFriendGate);
  const [userNamePart, setUserNamePart] = useState('');
  const candidatesList = useStore($candidatesList);

  const onEnter = (event) => {
    if (event.key === 'Enter') {
      fetchFriendListFx(userNamePart);
      setUserNamePart('');
    }
  }

  return (
    <Box paddingLeft={'2%'} paddingRight={'2%'} marginTop={'1%'}>
      <TextField
        onChange={(e) => setUserNamePart(e.target.value)}
        onKeyDown={(e) => onEnter(e)}
        fullWidth
        value={userNamePart}
        label="Search Friend"
        id="SearchFriend"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon
                onClick={() => {
                  setUserNamePart('');
                  clearCandidates();
                }}
                sx={{ cursor: 'pointer' }}
              />
            </InputAdornment>
          )
        }}
      />
      <Box display={'flex'} flexDirection={'column'} maxHeight={'30rem'} overflow={'auto'}>
        {
          candidatesList.map((candidate) => (
            <FriendActionBlock
              key={candidate.UserId}
              UserId={candidate.UserId}
              actionFx={inviteFriendFx}
              actionFlag={'Invite'}
              UserName={candidate.UserName}
              UserEmail={candidate.Email}
              AvatarId={candidate?.profiles.AvatarId}
              UserReputation={candidate?.profiles.UserReputation}
              WeeksLived={candidate?.profiles.WeeksLived}
            />
          ))
        }
      </Box>
    </Box>
  );
};

export default SearchFriend;