const { register } = require("../controllers/userController");
const { logIn } = require("../controllers/userController");
const { setAvatar } = require("../controllers/userController");
const { allUsers } = require("../controllers/userController");

const router = require("express").Router();
router.post("/register", register);
router.post("/logIn", logIn);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", allUsers);

module.exports = router;