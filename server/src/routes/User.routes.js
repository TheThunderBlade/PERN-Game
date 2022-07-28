const Router = require('express')
const UserController = require('../controllers/User.controller');
const AuthMiddleware = require('../middlewares/Auth.middleware');

const router = Router();

router.get('/getProfile', AuthMiddleware, UserController.getProfile);
router.get('/getResources', AuthMiddleware, UserController.getResources);
router.post('/updateProfile', AuthMiddleware, UserController.updateProfile);
router.post('/deleteUser', AuthMiddleware, UserController.deleteUser);

module.exports = router;