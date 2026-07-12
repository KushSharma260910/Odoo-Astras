const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    tripNumber: { type: String, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    cargoWeight: { type: Number, default: 0 },
    plannedDistance: { type: Number, default: 0 },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    dispatcher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['SCHEDULED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DELAYED'],
      default: 'SCHEDULED',
    },
    startTime: { type: Date },
    endTime: { type: Date },
    distanceMiles: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    expenses: { type: Number, default: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

tripSchema.index({ status: 1, startTime: 1 });
tripSchema.index({ vehicle: 1, driver: 1 });

module.exports = mongoose.model('Trip', tripSchema);
