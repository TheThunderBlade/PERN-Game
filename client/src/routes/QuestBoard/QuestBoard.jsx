import { Box, Typography } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import PageTitle from '../../components/PageTitle/PageTitle';
import Timer from '../../components/Timer/Timer';
import QuestInListHelper from '../../helpers/QuestInList.helper';
import { $questList, $quests, fetchQuestListFx, fetchQuestsFx, QuestsGate } from '../../store/Quests/Quests.model';
import QuestBlock from './components/QuestBlock/QuestBlock';

const QuestBoard = () => {
  useGate(QuestsGate);
  const quests = useStore($quests);
  const { updatedAt } = useStore($questList);
  const questListPending = useStore(fetchQuestListFx.pending);

  const updateDate = new Date(updatedAt);
  const expireDate = new Date(updateDate.getFullYear(), updateDate.getMonth(), updateDate.getDate() + 1, updateDate.getHours(), updateDate.getMinutes(), updateDate.getSeconds());

  return (
    <Layout>
      <PageTitle titleName={'Quest board'}/>
      <Box paddingLeft={'3%'} display={'flex'} justifyContent={'flex-start'}>
        <Typography marginRight={'1%'} variant={'p'}>Time to receive a new quests: </Typography>
        {(!questListPending && expireDate > new Date(Date.now())) && (<Timer expiryTimestamp={expireDate} onExpire={fetchQuestsFx}/>)}
      </Box>
      <Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} paddingTop={'5%'} paddingBottom={'5%'}>
        {
          quests.map((quest, index) => (
            <QuestBlock QuestInList={QuestInListHelper.get(index)} quest={quest} key={index} />
          ))
        }
      </Box>
    </Layout>
  );
};

export default QuestBoard;