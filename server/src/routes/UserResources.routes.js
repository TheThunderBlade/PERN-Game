const Router = require('express');
const UserResourcesController = require('../controllers/UserResources.controller');
const AuthMiddleware = require('../middlewares/Auth.middleware');

const router = Router();

router.get('/toNextDay', AuthMiddleware, UserResourcesController.toNextDay);

module.exports = router;