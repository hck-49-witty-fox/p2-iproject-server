const router = require("express").Router();
const Controller = require("../controllers/controller");
const errorHandlers = require("../middlewares/errorHandlers");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/calculate/:username", Controller.loveCalculate);
router.get("/user", Controller.getAllUser);

router.post("/match/:userId", Controller.postMatch);
router.get("/match/:userId");
// router.patch("/match/:id");

router.use(errorHandlers);

module.exports = router;
