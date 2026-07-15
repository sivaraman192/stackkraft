const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  benefits: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  pricing: {
    type: String, // e.g., "Custom Pricing" or "Starting at $499"
    required: true
  },
  iconName: {
    type: String, // matches Lucide icon name, e.g., "Code", "Layers", "Layout"
    default: "Globe"
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
