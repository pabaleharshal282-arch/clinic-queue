/**
 * Department Controller - Handles department-related API requests
 * Purpose: Business logic for hospital departments
 */

const { departments } = require('../data/mockData');

/**
 * GET /api/departments - Fetch all departments
 */
const getAllDepartments = (req, res) => {
  try {
    res.json({ success: true, data: departments, count: departments.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/departments/:id - Fetch single department
 */
const getDepartmentById = (req, res) => {
  try {
    const dept = departments.find(d => d.id === req.params.id);
    if (!dept) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.json({ success: true, data: dept });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllDepartments, getDepartmentById };
