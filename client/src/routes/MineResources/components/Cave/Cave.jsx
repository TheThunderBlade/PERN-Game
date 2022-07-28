import { useGate, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../components/Layout/Layout';
import MainResourcesBlock from '../../../../components/MainResourcesBlock/MainResourcesBlock';
import { $caveResources, CaveGate } from '../../../../store/Mining/Cave/Cave.model';
import { $mineInfo } from '../../../../store/Mining/Mining.model';
import {
  $resourceAmount,
} from '../../../../store/User/UserResources.model';
import Cave_NPC from '../../../../assets/NPC/Cave_NPC.png';
import { CaveInfo } from './Cave.info';

const Cave = () => {
  const navigate = useNavigate();
  useGate(CaveGate);
  const mineInfo = useStore($mineInfo);
  const caveResources = useStore($caveResources);
  const resourcesAmount = useStore($resourceAmount);
  const resourcesAmountKeys = Object.keys(resourcesAmount);
  const upgradeData = CaveInfo.get(mineInfo.CaveLevel);

  useEffect(() => {
    if (Object.keys(mineInfo).length === 0) {
      navigate('/mineResources');
    }
  }, [mineInfo, navigate]);

  return (
    <Layout>
      <MainResourcesBlock
        resources={caveResources}
        resourcesAmountKeys={resourcesAmountKeys}
        resourcesAmount={resourcesAmount}
        pageTitle={`Cave Lvl. ${mineInfo.CaveLevel}`}
        NPC={Cave_NPC}
        upgradeData={upgradeData}
        NPC_Name="Taras"
        buildingsFlag="Cave"
      />
    </Layout>
  );
};

export default Cave;