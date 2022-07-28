const UserSvc = require('../services/Auth.service');

class AuthController {
  registration = async (req, res, next) => {
    try {
      const { Email, Password, UserName } = req.body;
      await UserSvc.registration({ Email, Password, UserName });
      return res.status(200).json({ message: 'User was successfully created' });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  login = async (req, res, next) => {
    try {
      const { UserName, Password } = req.body;
      const userData = await UserSvc.login({ UserName, Password });

      res.cookie('RefreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json({
        Token: userData.AccessToken,
        UserId: userData.user.UserId,
        UserName: userData.user.UserName
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { RefreshToken } = req.cookies;

      const userData = await UserSvc.refresh({ RefreshToken });
      res.cookie('RefreshToken', userData.RefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json({
        Token: userData.AccessToken,
        UserId: userData.user.UserId,
        UserName: userData.user.UserName
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      const { RefreshToken } = req.cookies;

      await UserSvc.logout({ RefreshToken });
      res.clearCookie('RefreshToken');

      return res.status(200).json({ message: 'User was successfully log out' });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new AuthController();