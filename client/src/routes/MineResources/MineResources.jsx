import { Box, Button, Tooltip } from '@mui/material';
import { useGate, useStore } from 'effector-react';
import React  from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import PageTitle from '../../components/PageTitle/PageTitle';
import DayHelper from '../../helpers/Day.helper';
import { MineGate } from '../../store/Mining/Mining.model';
import { $userProfile } from '../../store/User/User.model';
import { MiningElementsList } from './MiningList';

const MineResources = () => {
  useGate(MineGate);
  const navigate = useNavigate();
  const { UserProfile } = useStore($userProfile);
  const dayNow = DayHelper.get(UserProfile?.CurrentDay)

  return (
    <Layout>
      <PageTitle titleName={'Mine resources'}/>
      <Box paddingTop={'1%'} display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'} gridTemplateRows={'1fr 1fr'}>
        {
          MiningElementsList.map((item) => (
            <Box
              key={item.MineName}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
            >
              <Tooltip title={item.MineDescription + ` on ${item.visitDays.join(', ')}`}>
                <img
                  width={'40%'}
                  style={{ borderRadius: '25px', border: '1px solid whitesmoke' }}
                  src={item.MineImage}
                  alt={item.MineName}
                />
              </Tooltip>
              <Box padding={'2%'} />
              <Button
                onClick={() => navigate(`/mineResources/${item.MineName}`)}
                variant={'outlined'}
                disabled={!item.visitDays.includes(dayNow)}
              >
                Enter to {item.MineName}
              </Button>
            </Box>
          ))
        }
      </Box>
    </Layout>
  );
};

export default MineResources;