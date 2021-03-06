const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    mobile: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

var user = mongoose.model('User', userSchema);

module.exports = user;