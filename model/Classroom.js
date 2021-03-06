const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassroomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teachers: {
        type: Array,
        required: true
    },
    students: {
        type: Array,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
});
module.exports = mongoose.model('Classroom', ClassroomSchema);