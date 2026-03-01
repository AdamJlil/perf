import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../server/models/Video';

dotenv.config();

const googleDriveVideos = [
  "https://drive.google.com/file/d/11NjjPurB_gLc3UT8-LfZrKSB1fRoTIX5/preview",
  "https://drive.google.com/file/d/1UCAAX_r63VCxNebkRsYuxpKMRorQYJeJ/preview",
  "https://drive.google.com/file/d/1dfCu7cOM1sBE-2NQ4xVj0FxJotDuzPMb/preview",
  "https://drive.google.com/file/d/1CqRQAsAmaWgatuWbGj8WmDJLrtE_2T4b/preview",
  "https://drive.google.com/file/d/1pglk2Hqqte3dS4UBBMvRN7TGTFN5pxrT/preview",
  "https://drive.google.com/file/d/1hMOUFCT0LNEAlpNGe67HIzs9V4VtTfPo/preview",
  "https://drive.google.com/file/d/1vazHJw1QsvBaSpECp7r6KWFsuf1HJpSb/preview",
  "https://drive.google.com/file/d/1krW1NIgWQ9Dl2jzzTH1olEQ5FQqxQNtM/preview",
  "https://drive.google.com/file/d/1q2B10HvCWUgKv1tlSjqnIKYBsor_5dH-/preview",
];

async function migrate() {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) throw new Error('MONGODB_URI is not defined');

    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB');

    // Clear existing videos
    await Video.deleteMany({});
    console.log('Cleared existing videos');

    // Add new videos
    const videoDocs = googleDriveVideos.map((url, index) => ({
      url,
      title: `Workout Session ${index + 1}`,
      order: index
    }));

    await Video.insertMany(videoDocs);
    console.log('Google Drive Videos migrated successfully');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
