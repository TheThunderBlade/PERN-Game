import { createEffect, createEvent, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { api } from '../../api/api';
import { editProfileForm } from '../../routes/Profile/components/EditProfile/EditProfile.model';
import { logoutFx, refreshFx } from '../Auth/Auth.model';

export const ProfileGate = createGate();
export const fetchProfileFx = createEffect(() => api.get('/getProfile').then(({ data }) => data));
export const updateProfileFx = createEffect(({ UserName, Password, AvatarId }) => api
  .post('/updateProfile', { UserName, Password, AvatarId }).then(({ data }) => data));
export const deleteUserFx = createEffect(() => api.post('/deleteUser').then(({ data }) => data));

forward({
  from: deleteUserFx.finally,
  to: logoutFx,
});

export const updateTrigger = createEvent();

export const $userProfile = createStore({})
  .on(fetchProfileFx.doneData, (_, profile) => profile)
  .reset(logoutFx.doneData);

export const selectAvatar = createEvent();
export const $selectedAvatar = createStore('')
  .on(selectAvatar, (_, avatar) => avatar)
  .on(fetchProfileFx.doneData, (_, profile) => profile?.UserProfile?.AvatarId)
  .reset(ProfileGate.close);

forward({
  from: [ProfileGate.open, refreshFx.finally, updateProfileFx.finally],
  to: fetchProfileFx,
});

forward({
  from: ProfileGate.close,
  to: editProfileForm.reset,
})

sample({
  source: [$selectedAvatar, editProfileForm.$values],
  clock: updateTrigger,
  fn: (source) => ({
    UserName: source[1].UserName,
    Password: source[1].Password,
    AvatarId: source[0],
  }),
  target: updateProfileFx,
})