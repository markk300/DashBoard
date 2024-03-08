const express = require("express");
const { registerUser, loginUser, logout, getUser, loginStatus } = require("../controllers/userControllers");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/loginStatus", loginStatus);

module.exports = router;
