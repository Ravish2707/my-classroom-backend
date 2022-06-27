const classroomService = require("../services/classroom-service");
const userService = require("../services/user-service");

class ClassroomController {
    createClassroom = async(req, res) => {
        try {
            const { id } = req.user;
            if(!id){
                return res.status(403).json({ message: "You are not allowed to create classroom"});
            }

            const user = await userService.findUserById(id);
            if(!user) {
                return res.status(404).json({ message: "User not found"})
            }

            if(user.role !== 2){
                return res.status(403).json({ message: "You are not allowed to create classroom"});
            }

            const { title, description } = req.body;

            if(!title || !description) {
                return res.status(400).json({ message: "All Fields are required "});
            }

            let teachers = [];
            teachers.push(id);
            const classroom = await classroomService.createClassroom(title, description, teachers, [], id);
            return res.status(200).json({ message: "Classroom successfully created", classroom})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error"})
        }
    }
    addStudent = async(req, res) => {
        try {
            const { id } = req.user;

            if(!id) {
                return res.status(403).json({ message: "You are not allowed to add student into the classroom"})
            }

            const user = await userService.findUserById(id);
            if(!user) {
                return res.status(404).json({ message: "User not found"});
            }

            if(user.role !== 2){
                return res.status(403).json({ message: "You are not allowed to add student into the classroom"})
            }

            const { classroomId, students } = req.body;
            let classroom = await classroomService.findClassRoomById(classroomId);

            if(!classroom){
                return res.status(404).json({ message: "Classroom not found"});
            }

            classroom = await classroomService.addStudentsToClassroom(classroomId, students);

            res.status(200).json({ message: "Student added to classroom", classroom});
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal Server Error"});
        }
    }
    deleteClassroom = async(req, res) => {
        try {
            const { id } = req.user;
            if(!id){
                return res.status(403).json({ message: "You are not allowed to delete student from the classroom"})
            }

            const user = await userService.findUserById(id);
            if(!user){
                return res.status(404).json({ message: "User not found"});
            }

            if(user.role !== 2){
                return res.status(403).json({ message: "You are not allowed to delete classroom"});
            }

            const { classroomId } = req.body;

            let classroom = await classroomService.findClassRoomById(classroomId);
            if(!classroom) {
                return res.status(404).json({ message: "Classroom not found"});
            }

            classroom = await classroomService.deleteClassroom(classroomId);
            res.status(200).json({ message: "Classroom deleted successfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error"});
        }
    }
}

module.exports = new ClassroomController();