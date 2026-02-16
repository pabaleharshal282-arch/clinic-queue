/**
 * Appointment Model - Schema definition for patient appointments
 * Purpose: Defines structure of appointment entity
 * 
 * Flow: Patient selects department → doctor → date → creates appointment
 */

const AppointmentSchema = {
  id: 'String',
  patientName: 'String',
  doctorId: 'String',
  department: 'String',
  date: 'Date',
  timeSlot: 'String',
  status: 'String', // Pending, Confirmed, Completed, Cancelled
};

module.exports = { AppointmentSchema };
