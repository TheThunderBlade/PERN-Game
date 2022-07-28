const ApiError = require('./Error.service');
const MineResourcesSvc = require('./MineResources.service');
const { BuildingsLevelName, CaveUpgrade, SawmillUpgrade } = require('../helpers/UpgradeBuildings.helper');
const DayHelper = require('../helpers/Day.helper');

class UserResourcesService {
  constructor(user) {
    this.user = user;
  }

  toNextDay = async () => {
    try {
      const profile = await this.user.getProfiles();

      if (profile.CurrentDay === 7) {
        await profile.update({
          CurrentDay: 1,
          WeeksLived: ++profile.WeeksLived,
          Energy: 100,
        });
      } else {
        await profile.update({
          CurrentDay: ++profile.CurrentDay,
          Energy: 100,
        });
      }

      return DayHelper.get(profile.CurrentDay);
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  mineResources = async (resourceFlag) => {
    try {
      const buildingsInfo = await this.user.getResourcesBuildings();
      const profile = await this.user.getProfiles();
      if (profile.Energy <= 0) {
        throw ApiError.badRequest('You don`t have enough energy');
      }
      await profile.update({
        Energy: profile.Energy - 20,
      });
      return MineResourcesSvc.generateResources(resourceFlag, buildingsInfo);
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  getMineInfo = async () => {
    try {
      return this.user.getResourcesBuildings()
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }

  saveResources = async ({
    Stone,
    Iron,
    Gold,
    Diamond,
    Wood,
    WoodBeam,
  }) => {
    try {
      const resources = await this.user.getResources();
      let updateOptions = {};
      if (Stone > 0) {
        updateOptions = { ...updateOptions, Stone: resources.Stone + Stone };
      }
      if (Iron > 0) {
        updateOptions = { ...updateOptions, Iron: resources.Iron + Iron };
      }
      if (Gold > 0) {
        updateOptions = { ...updateOptions, Gold: resources.Gold + Gold };
      }
      if (Diamond > 0) {
        updateOptions = { ...updateOptions, Diamond: resources.Diamond + Diamond };
      }
      if (Wood > 0) {
        updateOptions = { ...updateOptions, Wood: resources.Wood + Wood };
      }
      if (WoodBeam > 0) {
        updateOptions = { ...updateOptions, WoodBeam: resources.WoodBeam + WoodBeam };
      }
      await resources.update(updateOptions);
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }

  upgradeBuilding = async (buildingFlag) => {
    try {
      const BuildingLevelName = BuildingsLevelName.get(buildingFlag);
      const buildings = await this.user.getResourcesBuildings();

      if (buildings[BuildingLevelName] === 10 && BuildingLevelName === 'Cave') {
        throw ApiError.conflict(`It's max level for ${BuildingLevelName}`);
      }
      if (buildings[BuildingLevelName] === 6 && BuildingLevelName === 'Sawmill') {
        throw ApiError.conflict(`It's max level for ${BuildingLevelName}`);
      }
      const resources = await this.user.getResources();

      const upgradeRequirements = BuildingLevelName === 'CaveLevel'
        ? CaveUpgrade.get(buildings.CaveLevel)
        : SawmillUpgrade.get(buildings.SawmillLevel);
      const requirementsKeys = Object.keys(upgradeRequirements);

      for (const key of requirementsKeys) {
        if (resources[key] < upgradeRequirements[key]) {
          throw ApiError.conflict(`Not enough ${key}`);
        }
      }

      for (const key of requirementsKeys) {
        let option = {};
        option[key] = resources[key] - upgradeRequirements[key];
        await resources.update(option);
      }

      let buildingOption = {};
      buildingOption[BuildingLevelName] = buildings[BuildingLevelName] + 1;
      await buildings.update(buildingOption);
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }
}

module.exports = UserResourcesService;