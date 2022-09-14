const router = require('express').Router();
const ThreadController = require('../controllers/threadController');
const errorHandler = require('../middlewares/errorHandler');

const user = require('./user');
// const thread = require('./thread');

router.get('/home', ThreadController.getThread);
router.use('/user', user);
// router.use('/thread', thread);

router.use(errorHandler);

module.exports = router;
