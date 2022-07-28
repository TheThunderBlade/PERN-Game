const QuestsService = require('../services/Quests.service');

class QuestsController {
  getThreeDailyQuestsList = async (req, res, next) => {
    try {
      const { user } = req;
      const QuestsSvc = new QuestsService(user);
      const questData = await QuestsSvc.generateThreeDailyQuestsList();
      const questList = await QuestsSvc.getThreeDailyQuestsList(questData);
      res.status(200).json(questList);
    } catch (e) {
      next(e);
    }
  }

  passQuest = async (req, res, next) => {
    try {
      const { user } = req;
      const { QuestId, QuestInList } = req.body;
      const QuestsSvc = new QuestsService(user);
      await QuestsSvc.passQuest(QuestId, QuestInList);
      res.status(200).json({ message: 'Quest was successfully passed' });
    } catch (e) {
      next(e);
    }
  }

  getQuestList = async (req, res, next) => {
    try {
      const { user } = req;
      const QuestsSvc = new QuestsService(user);
      const questList = await QuestsSvc.getQuestList();
      res.status(200).json(questList);
    } catch (e) {
      next(e);
    }
  }

  removeQuest = async (req, res, next) => {
    try {
      const { user } = req;
      const { QuestInList } = req.body;
      const QuestsSvc = new QuestsService(user);
      await QuestsSvc.removeQuest(QuestInList);
      res.status(200).json({ message: 'Quest was successfully removed' })
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new QuestsController();
