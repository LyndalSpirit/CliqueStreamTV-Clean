// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Temporary in-memory user store (demo only)
const users = new Map();

function isEmail(v) {
  return typeof v === "string" && v.includes("@") && v.includes(".");
}
function isPassword(v) {
  return typeof v === "string" && v.length >= 6;
}

router.post("/register", (req, res) => {
  const { email, password, displayName } = req.body || {};

  if (!req.body) {
    return res.status(400).json({
      error: "Bad request",
      message: "Missing JSON body. Did you send Content-Type: application/json ?",
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!isPassword(password)) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const key = email.toLowerCase().trim();
  if (users.has(key)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = {
    email: key,
    displayName: (displayName || key.split("@")[0]).toString(),
    createdAt: new Date().toISOString(),
  };

  // ⚠️ Demo only — replace with bcrypt later
  users.set(key, { ...user, password });

  const token = jwt.sign(
    { email: user.email, displayName: user.displayName },
    process.env.JWT_SECRET || "dev_secret_change_me",
    { expiresIn: "7d" }
  );

  return res.status(201).json({ token, user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!req.body) {
    return res.status(400).json({
      error: "Bad request",
      message: "Missing JSON body. Did you send Content-Type: application/json ?",
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (typeof password !== "string" || !password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const key = email.toLowerCase().trim();
  const found = users.get(key);

  if (!found || found.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = {
    email: found.email,
    displayName: found.displayName,
    createdAt: found.createdAt,
  };

  const token = jwt.sign(
    { email: user.email, displayName: user.displayName },
    process.env.JWT_SECRET || "dev_secret_change_me",
    { expiresIn: "7d" }
  );

  return res.status(200).json({ token, user });
});

module.exports = router;
