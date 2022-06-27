const { createAccount, login } = require('../controllers/auth-controller');

const router = require('express').Router();

router.post('/registerUser', createAccount);
router.post('/login', login);

module.exports = router;