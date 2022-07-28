import { createGate } from 'effector-react';
import { createEffect, sample, createStore } from 'effector';
import { api } from '../../api/api';

export const UserListGate = createGate();

export const fetchUserChatListFx = createEffect(() => api.get('/getUserChatList').then(({ data }) => data));
export const selectChatRoomFx = createEffect((ChatRoomId) => api.post('/selectChatRoom', { ChatRoomId }).then(({ data }) => data));

export const $userChatList = createStore([])
  .on(fetchUserChatListFx.doneData, (_, payload) => payload)
  .reset(UserListGate.close);

export const $messages = createStore([])
  .on(selectChatRoomFx?.doneData, (_, payload) => payload)
  .reset(UserListGate.close);

sample({
  clock: UserListGate.open,
  target: fetchUserChatListFx,
})