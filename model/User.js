const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: false,
        default: 1
        // Role - 1 For student and 2 For Tutor.
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);
