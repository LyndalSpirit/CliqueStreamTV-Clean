// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

// Demo in-memory store (temporary). Swap to DB later.
const users = new Map(); // email -> { email, passwordHash, displayName, createdAt }

function isEmail(v) {
  return typeof v === "string" && v.includes("@") && v.includes(".");
}
function isPassword(v) {
  return typeof v === "string" && v.length >= 6;
}

router.post("/register", async (req, res) => {
  try {
    const { email, password, displayName } = req.body || {};

    if (!req.body) {
      return res.status(400).json({
        error: "Bad request",
        message: "Missing JSON body. Ensure Content-Type: application/json",
      });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!isPassword(password)) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const key = email.toLowerCase().trim();
    if (users.has(key)) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      email: key,
      displayName: (displayName || key.split("@")[0]).toString(),
      createdAt: new Date().toISOString(),
    };

    users.set(key, { ...user, passwordHash });

    const token = jwt.sign(
      { email: user.email, displayName: user.displayName },
      process.env.JWT_SECRET || "dev_secret_change_me",
      { expiresIn: "7d" }
    );

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ error: "Register failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!req.body) {
      return res.status(400).json({
        error: "Bad request",
        message: "Missing JSON body. Ensure Content-Type: application/json",
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

    if (!found) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, found.passwordHash);
    if (!ok) {
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
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
