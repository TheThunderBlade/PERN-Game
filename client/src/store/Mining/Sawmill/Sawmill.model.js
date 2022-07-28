import { createStore } from 'effector';
import { createGate } from 'effector-react';
import { mineResourcesFx, saveCaveResourcesFx } from '../Mining.model';

export const SawmillGate = createGate();

export const $sawmillResources = createStore([])
  .on(mineResourcesFx?.doneData, (store, payload) => [...store, payload])
  .reset(SawmillGate.close)
  .reset(saveCaveResourcesFx?.finally);