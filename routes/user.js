const UserController = require('../controllers/userController');

const router = require('express').Router();

router.post('/login', UserController.loginHandler);
router.post('/register', UserController.registerHandler);

module.exports = router;
