const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    text: {
        type: String,
        required: function () {
            return this.messageType === 'text';
        }
    },
    messageType: {
        type: String,
        enum: ['text','image','audio'],
        default: 'text'
    }
},
{timestamps: true}
)

const messageModel = mongoose.model('messages', messageSchema)
module.exports = messageModel
