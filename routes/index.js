const router = require('express').Router();
const errorHandler = require('../middlewares/errorHandler');
const user = require('./user');
// const thread = require('./thread');

router.use('/user', user);
// router.use('/thread', thread);

router.use(errorHandler);

module.exports = router;
