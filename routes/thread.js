const ThreadController = require('../controllers/threadController');
const router = require('express').Router();

router.get('/:id', ThreadController.getThreadById);

module.exports = router;
