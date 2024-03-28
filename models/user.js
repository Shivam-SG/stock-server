const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        trim: true,
        minlength: 3
    },
    photoURL: String,
    role: {
        type: String,
        emun: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true})

const User = mongoose.model('user', userSchema);
module.exports = User;