import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
  requested_cancel: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  login_count: {
    type: Number,
    default: 0,
  },
  profile_picture: {
    type: String,
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isMaster: {
    type: Boolean,
    default: false,
  },
  registration_denied: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err: any) {
    throw err;
  }
});

// Prevent overwrite on hot reload
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
