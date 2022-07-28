import Login from './Auth/Login/Login';
import Registration from './Auth/Registration/Registration';
import ChatRooms from './ChatRooms/ChatRooms';
import FriendList from './FriendList/FriendList';
import Cave from './MineResources/components/Cave/Cave';
import Sawmill from './MineResources/components/Sawmill/Sawmill';
import MineResources from './MineResources/MineResources';
import Profile from './Profile/Profile';
import QuestBoard from './QuestBoard/QuestBoard';
import Town from './Town/Town';

export const AuthRoutes = [
  {
    path: '/',
    element: <Login/>,
  },
  {
    path: '/signUp',
    element: <Registration/>
  },
];

export const PrivateRoutes = [
  {
    path: '/town',
    element: <Town/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/mineResources',
    element: <MineResources/>,
  },
  {
    path: '/QuestBoard',
    element: <QuestBoard/>,
  },
  {
    path: '/FriendList',
    element: <FriendList/>,
  },
  {
    path: '/ChatRooms',
    element: <ChatRooms/>,
  },
];

export const MineRoutes = [
  {
    path: '/mineResources/Cave',
    element: <Cave/>,
    visitDays: ['Monday', 'Wednesday', 'Sunday'],
  },
  {
    path: '/mineResources/Sawmill',
    element: <Sawmill/>,
    visitDays: ['Tuesday', 'Thursday', 'Sunday'],
  },
];