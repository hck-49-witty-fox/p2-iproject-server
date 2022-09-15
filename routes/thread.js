const ThreadController = require('../controllers/threadController');
const router = require('express').Router();

router.get('/tech', ThreadController.getTechNews);
router.get('/:id', ThreadController.getThreadById);

module.exports = router;
