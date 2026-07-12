const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['INSPECTION', 'REPAIR', 'SERVICE', 'TIRE_CHANGE', 'EMERGENCY'],
      default: 'SERVICE',
    },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'],
      default: 'PENDING',
    },
    scheduledDate: { type: Date },
    completedDate: { type: Date },
    cost: { type: Number, default: 0 },
  },
  { timestamps: true }
);

maintenanceSchema.index({ vehicle: 1, status: 1 });
module.exports = mongoose.model('Maintenance', maintenanceSchema);
