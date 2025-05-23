const createError = require('../utils/createError');
const Conversation = require('../models/conversation');

 const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(201).send(savedConversation);
    } catch (err) {
      next(err);
    }
  };
  
 const updateConversation = async (req, res, next) => {
    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            // readBySeller: true,
            // readByBuyer: true,
            ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
          },
        },
        { new: true }
      );
  
      res.status(200).send(updatedConversation);
    } catch (err) {
      next(err);
    }
  };
  
 const getSingleConversation = async (req, res, next) => {
    try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) return next(createError(404, "Not found!"));
      res.status(200).send(conversation);
    } catch (err) {
      next(err);
    }
  };
  
  const getConversations = async (req, res, next) => {
    try {
      const conversations = await Conversation.find(
        req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
      ).sort({ updatedAt: -1 });
      res.status(200).send(conversations);
    } catch (err) {
      next(err);
    }
  };

  module.exports = {createConversation ,updateConversation ,getSingleConversation ,getConversations}