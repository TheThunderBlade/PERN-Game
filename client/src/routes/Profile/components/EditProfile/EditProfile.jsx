import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'effector-forms';
import React from 'react';
import { deleteUserFx } from '../../../../store/User/User.model';
import { editProfileForm } from './EditProfile.model';

const EditProfile = () => {
  const {
    fields,
    hasError,
    errorText,
  } = useForm(editProfileForm);

  return (
    <Box>
      <TextField
        value={fields?.UserName.value}
        onChange={(e) => fields?.UserName.onChange(e.target.value)}
        label="UserName"
        placeholder="Enter your new UserName"
        error={hasError('UserName')}
        helperText={errorText('UserName')}
        margin="normal"
        fullWidth
      />
      <TextField
        value={fields?.Password.value}
        onChange={(e) => fields?.Password.onChange(e.target.value)}
        label="Password"
        placeholder="Enter your new password"
        error={hasError('UserName')}
        helperText={errorText('UserName')}
        margin="normal"
        fullWidth
      />

      <Button onClick={() => deleteUserFx()} fullWidth variant={'outlined'} color={'error'}>Delete user</Button>
    </Box>
  );
};

export default EditProfile;