// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ CORS Configuration with proper headers
app.use(
  cors({
    origin: [
      "https://job-application-tracker-5mb7jubey.vercel.app", // Production
      "https://job-application-trac-git-060903-pankaj-kumars-projects-dbf7c37a.vercel.app" // Preview
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Health check route
app.get("/api", (req, res) => {
  res.json({ message: "API root working" });
});

// ✅ Main routes
app.get("/", (req, res) => {
  res.send("Job Tracker API is running.");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

// ✅ MongoDB connection and server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
