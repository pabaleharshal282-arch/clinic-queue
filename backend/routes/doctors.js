/**
 * Doctors Routes - REST API endpoints for doctors
 * Purpose: Defines API routes for doctor module
 * Base path: /api/doctors
 */

const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, addDoctor, deleteDoctor, toggleOnDuty } = require('../controllers/doctorController');

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/', addDoctor);
router.delete('/:id', deleteDoctor);
router.patch('/:id/toggle-duty', toggleOnDuty);

module.exports = router;
