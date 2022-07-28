import { createEvent, createStore } from 'effector';
import { FriendListGate } from '../../../../store/FriendList/FriendList.model';

export const setAlignment = createEvent();
export const $alignment = createStore('My friends')
  .on(setAlignment, (_, alignment) => alignment)
  .reset(FriendListGate.close);
