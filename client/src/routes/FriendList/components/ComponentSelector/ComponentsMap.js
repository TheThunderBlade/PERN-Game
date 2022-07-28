import FriendRequests from '../FriendRequests/FriendRequests';
import MyFriendList from '../MyFriendList/MyFriendList';
import MyRequests from '../MyRequests/MyRequests';
import SearchFriend from '../SearchFriend/SearchFriend';

export default new Map([
  ['My friends', <MyFriendList/>],
  ['Search friends', <SearchFriend/>],
  ['Friend requests', <FriendRequests/>],
  ['My requests', <MyRequests/>],
]);