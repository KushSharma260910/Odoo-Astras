const mongoose = require('mongoose');

const vehicleDocumentSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    documentType: {
      type: String,
      enum: ['REGISTRATION', 'INSURANCE', 'PERMIT', 'SERVICE_BOOK', 'OTHER'],
      default: 'OTHER',
    },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['ACTIVE', 'EXPIRED', 'REVIEW'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

vehicleDocumentSchema.index({ vehicle: 1, documentType: 1 });
module.exports = mongoose.model('VehicleDocument', vehicleDocumentSchema);
