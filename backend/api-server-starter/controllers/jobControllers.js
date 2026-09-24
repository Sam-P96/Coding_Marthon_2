const Job = require('../models/jobModel');
const mongoose = require('mongoose');
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve jobs', error: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    // const user_id = req.user._id;
    const newJob = await Job.create({ ...req.body });
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating Job:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// GET /jobs/:id
const getJobById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  // question about ID:
  try {
    const job = await Job.findById({ _id: id });
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed ', error: error.message });
  }
};

// PUT /jobs/:id
const updateJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid Job Id' });
  }

  try {
    const updateJob = await Job.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { returnDocument: 'after' },
    );
    if (updateJob) {
      res.status(200).json(updateJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'failed to update' });
  }
};

// DELETE /jobs/:id
const deleteJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'invalid Job id' });
  }

  try {
    const deleteJob = await Job.findOneAndDelete({ _id: id });
    if (deleteJob) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Job' });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
