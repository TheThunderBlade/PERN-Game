const ApiError = require('./Error.service');
const models = require('../models');
const Sequelize = require('sequelize');

class QuestsService {
  constructor(user) {
    this.user = user;
  }

  generateThreeDailyQuestsList = async () => {
    try {
      const QuestsData = await models.QuestsList.findOne({ where: { UserId: this.user.UserId } });
      const TWENTY_FOUR_HOURS_MS = 86400000;
      const dateDifferenceMS = new Date(Date.now()) - new Date(QuestsData?.updatedAt);

      if (QuestsData && dateDifferenceMS < TWENTY_FOUR_HOURS_MS) {
        return QuestsData;
      } else {
        const generateQuests = await models.Quests.findAll({ order: [[Sequelize.literal('RANDOM()')]], limit: 3 });

        if (QuestsData) {
          await QuestsData.update({
            FirstQuestId: generateQuests[0].QuestId,
            SecondQuestId: generateQuests[1].QuestId,
            ThirdQuestId: generateQuests[2].QuestId,
          });
        } else {
          await models.QuestsList.create({
            FirstQuestId: generateQuests[0].QuestId,
            SecondQuestId: generateQuests[1].QuestId,
            ThirdQuestId: generateQuests[2].QuestId,
            UserId: this.user.UserId,
          });
        }

        return await models.QuestsList.findOne({ where: { UserId: this.user.UserId } });
      }
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  };

  getThreeDailyQuestsList = async (questsData) => {
    try {
      let questList = [];
      const FirstQuest = await models.Quests.findOne({ where: { QuestId: questsData.FirstQuestId } });
      const SecondQuest = await models.Quests.findOne({ where: { QuestId: questsData.SecondQuestId } });
      const ThirdQuest =  await models.Quests.findOne({ where: { QuestId: questsData.ThirdQuestId } });
      return [ ...questList, FirstQuest, SecondQuest, ThirdQuest ];
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }

  passQuest = async (QuestId, QuestInList) => {
    try {
      const resources = await this.user.getResources();
      const profile = await this.user.getProfiles();

      const Quest = await models.Quests.findOne({ where: { QuestId } });
      const requirements = JSON.parse(Quest.QuestRequirements);
      const requirementsKeys = Object.keys(requirements);
      let options = {};

      for await (const key of requirementsKeys) {
        if (resources[key] < requirements[key]) {
          throw ApiError.badRequest(`You don\`t have enoughth ${key}`);
        } else {
          options[key] = resources[key] - requirements[key];
        }
      }
      options['Money'] = resources.Money + Quest.MoneyForDoing;

      await resources.update(options);
      await profile.update({ UserReputation: profile.UserReputation + Quest.ReputationForDoing });

      const QuestList = await models.QuestsList.findOne({ where: { UserId: this.user.UserId } });
      let questListOption = {};
      questListOption[`${QuestInList}`] = null;
      await QuestList.update(questListOption);
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }

  getQuestList = async () => {
    try {
      return await models.QuestsList.findOne({ where: { UserId: this.user.UserId } });
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }

  removeQuest = async (QuestInList) => {
    try {
      const QuestList = await models.QuestsList.findOne({ where: { UserId: this.user.UserId } });
      let questListOption = {};
      questListOption[`${QuestInList}`] = null;
      await QuestList.update(questListOption);
    } catch (e) {
      throw ApiError.internal(e.message);
    }
  }
}

module.exports = QuestsService;