import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  name: {
    type: String, // Last name usually
    required: true,
  },
  type: {
    type: String,
    enum: ['ESTABLISHEMENT', 'PARTICULIER'],
    required: true,
    default: 'ESTABLISHEMENT',
  },
  plan: {
    type: String,
    default: 'EXPLORER',
  },
  requested_plan: {
    type: String,
    default: null,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  login_count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Prevent overwrite on hot reload
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
