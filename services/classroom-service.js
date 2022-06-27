const Classroom = require("../model/Classroom");

class ClassroomService{
    createClassroom = async(title, description, teachers, students, owner) => {
        return await Classroom.create({ title, description, teachers, students, owner})
    }
    findClassRoomById = async(classroomId) => {
        return await Classroom.findById({_id: classroomId});
    }
    addStudentsToClassroom = async(classroomId, students) => {
        return await Classroom.findByIdAndUpdate({ _id: classroomId}, { students },  { new: true})
    }
    deleteClassroom = async(classroomId) => {
        await Classroom.findByIdAndDelete({ _id: classroomId});
    }
}

module.exports = new ClassroomService();