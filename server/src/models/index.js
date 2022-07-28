const { User } = require('./User.model');
const { UserSession } = require('./UserSession.model');
const { UserProfile } = require('./UserProfile.model');
const { UserResources } = require('./UserResources.model');
const { ResourcesBuildings } = require('./ResourcesBuildings.modes');
const { Quests } = require('./Quests.model');
const { QuestsList } = require('./QuestsList.model');
const { FriendList } = require('./FriendList.model');
const { FriendRequest } = require('./FriendRequests.model');
const { ChatRoom } = require('./ChatRoom.model');
const { ChatMessages } = require('./ChatMessages.model');

ChatRoom.hasMany(ChatMessages, {
  as: 'chatMessages',
  foreignKey: 'ChatRoomId',
  sourceKey: 'ChatRoomId',
  onDelete: 'cascade',
});
ChatMessages.belongsTo(ChatRoom, {
  as: 'chatRooms',
  foreignKey: 'ChatRoomId',
  onDelete: 'cascade',
});

User.hasMany(ChatRoom, {
  as: 'chatRooms',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
ChatRoom.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
});

User.hasMany(FriendRequest, {
  as: 'friendRequests',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
FriendRequest.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
});

User.hasMany(FriendList, {
  as: 'friendLists',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
FriendList.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
})

User.hasOne(QuestsList, {
  as: 'questsList',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
QuestsList.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
});

User.hasOne(ResourcesBuildings, {
  as: 'resourcesBuildings',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
ResourcesBuildings.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
});

User.hasOne(UserSession, {
  as: 'tokens',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
UserSession.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  as: 'profiles',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
UserProfile.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
});

User.hasOne(UserResources, {
  as: 'resources',
  foreignKey: 'UserId',
  sourceKey: 'UserId',
  onDelete: 'cascade',
});
UserResources.belongsTo(User, {
  as: 'users',
  foreignKey: 'UserId',
  onDelete: 'cascade',
});

module.exports = {
  User,
  UserSession,
  UserProfile,
  UserResources,
  ResourcesBuildings,
  Quests,
  QuestsList,
  FriendRequest,
  FriendList,
  ChatRoom,
  ChatMessages,
};
