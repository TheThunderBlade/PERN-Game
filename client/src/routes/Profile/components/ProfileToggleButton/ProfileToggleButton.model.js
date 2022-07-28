import { createEvent, createStore } from 'effector';

export const setAlignment = createEvent();
export const $alignment = createStore('Profile table')
  .on(setAlignment, (_, alignment) => alignment);