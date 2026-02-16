/**
 * Appointments Routes - REST API for appointment booking
 * Base path: /api/appointments
 */

const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, searchAppointments } = require('../controllers/appointmentController');

router.get('/', getAppointments);
router.get('/search', searchAppointments);
router.post('/', createAppointment);

module.exports = router;
