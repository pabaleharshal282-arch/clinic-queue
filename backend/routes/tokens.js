/**
 * Tokens Routes - ClinicQ queue API
 * Base path: /api/tokens
 */

const express = require('express');
const router = express.Router();
const {
  createToken,
  getTokens,
  getStats,
  callNext,
  markCompleted,
  clearQueue,
  removeToken,
} = require('../controllers/tokenController');

router.get('/', getTokens);
router.get('/stats', getStats);
router.post('/', createToken);
router.post('/call-next', callNext);
router.post('/mark-completed', markCompleted);
router.delete('/:id', removeToken);
router.delete('/', clearQueue);

module.exports = router;
