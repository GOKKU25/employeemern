// models/admindata.js
const mongoose = require('mongoose');

// Define admin schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], required: true },
});

// Model for admins, with collection name 'admins'
module.exports = mongoose.model('Admin', adminSchema, 'admins');
