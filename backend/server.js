/**
 * Hospital Management System - Backend Entry Point
 * Purpose: REST API server for Hospital Management & ClinicQ
 * Methodology: Express + MVC (routes → controllers → models)
 * 
 * Project Structure:
 *   routes/     - API endpoint definitions
 *   controllers/ - Business logic
 *   models/      - Data schema definitions
 *   data/        - Mock/static data for demo
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (optional - works with mock data if unavailable)
connectDB();

// ========== API Routes ==========
const doctorRoutes = require('./routes/doctors');
const departmentRoutes = require('./routes/departments');
const appointmentRoutes = require('./routes/appointments');
const hospitalRoutes = require('./routes/hospital');
const tokenRoutes = require('./routes/tokens');
const adminRoutes = require('./routes/admin');

app.use('/api/doctors', doctorRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hospital Management System API - Backend is running',
    version: '1.0',
    endpoints: {
      doctors: '/api/doctors',
      departments: '/api/departments',
      appointments: '/api/appointments',
      hospital: '/api/hospital/stats',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Hospital Management API running on http://localhost:${PORT}`);
});
