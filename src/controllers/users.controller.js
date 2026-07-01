const messageModel = require("../models/message.model");
const mongoose = require('mongoose')

const getAllUsers = async (req, res) => {
    try {
    const { currentUserId } = req.params;
    
    // 1. get all users without the current user 
    const userModel =  mongoose.connection.db.collection('user')
      const users = await userModel.find({ _id: { $ne: new  mongoose.Types.ObjectId(currentUserId) } }).toArray()

    // 2. get the last message time for any user send or receive message from the current user
    const usersWithLastMessageTime = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await messageModel.findOne({
          $or: [
            { sender: currentUserId, receiver: user._id },
            { sender: user._id, receiver: currentUserId }
          ]
        })
        .sort({ createdAt: -1 }) // get the latest message 
        .select('createdAt'); 

        return {
          ...user,
          // if have a not message then set a initial data 
          lastMessageTime: lastMessage ? lastMessage.createdAt : new Date(0) 
        };
      })
    );

    // 3. Sort based on the last message time (newest time on top)
    usersWithLastMessageTime.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

    res.status(200).json(usersWithLastMessageTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    getAllUsers,
}
