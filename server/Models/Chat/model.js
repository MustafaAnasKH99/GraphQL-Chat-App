const mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})

var chat = mongoose.model('Chat', chatSchema);

module.exports = chat;