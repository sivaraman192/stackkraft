const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'React', 'JavaScript', 'Technology', 'Business'],
    default: 'Web Development'
  },
  tags: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: String, // e.g. "5 min read"
    default: "3 min read"
  },
  author: {
    type: String,
    default: 'Sivaraman M'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
