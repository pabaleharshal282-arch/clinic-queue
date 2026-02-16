/**
 * Database configuration - MongoDB connection using Mongoose
 * Purpose: Connects to MongoDB for data persistence
 * Methodology: Optional connection - app works with mock data if DB unavailable
 * 
 * Academic Note: For demo, mock data is used. Set MONGODB_URI for production.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital_mgmt';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('MongoDB connection failed - running with mock data:', error.message);
    // Don't exit - allow app to run with static/mock data
  }
};

module.exports = connectDB;
