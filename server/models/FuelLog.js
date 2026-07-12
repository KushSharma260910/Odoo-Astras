const mongoose = require('mongoose');

const fuelLogSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    fuelType: {
      type: String,
      enum: ['DIESEL', 'PETROL', 'ELECTRIC', 'HYBRID'],
      default: 'DIESEL',
    },
    quantity: { type: Number, required: true, min: 0 },
    cost: { type: Number, required: true, min: 0 },
    mileage: { type: Number, default: 0 },
    loggedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

fuelLogSchema.index({ vehicle: 1, loggedAt: -1 });
module.exports = mongoose.model('FuelLog', fuelLogSchema);
