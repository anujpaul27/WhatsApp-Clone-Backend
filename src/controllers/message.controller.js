const messageModel = require("../models/message.model");

const saveMessage = async (messageData) => 
{
    try 
    {
        const {sender, receiver, text, messageType} = messageData;
        console.log(messageData);

        // create a new message
        const newMessage = new messageModel({
            sender,
            receiver,
            text,
            messageType,
        })
        const savedMessage = await newMessage.save()
        return savedMessage
    }
    catch (error)
    {
        console.error('Error saving message to DB ❌:', error.message)
    }
}

const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        // এমন সব মেসেজ খোঁজা যেখানে (A পাঠিয়েছে B-কে) অথবা (B পাঠিয়েছে A-কে)
        const messages = await messageModel.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ createdAt: 1 }); // ১ দিলে পুরানো মেসেজ আগে এবং নতুন মেসেজ নিচে থাকবে (Chrono order)

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages ❌:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    saveMessage,
    getMessages,
}
