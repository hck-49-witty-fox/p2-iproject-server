const router = require('express').Router()
const Controller = require('../controllers/controller');


router.post('/register', Controller.handleRegister)
router.post('/regprofile', Controller.handleProfile)
router.post('/login', Controller.login)
router.post('/loginGoogle', Controller.loginGoogle)


router.get('/nearby', Controller.NearbySearch)

module.exports = router