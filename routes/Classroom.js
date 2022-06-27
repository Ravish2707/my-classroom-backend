const { createClassroom, addStudent, deleteClassroom } = require('../controllers/classroom-controller');
const auth = require('../middlewares/auth-middleware');

const router = require('express').Router();

router.post('/createClass', [auth], createClassroom);
router.post('/student/add', [auth], addStudent);
router.delete('/classroom/delete', [auth], deleteClassroom);

module.exports = router;
