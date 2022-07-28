const UserResourcesService = require('../services/UserResources.service');

class UserResourcesController {
  toNextDay = async (req, res, next) => {
    try {
      const { user } = req;
      const resourcesSvc = new UserResourcesService(user);
      const CurrentDay = await resourcesSvc.toNextDay();
      res.status(200).json({ CurrentDay });
    } catch (e) {
      next(e);
    }
  };

  mineResources = async (req, res, next) => {
    try {
      const { user } = req;
      const { resourceFlag } = req.body;
      const resourcesSvc = new UserResourcesService(user);
      const resourcesList = await resourcesSvc.mineResources(resourceFlag);
      res.status(200).json(resourcesList);
    } catch (e) {
      next(e);
    }
  };

  getMineInfo = async (req, res, next) => {
    try {
      const { user } = req;
      const resourcesSvc = new UserResourcesService(user);
      const mineInfo = await resourcesSvc.getMineInfo();
      res.status(200).json(mineInfo);
    } catch (e) {
      next(e);
    }
  };

  saveResources = async (req, res, next) => {
    try {
      const { user } = req;
      const resourcesSvc = new UserResourcesService(user);
      await resourcesSvc.saveResources(req.body);
      res.status(200).json({ message: 'Resources was saved' });
    } catch (e) {
      next(e);
    }
  };

  upgradeBuilding = async (req, res, next) => {
    try {
      const { user } = req;
      const { buildingFlag } = req.body;
      const resourcesSvc = new UserResourcesService(user);
      await resourcesSvc.upgradeBuilding(buildingFlag);
      res.status(200).json({ message: `${buildingFlag} was successfully upgraded` });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new UserResourcesController();