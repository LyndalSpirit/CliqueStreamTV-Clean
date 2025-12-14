// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

/**
 * ✅ CORS: allow Netlify + local dev
 */
const allowedOrigins = [
  "https://cliquestreamtv.netlify.app",
  "http://localhost:9003",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow tools like curl/postman with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Preflight
app.options("*", cors());

/**
 * ✅ Body parsing MUST come before routes
 */
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

/**
 * ✅ Debug: log what arrives for auth routes (temporary)
 */
app.use((req, res, next) => {
  if (req.path.startsWith("/auth")) {
    console.log("---- AUTH REQUEST ----");
    console.log("METHOD:", req.method);
    console.log("PATH  :", req.path);
    console.log("ORIGIN:", req.headers.origin);
    console.log("CT    :", req.headers["content-type"]);
    console.log("BODY  :", req.body);
    console.log("----------------------");
  }
  next();
});

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Welcome to CLIQUE TV API");
});

// ✅ Routes
app.use("/auth", authRoutes);

/**
 * ✅ JSON error handler (so frontend gets readable errors)
 */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(400).json({
    error: "Bad request",
    message: err?.message || "Request body could not be read properly.",
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`CLIQUE backend running on port ${PORT}`);
});
