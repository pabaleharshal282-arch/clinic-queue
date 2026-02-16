/**
 * Appointment Controller - Handles appointment booking and history search
 * Purpose: Persist appointments to store; search by patient name or phone
 */

const appointmentStore = require('../store/appointmentStore');

/**
 * POST /api/appointments - Create appointment (persisted to store)
 */
const createAppointment = (req, res) => {
  try {
    const { patientName, phone, doctorId, doctorName, department, date, timeSlot } = req.body;

    if (!patientName || !department || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: patientName, department, date, timeSlot',
      });
    }

    const appointment = appointmentStore.create({
      patientName: patientName.trim(),
      phone: phone || '',
      department,
      doctorId: doctorId || null,
      doctorName: doctorName || null,
      date,
      timeSlot,
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Appointment submitted successfully',
      data: appointment,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/appointments/search?q= - Search by patient name or phone
 */
const searchAppointments = (req, res) => {
  try {
    const q = req.query.q || '';
    const results = appointmentStore.search(q);
    res.json({ success: true, data: results, count: results.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/appointments - Get all appointments
 */
const getAppointments = (req, res) => {
  try {
    const data = appointmentStore.getAll();
    res.json({ success: true, data, count: data.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createAppointment, searchAppointments, getAppointments };
