const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  source: {
    type: String,
    default: 'newsletter'
  }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
