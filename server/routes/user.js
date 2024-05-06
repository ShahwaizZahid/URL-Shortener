const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
  handleUser,
} = require("../controller/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/me", handleUser);

router.post("/logout", handleUserLogout);

module.exports = router;
