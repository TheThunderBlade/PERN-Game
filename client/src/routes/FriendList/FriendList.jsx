import { useGate } from 'effector-react';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import PageTitle from '../../components/PageTitle/PageTitle';
import { FriendListGate } from '../../store/FriendList/FriendList.model';
import ActionBar from './components/ActionBar/ActionBar';
import ComponentSelector from './components/ComponentSelector/ComponentSelector';

const FriendList = () => {
  useGate(FriendListGate);
  return (
    <Layout>
      <PageTitle titleName={'Friend List'}/>
      <ActionBar/>
      <ComponentSelector/>
    </Layout>
  );
};

export default FriendList;