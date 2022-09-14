const router = require("express").Router();
const Controller = require("../controllers/controller");
const errorHandlers = require("../middlewares/errorHandlers");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.writeUser);
router.post("/login");

router.use(authentication);

router.post("/profile");
router.get("/profile");
router.get("/profile/:userId");
router.put("/profile/:userId");

router.post("/hobbies");
router.get("/hobbies");

router.post("/match/:userId");
router.get("/match/:userId");
router.patch("/match/:id");

router.use(errorHandlers);

module.exports = router;
