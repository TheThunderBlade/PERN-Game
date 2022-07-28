const models = require('../models');
const UserSvc = require('../services/User.service');

class UserController {
  getProfile = async (req, res, next) => {
    try {
      const { user } = req;
      const userSvc = new UserSvc(user);
      const { profile, requests } = await userSvc.getProfile();
      const userResources = await user.getResources();
      const resources = {
        Wood: userResources.Wood,
        WoodBeam: userResources.WoodBeam,
        Stone: userResources.Stone,
        Iron: userResources.Iron,
        Gold: userResources.Gold,
        Diamond: userResources.Diamond,
        Money: userResources.Money,
      };
      res.status(200).json({ User: user, UserProfile: profile, UserResources: resources, RequestsAmount: requests.length });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  getResources = async (req, res, next) => {
    try {
      const { user } = req;
      const userResources = await user.getResources();
      const resources = {
        Wood: userResources.Wood,
        Board: userResources.Board,
        Stone: userResources.Stone,
        Iron: userResources.Iron,
        Gold: userResources.Gold,
        Diamond: userResources.Diamond,
      };
      res.status(200).json(resources);
    } catch (e) {
      next(e);
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      const { user } = req;
      const userSvc = new UserSvc(user);
      await userSvc.updateProfile(req.body);
      res.status(200).json({ message: 'User profile was successfully updated' });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { user } = req;
      await models.User.destroy({ where: { UserId: user.UserId } });
      res.status(200).json({ message: 'User was successfully deleted' });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

module.exports = new UserController();