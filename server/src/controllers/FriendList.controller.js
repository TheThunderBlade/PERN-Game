const FriendListService = require('../services/FriendList.service');

class FriendListController {
  searchFriend = async (req, res, next) => {
    try {
      const { user } = req;
      const { userNamePart } = req.body;
      const FriendListSvc = new FriendListService(user);
      const CandidatesList = await FriendListSvc.searchFriend(userNamePart);
      res.status(200).json(CandidatesList);
    } catch (e) {
      next(e);
    }
  }

  sendFriendRequest = async (req, res, next) => {
    try {
      const { user } = req;
      const { InvitedUserId } = req.body;
      const FriendListSvc = new FriendListService(user);
      await FriendListSvc.sendFriendRequest(InvitedUserId);
      res.status(200).json({ message: 'User received a friend request' });
    } catch (e) {
      next(e);
    }
  }

  getMyRequests = async (req, res, next) => {
    try {
      const { user } = req;
      const FriendListSvc = new FriendListService(user);
      const profiles = await FriendListSvc.getMyRequests();
      res.status(200).json(profiles);
    } catch (e) {
      next(e);
    }
  }

  removeMyRequest = async (req, res, next) => {
    try {
      const { user } = req;
      const { InvitedUserId } = req.body;
      const FriendListSvc = new FriendListService(user);
      await FriendListSvc.removeMyRequest(InvitedUserId);
      res.status(200).json({ message: 'Request was successfully removed' });
    } catch (e) {
      next(e);
    }
  }

  friendRequests = async (req, res, next) => {
    try {
      const { user } = req;
      const FriendListSvc = new FriendListService(user);
      const profiles = await FriendListSvc.friendRequests();
      res.status(200).json(profiles);
    } catch (e) {
      next(e);
    }
  }

  acceptRequest = async (req, res, next) => {
    try {
      const { user } = req;
      const { InvitedUserId } = req.body;
      const FriendListSvc = new FriendListService(user);
      await FriendListSvc.acceptRequest(InvitedUserId);
      res.status(200).json({ message: 'User was successfully added to your friend list' })
    }catch (e) {
      next(e);
    }
  }

  declineRequest = async (req, res, next) => {
    try {
      const { user } = req;
      const { InvitedUserId } = req.body;
      const FriendListSvc = new FriendListService(user);
      await FriendListSvc.declineRequest(InvitedUserId);
      res.status(200).json({ message: 'Request was successfully declined' })
    } catch (e) {
      next(e);
    }
  }

  getMyFriendList = async (req, res, next) => {
    try {
      const { user } = req;
      const FriendListSvc = new FriendListService(user);
      const friendList = await FriendListSvc.getMyFriendList();
      res.status(200).json(friendList);
    } catch (e) {
      console.log('JIJI', e);
      next(e);
    }
  }

  deleteFriend = async (req, res, next) => {
    try {
      const { user } = req;
      const { FriendId } = req.body;
      const FriendListSvc = new FriendListService(user);
      await FriendListSvc.deleteFriend(FriendId);
      res.status(200).json({ message: 'User was removed from your friend list' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FriendListController();
