const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentType: { type: String, required: true },
  rawText: { type: String, required: true },
  fields: [{
    label: String,
    value: String,
    confidence: Number,
  }],
  imageUrl: { type: String, required: true },
  confidence: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Scan', scanSchema);
