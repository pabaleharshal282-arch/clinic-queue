/**
 * Hospital Routes - General hospital info and stats
 * Base path: /api/hospital
 */

const express = require('express');
const router = express.Router();
const { getStats, getServices } = require('../controllers/hospitalController');

router.get('/stats', getStats);
router.get('/services', getServices);

module.exports = router;
