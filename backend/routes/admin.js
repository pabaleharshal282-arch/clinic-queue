/**
 * Admin Routes - Control panel stats
 * Base path: /api/admin
 */

const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/adminController');
const { login } = require('../controllers/authController');

router.get('/stats', getStats);
router.post('/login', login);

module.exports = router;
