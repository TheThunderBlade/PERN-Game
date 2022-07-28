import { createGate } from 'effector-react';
import { createStore, createEffect, forward, sample } from 'effector';
import { api } from '../../api/api';
import { fetchProfileFx } from '../User/User.model';

export const QuestsGate = createGate();

export const fetchQuestsFx = createEffect(() => api.get('/getThreeDailyQuests').then(({ data }) => data));
export const fetchQuestListFx = createEffect(() => api.get('/getQuestList').then(({ data }) => data));
export const passQuestFx = createEffect((QuestData) => api.post('/passQuest', QuestData).then(({ data }) => data));
export const removeQuestFx = createEffect((QuestData) => api.post('/removeQuest', QuestData).then(({ data }) => data));

export const $quests = createStore([])
  .on(fetchQuestsFx.doneData, (_, payload) => payload
    ?.map((quest) => ({ ...quest, QuestRequirements: quest ? JSON.parse(quest?.QuestRequirements) : {} })));

export const $questList = createStore({})
  .on(fetchQuestListFx.doneData, (_, payload) => payload);

forward({
  from: QuestsGate.open,
  to: [fetchQuestsFx, fetchQuestListFx],
});

sample({
  clock: passQuestFx?.doneData,
  target: [fetchQuestsFx, fetchProfileFx],
})

sample({
  clock: removeQuestFx?.doneData,
  target: fetchQuestsFx,
})