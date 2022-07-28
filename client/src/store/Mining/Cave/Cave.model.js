import { createStore } from 'effector';
import { createGate } from 'effector-react';
import { mineResourcesFx, saveCaveResourcesFx } from '../Mining.model';

export const CaveGate = createGate();

export const $caveResources = createStore([])
  .on(mineResourcesFx?.doneData, (store, payload) => [...store, payload])
  .reset(CaveGate.close)
  .reset(saveCaveResourcesFx?.finally);