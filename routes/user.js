const UserController = require('../controllers/userController');

const router = require('express').Router();

router.post('/login', UserController.loginHandler);

module.exports = router;
