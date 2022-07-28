import { createGate } from 'effector-react';
import { api } from '../../api/api';
import { createStore, createEffect, createEvent, sample } from 'effector';
import { fetchProfileFx } from '../User/User.model';

export const FriendListGate = createGate();
export const SearchFriendGate = createGate();
export const MyRequestsGate = createGate();
export const FriendRequestsGate = createGate();
export const MyFriendListGate = createGate();

export const fetchFriendListFx = createEffect((userNamePart = '') => api.post('/searchFriend', { userNamePart }).then(({ data }) => data));
export const inviteFriendFx = createEffect((InvitedUserId) => api.post('/sendFriendRequest', { InvitedUserId }).then(({ data }) => data));
export const fetchMyRequestsFx = createEffect(() => api.get('/getMyRequests').then(({ data }) => data));
export const removeMyRequestsFx = createEffect((InvitedUserId) => api.post('/removeMyRequest', { InvitedUserId }).then(({ data }) => data));
export const fetchFriendRequestsFx = createEffect(() => api.get('/friendRequests').then(({ data }) => data));

export const acceptRequestFx = createEffect((InvitedUserId) => api.post('/acceptRequest', { InvitedUserId }).then(({ data }) => data));
export const declineRequestFx = createEffect((InvitedUserId) => api.post('/declineRequest', { InvitedUserId }).then(({ data }) => data));

export const fetchMyFriendListFx = createEffect(() => api.get('/getMyFriendList').then(({ data }) => data));
export const deleteFriendFx = createEffect((FriendId) => api.post('/deleteFriend', { FriendId }).then(({ data }) => data));

export const clearCandidates = createEvent();
export const $candidatesList = createStore([])
  .on(fetchFriendListFx?.doneData, (_, payload) => payload)
  .reset(clearCandidates)
  .reset(SearchFriendGate.close);

export const $myRequests = createStore([])
  .on(fetchMyRequestsFx.doneData, (_, payload) => payload)
  .reset(MyRequestsGate.close);

export const $friendRequests = createStore([])
  .on(fetchFriendRequestsFx.doneData, (_, payload) => payload)
  .reset(FriendRequestsGate.close);

export const $friendList = createStore([])
  .on(fetchMyFriendListFx.doneData, (_, payload) => payload)
  .reset(MyFriendListGate.close);

sample({
  clock: [MyFriendListGate.open, deleteFriendFx?.finally],
  target: fetchMyFriendListFx,
})

sample({
  clock: [MyRequestsGate.open, removeMyRequestsFx?.finally],
  target: fetchMyRequestsFx,
});

sample({
  clock: [FriendRequestsGate.open, acceptRequestFx?.finally, declineRequestFx?.finally],
  target: fetchFriendRequestsFx,
});

sample({
  clock: [acceptRequestFx?.finally, declineRequestFx?.finally],
  target: fetchProfileFx,
})