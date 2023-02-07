const express = require("express");
const { login, signin } = require("../controllers/userController");

const router = express.Router();

router.route("/login").get(login).post(login);

router.route("/signin").post(signin);

module.exports = {
  userRouter: router
};
