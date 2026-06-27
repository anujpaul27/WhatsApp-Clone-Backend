const messageModel = require("../models/message.model");

const saveMessage = async (messageData) => 
{
    try 
    {
        const {sender, receiver, text, messageType} = messageData;

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

module.exports = saveMessage
