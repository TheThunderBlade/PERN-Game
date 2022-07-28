import { createEffect, forward, createStore, sample } from 'effector';
import { api } from '../../api/api';
import { $caveResources } from '../Mining/Cave/Cave.model';
import { mineResourcesFx, saveCaveResourcesFx } from '../Mining/Mining.model';
import { fetchProfileFx } from './User.model';

export const toNextDayFx = createEffect(() => api.get('/toNextDay').then(({ data }) => data));

export const $resourceAmount = createStore({
  Stone: 0,
  Iron: 0,
  Gold: 0,
  Diamond: 0,
  Wood: 0,
  WoodBeam: 0,
})
  .reset(saveCaveResourcesFx?.finally);

sample({
  source: [$resourceAmount, $caveResources],
  clock: mineResourcesFx?.doneData,
  fn: (source) => {
    const calculatedResources = { ...source[0] };
    const resourcesKeys = Object.keys(source[1][source[1].length - 1]);
    for (const key of resourcesKeys) {
      calculatedResources[key] += source[1][source[1].length - 1][key];
    }
    return calculatedResources;
  },
  target: $resourceAmount,
});

forward({
  from: [toNextDayFx.finally, mineResourcesFx?.finally, saveCaveResourcesFx?.finally],
  to: fetchProfileFx,
});