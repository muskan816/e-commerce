// backend/routes/auth.js
const express = require("express");
const { register, login, getMe, logout } = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);      // new: get current user
router.post("/logout", logout);         // new: clear cookie

module.exports = router;
