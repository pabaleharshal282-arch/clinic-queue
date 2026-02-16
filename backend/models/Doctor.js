/**
 * Doctor Model - Schema definition for doctors in the hospital
 * Purpose: Defines structure of doctor entity for the Hospital Management System
 * Methodology: Schema-based design for future MongoDB integration
 * 
 * Academic Note: In production, this would use Mongoose schema with MongoDB.
 * Currently using static data for demo/report purposes.
 */

// In-memory schema structure for documentation and report
// Mongoose schema (commented - for when DB is connected):
/*
const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  specialization: { type: String },
  qualification: { type: String },
  experience: { type: Number },
  availableDays: [String],
  contact: { type: String }
});
module.exports = mongoose.model('Doctor', doctorSchema);
*/

// Schema structure for report/documentation
const DoctorSchema = {
  name: 'String',
  department: 'String',
  specialization: 'String',
  qualification: 'String',
  experience: 'Number',
  availableDays: '[String]',
  contact: 'String',
};

module.exports = { DoctorSchema };
