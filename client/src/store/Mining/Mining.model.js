import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { api } from '../../api/api';
import { fetchProfileFx } from '../User/User.model';

export const MineGate = createGate();

export const getMineInfo = createEffect(() => api.get('/getMineInfo').then(({ data }) => data));
export const mineResourcesFx = createEffect((resourceFlag) => api.post('/mineResources', { resourceFlag }).then(({ data }) => data));
export const saveCaveResourcesFx = createEffect((resources) => api.post('/saveCaveResources', resources).then(({ data }) => data));
export const upgradeBuilding = createEffect((buildingFlag) => api.post('/upgradeBuilding', { buildingFlag }).then(({ data }) => data));

forward({
  from: MineGate.open,
  to: getMineInfo,
});

forward({
  from: upgradeBuilding?.doneData,
  to: [getMineInfo, fetchProfileFx],
});

export const $mineInfo = createStore({})
  .on(getMineInfo.doneData, (_, { CaveLevel, SawmillLevel }) => ({ CaveLevel, SawmillLevel }));