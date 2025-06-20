const Job = require("../models/Job");
const User = require("../models/User");
const { sendNotification } = require("../utils/mailer");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, user: req.userId });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ msg: "Error creating job", error: err.message });
  }
};

// GET ALL JOBS
exports.getJobs = async (req, res) => {
  try {
    const { status, sort } = req.query;
    const filter = { user: req.userId };
    if (status) filter.status = status;

    const jobs = await Job.find(filter).sort(
      sort === "desc" ? { appliedDate: -1 } : { appliedDate: 1 }
    );
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch jobs", error: err.message });
  }
};

// GET SINGLE JOB BY ID
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.userId });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch job", error: err.message });
  }
};

// UPDATE JOB WITH EMAIL NOTIFICATION
exports.updateJob = async (req, res) => {
  try {
    const jobBeforeUpdate = await Job.findOne({ _id: req.params.id, user: req.userId });
    if (!jobBeforeUpdate) {
      return res.status(404).json({ msg: "Job not found" });
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    // Only send email if status was changed
    if (
      req.body.status &&
      req.body.status !== jobBeforeUpdate.status
    ) {
      const user = await User.findById(req.userId);
      if (user?.email) {
        await sendNotification(
          user.email,
          "Job Status Updated",
          `Your job for ${updatedJob.role} at ${updatedJob.company} is now marked as "${updatedJob.status}".`
        );
      }
    }

    res.json(updatedJob);
  } catch (error) {
    console.error("❌ Error in updateJob:", error);
    res.status(400).json({ msg: "Error updating job", error: error.message });
  }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    await Job.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete job", error: err.message });
  }
};
