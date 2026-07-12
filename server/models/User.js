const mongoose = require('mongoose');
const { comparePassword } = require('../utils/password');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ['ADMIN', 'FLEET_MANAGER', 'DISPATCHER', 'DRIVER', 'MECHANIC', 'SAFETY_OFFICER', 'FINANCIAL_ANALYST'],
      default: 'DISPATCHER',
    },
    phone: { type: String, trim: true },
    assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    address: { type: String, trim: true },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });
userSchema.index({ role: 1, isActive: 1 });

userSchema.pre('save', function (next) {
  if (this.isModified('isActive') || this.isModified('status')) {
    this.status = this.isActive ? 'Active' : 'Inactive';
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return comparePassword(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
