import { createEffect, createStore, forward, guard, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';
import { api } from '../../api/api';
import rules from '../../utils/validationRules';

export const RegistrationGate = createGate();

export const signInFx = createEffect(({ UserName, Password }) => api
  .post('/signIn', { UserName, Password }).then(({ data }) => data));

export const signUpFx = createEffect(({ Email, Password, UserName }) => api
  .post('' +
    '/signUp', { Email, Password, UserName }).then(({ data }) => data));

export const logoutFx = createEffect(() => api.get('/logout').then(({ data }) => data));

export const refreshFx = createEffect(() => api.get('/refresh').then(({ data }) => data));

export const signInForm = createForm({
  fields: {
    UserName: {
      init: '',
      rules: [
        rules.minLength(3)
      ],
    },
    Password: {
      init: '',
      rules: [
        rules.minLength(3)
      ],
    },
  },
  validateOn: ['change', 'submit'],
});

export const signUpForm = createForm({
  fields: {
    Email: {
      init: '',
      rules: [
        rules.minLength(3),
        rules.email()
      ],
    },
    UserName: {
      init: '',
      rules: [
        rules.minLength(3)
      ],
    },
    Password: {
      init: '',
      rules: [
        rules.minLength(3),
      ],
    },
  },
  validateOn: ['change', 'submit'],
});

forward({
  from: RegistrationGate.close,
  to: signUpForm.reset,
})

sample({
  clock: signUpForm.formValidated,
  fn: (clock) => ({
    UserName: clock.UserName,
    Password: clock.Password,
    Email: clock.Email,
  }),
  target: signUpFx,
});

sample({
  clock: signInForm.formValidated,
  fn: (clock) => ({
    UserName: clock.UserName,
    Password: clock.Password,
  }),
  target: signInFx,
});

export const setTokenToHeaders = (token) => new Promise(() => {
  api.defaults.headers.common['x-access-token'] = token;
});

export const setToken = createEffect((token) => setTokenToHeaders(token));

export const $token = createStore(null)
  .on(signInFx.doneData, (_, { Token }) => Token)
  .on(refreshFx.doneData, (_, { Token }) => Token)
  .reset(logoutFx.finally);

guard({
  source: $token,
  filter: Boolean,
  target: setToken,
});

persist({
  store: $token,
  key: 'access_token',
});