import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  et_customer_id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  age: {
    type: Number,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  ageRange: {
    type: String,
  },
  weightRange: {
    type: String,
  },
  video: {
    type: Number,
    default: 0,
  },
  burnedCalories: {
    type: Map,
    of: Number,
    default: () => new Map([['Day 1', 0]]),
  },
  profile_picture: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Prevent overwrite on hot reload
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
