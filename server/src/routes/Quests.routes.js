const AuthMiddleware = require('../middlewares/Auth.middleware');
const QuestsController = require('../controllers/Quests.controller');
const Router = require('express');

const router = Router();

router.get('/getThreeDailyQuests', AuthMiddleware, QuestsController.getThreeDailyQuestsList);
router.get('/getQuestList', AuthMiddleware, QuestsController.getQuestList);
router.post('/passQuest', AuthMiddleware, QuestsController.passQuest);
router.post('/removeQuest', AuthMiddleware, QuestsController.removeQuest);

module.exports = router;