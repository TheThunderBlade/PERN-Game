const Router = require('express')
const AuthController = require('../controllers/Auth.controller');
const AuthMiddleware = require('../middlewares/Auth.middleware');

const router = Router();

router.post('/signUp', AuthController.registration);
router.post('/signIn', AuthController.login);
router.get('/refresh', AuthMiddleware, AuthController.refresh);
router.get('/logout', AuthController.logout)

module.exports = router;