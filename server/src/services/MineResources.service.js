const crypto = require('node:crypto');
const { CaveResources, SawmillResources } = require('../helpers/MineResources.helper');

class MineResourcesService {
  generateResources = (resourceFlag, buildingsInfo) => {
    const resourcesData = resourceFlag === 'Cave' ? CaveResources.get(buildingsInfo.CaveLevel) : SawmillResources.get(buildingsInfo.SawmillLevel);
    const resourcesKeys = Object.keys(resourcesData);
    let resourcesPayload = {};
    for (const key of resourcesKeys) {
      const resourcesValues = resourcesData[key];
      resourcesPayload[key] = crypto.randomInt(resourcesValues[0], resourcesValues[1]);
    }
    return resourcesPayload;
  }
}

module.exports = new MineResourcesService();