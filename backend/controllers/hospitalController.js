/**
 * Hospital Controller - Handles general hospital info and stats
 * Purpose: Home page statistics, about info
 */

const { hospitalStats, departments } = require('../data/mockData');

/**
 * GET /api/hospital/stats - Get hospital statistics for home page
 */
const getStats = (req, res) => {
  try {
    res.json({ success: true, data: hospitalStats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/hospital/services - Get featured services (departments)
 */
const getServices = (req, res) => {
  try {
    const featured = departments.slice(0, 6);
    res.json({ success: true, data: featured });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getStats, getServices };
