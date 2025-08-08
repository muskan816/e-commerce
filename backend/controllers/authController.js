const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper to create JWT and set as HttpOnly cookie
const createSendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  // Set cookie with token; httpOnly prevents JavaScript access:contentReference[oaicite:5]{index=5}
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,             // set to true in production (with HTTPS)
    sameSite: "lax",           // adjust sameSite if needed (e.g. 'none' with secure)
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/"
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hash });

  // Create token and set as cookie
  createSendToken(user, res);

  // Respond with user info (no token in body)
  res.json({
    user: { id: user._id, name: user.name, email: user.email }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  createSendToken(user, res);

  res.json({
    user: { id: user._id, name: user.name, email: user.email }
  });
};

// New: get current user from token (cookie must be present)
const getMe = async (req, res) => {
  // req.user is set in protect middleware
  res.json({ user: req.user });
};

// New: logout endpoint that clears the cookie
const logout = (req, res) => {
  // Clear the cookie by setting it to empty and expiring it
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });
  res.json({ msg: "Logged out successfully" });
};

module.exports = { register, login, getMe, logout };
