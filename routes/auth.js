const router = require('express').Router();
const { getAll, login, register, forgotPassword } = require('../controllers/auth');


router.route("/").get(getAll);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);

module.exports = router;