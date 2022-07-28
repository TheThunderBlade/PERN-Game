const AuthMiddleware = require('../middlewares/Auth.middleware');
const UserProfileController = require('../controllers/UserResources.controller');
const Router = require('express');

const router = Router();

router.post('/mineResources', AuthMiddleware, UserProfileController.mineResources);
router.get('/getMineInfo', AuthMiddleware, UserProfileController.getMineInfo);
router.post('/saveCaveResources', AuthMiddleware, UserProfileController.saveResources);
router.post('/upgradeBuilding', AuthMiddleware, UserProfileController.upgradeBuilding);

module.exports = router;