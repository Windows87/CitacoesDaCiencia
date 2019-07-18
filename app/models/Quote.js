const mongoose = require('../database');

const Quote = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  keywords: { type: [String], required: true },
  language: { type: String, required: true },
  category: { type: String, default: 'general' }
});

module.exports = mongoose.model('Quote', Quote);
