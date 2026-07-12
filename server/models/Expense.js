const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['FUEL', 'MAINTENANCE', 'TOLL', 'INSURANCE', 'PAYROLL', 'OTHER'],
      default: 'OTHER',
    },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    expenseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

expenseSchema.index({ expenseDate: -1, status: 1 });
module.exports = mongoose.model('Expense', expenseSchema);
