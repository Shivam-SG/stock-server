const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth");
const {signupSchema, loginSchema} = require("../validators/auth");
const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/auth");

router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;