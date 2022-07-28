import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'effector-forms';
import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
import Logo from '../../../components/Logo/Logo';
import { signInForm, signInFx } from '../../../store/Auth/Auth.model';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const pending = useStore(signInFx.pending);

  useEffect(() => {
    signInFx.doneData.watch(() => navigate('/profile'))
  }, [navigate])

  const {
    fields,
    hasError,
    errorText,
    eachValid,
    submit,
  } = useForm(signInForm);

  const onSubmit = (e) => {
    e.preventDefault();
    submit();
  }

  const disabled = pending && !eachValid;

  return (
    <Container>
      <CustomAlert />
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
          <ButtonGroup variant='outlined' aria-label="outlined button group">
            <Button disabled={disabled} onClick={onSubmit}>Login</Button>
            <Button disabled={disabled} onClick={() => navigate('/signUp')}>Registration</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;