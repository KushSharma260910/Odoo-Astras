const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, min: 2000, max: 2050 },
    type: {
      type: String,
      enum: ['TRUCK', 'VAN', 'BUS', 'CAR', 'HEAVY_EQUIPMENT'],
      default: 'TRUCK',
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE', 'IDLE', 'ON_TRIP'],
      default: 'AVAILABLE',
    },
    capacity: { type: Number, default: 0 },
    mileage: { type: Number, default: 0 },
    fuelType: { type: String, enum: ['DIESEL', 'PETROL', 'ELECTRIC', 'HYBRID'], default: 'DIESEL' },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VehicleDocument' }],
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

vehicleSchema.index({ status: 1, type: 1 });
vehicleSchema.index({ assignedDriver: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
