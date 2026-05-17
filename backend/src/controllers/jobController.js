const JobRequest = require('../models/JobRequest');

// get all jobs
const getAllJobs = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

// get a single job
const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

// post job
const createJob = async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const job = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
      createdBy: req.user.userId,
    });

    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

// update job
const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Open', 'In Progress', 'Closed'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be Open, In Progress, or Closed',
      });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

// delete job
const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorised to delete this job' });
    }

    await job.deleteOne();

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
};