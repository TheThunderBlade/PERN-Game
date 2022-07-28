import { useGate, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sawmill_NPC from '../../../../assets/NPC/Sawmill_NPC.png';
import Layout from '../../../../components/Layout/Layout';
import MainResourcesBlock from '../../../../components/MainResourcesBlock/MainResourcesBlock';
import { $mineInfo } from '../../../../store/Mining/Mining.model';
import { $sawmillResources, SawmillGate } from '../../../../store/Mining/Sawmill/Sawmill.model';
import { $resourceAmount } from '../../../../store/User/UserResources.model';
import { SawmillInfo } from './Sawmill.info';

const Sawmill = () => {
  const navigate = useNavigate();
  useGate(SawmillGate);
  const mineInfo = useStore($mineInfo);
  const sawmillResources = useStore($sawmillResources)
  const resourcesAmount = useStore($resourceAmount);
  const resourcesAmountKeys = Object.keys(resourcesAmount);
  const upgradeData = SawmillInfo.get(mineInfo.SawmillLevel);

  useEffect(() => {
    if (Object.keys(mineInfo).length === 0) {
      navigate('/mineResources');
    }
  }, [mineInfo, navigate]);

  return (
    <Layout>
      <MainResourcesBlock
        resources={sawmillResources}
        resourcesAmountKeys={resourcesAmountKeys}
        resourcesAmount={resourcesAmount}
        pageTitle={`Sawmill Lvl. ${mineInfo.SawmillLevel}`}
        NPC={Sawmill_NPC}
        upgradeData={upgradeData}
        NPC_Name="Rostik"
        buildingsFlag="Sawmill"
      />
    </Layout>
  );
};

export default Sawmill;