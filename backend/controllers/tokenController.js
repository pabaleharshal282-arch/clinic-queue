/**
 * Token Controller - ClinicQ queue operations (backend)
 * Purpose: Create tokens with priority, call next, mark completed, stats
 * Priority: emergency tokens appear above normal in queue
 */

const tokenStore = require('../store/tokenStore');

const createToken = (req, res) => {
  try {
    const { patientName, age, gender, problem, priority } = req.body;
    if (!patientName || !problem) {
      return res.status(400).json({
        success: false,
        message: 'Missing required: patientName, problem (department)',
      });
    }
    const token = tokenStore.create({
      patientName,
      age: parseInt(age, 10) || 0,
      gender: gender || '',
      problem,
      priority: priority === 'emergency' ? 'emergency' : 'normal',
    });
    res.status(201).json({ success: true, data: token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getTokens = (req, res) => {
  try {
    const stats = tokenStore.getStats();
    res.json({ success: true, data: stats.tokens, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getStats = (req, res) => {
  try {
    const stats = tokenStore.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const callNext = (req, res) => {
  try {
    const result = tokenStore.callNext();
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const markCompleted = (req, res) => {
  try {
    const result = tokenStore.markCompleted();
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const clearQueue = (req, res) => {
  try {
    tokenStore.clear();
    res.json({ success: true, data: [], message: 'Queue cleared' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeToken = (req, res) => {
  try {
    const removed = tokenStore.removeById(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Token not found' });
    }
    res.json({ success: true, data: removed, message: 'Patient removed from queue' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createToken,
  getTokens,
  getStats,
  callNext,
  markCompleted,
  clearQueue,
  removeToken,
};
