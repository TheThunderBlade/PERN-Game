const Router = require('express');
const AuthRoutes = require('./Auth.routes');
const UserRoutes = require('./User.routes');
const UserResourcesRoutes = require('./UserResources.routes');
const MineRoutes = require('./Mining.routes');
const QuestsRoutes = require('./Quests.routes');
const FriendListRoutes = require('./FriendList.routes');
const ChatRoutes = require('./Chat.routes');

const router = Router();

router.use(AuthRoutes);
router.use(UserRoutes);
router.use(UserResourcesRoutes);
router.use(MineRoutes);
router.use(QuestsRoutes);
router.use(FriendListRoutes);
router.use(ChatRoutes);

module.exports = router;