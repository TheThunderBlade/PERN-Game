import {
  createEvent,
  createEffect,
  createStore,
  forward,
} from 'effector-root';
import { refreshFx, signInFx, signUpFx } from '../../store/Auth/Auth.model';
import {
  acceptRequestFx,
  declineRequestFx, deleteFriendFx,
  inviteFriendFx,
  removeMyRequestsFx
} from '../../store/FriendList/FriendList.model';
import { mineResourcesFx, upgradeBuilding } from '../../store/Mining/Mining.model';
import { passQuestFx } from '../../store/Quests/Quests.model';
import { updateProfileFx } from '../../store/User/User.model';

export const openHandler = createEvent();
export const resetTrigger = createEvent();

const delay = createEffect(() => new Promise(() => setTimeout(() => resetTrigger(), 3000)));

export const $isOpen = createStore(false)
  .on(openHandler, () => true)
  .reset(resetTrigger);

forward({
  from: openHandler,
  to: delay,
});

export const $alertMessage = createStore({})
  .on(signUpFx.doneData, (_, { message }) => ({ message, type: 'success' } ))
  .on(signUpFx.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(signInFx.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(updateProfileFx.doneData, (_, { message }) => ({ message, type: 'success' } ))
  .on(updateProfileFx.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(refreshFx.finally, () => ({ message: 'Access token was successfully refreshed', type: 'success' } ))
  .on(refreshFx.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' } ))
  .on(updateProfileFx.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(mineResourcesFx?.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(upgradeBuilding?.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(passQuestFx?.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(inviteFriendFx?.doneData, (_, { message }) => ({ message, type: 'success' } ))
  .on(inviteFriendFx?.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(removeMyRequestsFx?.doneData, (_, { message }) => ({ message, type: 'success' } ))
  .on(removeMyRequestsFx?.failData, (_, error) => ({ message: error?.response.data.message, type: 'error' }))
  .on(acceptRequestFx?.doneData, (_, { message }) => ({ message, type: 'success' } ))
  .on(declineRequestFx?.doneData, (_, { message }) => ({ message, type: 'success' } ))
  .on(deleteFriendFx?.doneData, (_, { message }) => ({ message, type: 'success' } ))
  .reset(resetTrigger);

forward({
  from: $alertMessage,
  to: delay,
});

forward({
  from: $alertMessage,
  to: openHandler,
});