import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../server/models/User';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'perf912@gmail.com';
    const password = 'amjad@perf@admin';

    // Check if admin exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log(`User ${email} already exists. Updating to Master Admin...`);
      existingAdmin.isAdmin = true;
      existingAdmin.isMaster = true;
      const hashedPassword = await bcrypt.hash(password, 10);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log('Master Admin updated successfully.');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await User.create({
        email,
        password: hashedPassword,
        first_name: 'Admin',
        name: 'PERF',
        type: 'PARTICULIER',
        isAdmin: true,
        isMaster: true,
        paid: true,
      });

      console.log(`Master Admin user created successfully: ${email}`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
