import { Box, Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import {
  ResourcesImageList
} from '../../../../components/ResourcesBlock/components/ResourcesImageList/ResourcesImageList';
import { passQuestFx, removeQuestFx } from '../../../../store/Quests/Quests.model';

const QuestBlock = ({ quest, QuestInList }) => {
  const requirementsKeys = Object.keys(quest?.QuestRequirements);
  const requirementsValues = Object.values(quest?.QuestRequirements);
  return (
    <Box
      display={'grid'}
      gridTemplateRows={'10% 80% 10%'}
      border={'1px solid whitesmoke'}
      borderRadius={'25px'}
      marginLeft={'3%'}
      marginRight={'3%'}
      height={'60vh'}
      paddingLeft={'2%'}
      paddingRight={'2%'}
    >
      <Box paddingTop={'2%'} display={'flex'} justifyContent={'flex-end'} borderBottom={'1px solid whitesmoke'}>
        {requirementsKeys.length > 0 && (<CancelIcon sx={{ cursor: 'pointer' }} onClick={() => removeQuestFx({ QuestInList })}/>)}
      </Box>
      {
        requirementsKeys.length === 0 ? (
          <Box display={'flex'} justifyContent={'center'}>
            <Typography variant={'h4'}>Quest was passed</Typography>
          </Box>
        ) : (
          <>
          <Box display={'grid'} gridTemplateRows={'1fr 1fr'}>
            <Box height={'100%'} overflow={'auto'}>
              <Typography variant={'h5'}>Quest requirements</Typography>
              {
                requirementsKeys.map((key, index) => (
                  <Box
                    key={index}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    border={'1px solid whitesmoke'}
                    borderRadius={'15px'}
                    margin={'3%'}
                    paddingLeft={'5%'}
                    paddingRight={'5%'}
                  >
                    <img width={'15%'} src={ResourcesImageList.get(key)} alt={key}/>
                    <Typography variant={'p'}>{key}: </Typography>
                    <Typography variant={'p'}>{requirementsValues[index]}</Typography>
                  </Box>
                ))
              }
            </Box>
            <Box height={'100%'} overflow={'auto'}>
              <Typography variant={'h5'}>Quest rewards</Typography>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                border={'1px solid whitesmoke'}
                borderRadius={'15px'}
                margin={'3%'}
                paddingLeft={'5%'}
                paddingRight={'5%'}
              >
                <img width={'15%'} src={ResourcesImageList.get('Money')} alt={'Money'}/>
                <Typography variant={'p'}>Money: </Typography>
                <Typography variant={'p'}>{quest.MoneyForDoing}</Typography>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                border={'1px solid whitesmoke'}
                borderRadius={'15px'}
                margin={'3%'}
                paddingLeft={'5%'}
                paddingRight={'5%'}
              >
                <img width={'15%'} src={ResourcesImageList.get('ReputationPoints')} alt={'Money'}/>
                <Typography variant={'p'}>Reputation points: </Typography>
                <Typography variant={'p'}>{quest.ReputationForDoing}</Typography>
              </Box>
            </Box>
          </Box>
          <Box paddingBottom={'2%'} paddingTop={'1%'} display={'flex'} justifyContent={'center'} borderTop={'1px solid whitesmoke'}>
            <Button onClick={() => passQuestFx({ QuestId: quest.QuestId, QuestInList })} sx={{ width: '90%' }} variant={'outlined'}>Pass quest</Button>
          </Box>
        </>
        )
      }
    </Box>
  );
};

export default QuestBlock;