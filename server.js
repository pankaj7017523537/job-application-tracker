// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

<<<<<<< HEAD
// ✅ CORS Configuration with proper headers
app.use(
  cors({
    origin: [
      "https://job-application-tracker-5mb7jubey.vercel.app", // Production Vercel URL
      "https://job-application-trac-git-060903-pankaj-kumars-projects-dbf7c37a.vercel.app" // Preview Vercel URL
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow Bearer tokens
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Optional: Explicitly list methods
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Health check route
=======
// ✅ CORS Configuration — allow both production & preview URLs
app.use(
  cors({
    origin: [
      "https://job-application-tracker-5mb7jubey.vercel.app", // Production
      "https://job-application-trac-git-060903-pankaj-kumars-projects-dbf7c37a.vercel.app" // Preview
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Optional health check
>>>>>>> 0e2a559 (Include backend changes before pull)
app.get("/api", (req, res) => {
  res.json({ message: "API root working" });
});

<<<<<<< HEAD
// ✅ Main routes
=======
// Routes
>>>>>>> 0e2a559 (Include backend changes before pull)
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
