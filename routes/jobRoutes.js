const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} = require("../controllers/jobController");
console.log("🚀 Loaded functions:", { createJob, getJobs, getJob, updateJob, deleteJob });

router.post("/", auth, createJob);
router.get("/", auth, getJobs);
router.get("/:id", auth, getJob);
router.put("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

module.exports = router;
