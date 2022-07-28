import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
import Logo from '../../../components/Logo/Logo';
import { RegistrationGate, signUpForm, signUpFx } from '../../../store/Auth/Auth.model';
import styles from './Registration.module.css';

const Registration = () => {
  useGate(RegistrationGate);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const pending = useStore(signUpFx.pending);
  useEffect(() => {
    signUpFx.doneData.watch(() => navigate('/'));
  }, [navigate])

  const {
    fields,
    hasError,
    errorText,
    eachValid,
    submit,
  } = useForm(signUpForm);

  const onSubmit = (e) => {
    e.preventDefault();
    submit();
  }

  const disabled = pending || !eachValid;
  return (
    <Container>
      <CustomAlert/>
      <Box className={styles.main}>
        <Box marginTop={'15%'}>
          <Logo variant={'h3'} iconSize={50}/>
        </Box>
        <Box className={styles.inputs}>
          <TextField
            required
            value={fields?.UserName.value}
            onChange={(e) => fields?.UserName.onChange(e.target.value)}
            label="UserName"
            placeholder="Enter your UserName"
            error={hasError('UserName')}
            helperText={errorText('UserName')}
            margin="normal"
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            value={fields?.Email.value}
            onChange={(e) => fields?.Email.onChange(e.target.value)}
            label="Email"
            placeholder="Enter your Email"
            error={hasError('Email')}
            helperText={errorText('Email')}
            margin="normal"
            autoComplete="off"
            fullWidth
          />
          <TextField
            required
            value={fields?.Password.value}
            onChange={(e) => fields?.Password.onChange(e.target.value)}
            type={showPass ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
            error={hasError('Password')}
            helperText={errorText('Password')}
            margin="normal"
            autoComplete="off"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box className={styles.buttons}>
          <Button disabled={disabled} onClick={onSubmit} variant='outlined'>Create a new user</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;