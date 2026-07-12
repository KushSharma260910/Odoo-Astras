const mongoose = require('mongoose');

const tripHistorySchema = new mongoose.Schema(
  {
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    status: {
      type: String,
      enum: ['SCHEDULED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DELAYED'],
      required: true,
    },
    note: { type: String, trim: true },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

tripHistorySchema.index({ trip: 1, createdAt: -1 });
module.exports = mongoose.model('TripHistory', tripHistorySchema);
