import { useStore } from 'effector-react';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DayHelper from '../helpers/Day.helper';
import { $token } from '../store/Auth/Auth.model';
import { $userProfile } from '../store/User/User.model';
import { AuthRoutes, MineRoutes, PrivateRoutes } from './routes.mock';

const MainRoutes = () => {
  const isAuth = useStore($token);
  const { UserProfile } = useStore($userProfile);
  const dayNow = DayHelper.get(UserProfile?.CurrentDay)

  return (
    <Routes>
      {!isAuth && AuthRoutes.map((route, index) => (<Route key={index} path={route.path} element={route.element} exact/>))}
      {isAuth && PrivateRoutes.map((route, index) => (<Route key={index} path={route.path} element={route.element} exact/>))}
      {isAuth && MineRoutes.map((route, index) => (route.visitDays.includes(dayNow) && <Route key={index} path={route.path} element={route.element} exact/>))}
      <Route path="*" element={<Navigate replace to={isAuth ? '/town' : '/'}/>}/>
    </Routes>
  );
};

export default MainRoutes;