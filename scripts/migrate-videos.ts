import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../server/models/Video';

dotenv.config();

const establishmentUserVideos = [
  "https://www.youtube.com/embed/ml6cT4AZdqI",
  "https://www.youtube.com/embed/v7AYKMP6rOE",
  "https://www.youtube.com/embed/2eA2Koq6pTI",
  "https://www.youtube.com/embed/inpok4MKVLM",
  "https://www.youtube.com/embed/Mvo2snYbhtM",
  "https://www.youtube.com/embed/L_xrDAtykMI",
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
    const videoDocs = establishmentUserVideos.map((url, index) => ({
      url,
      title: `Workout Session ${index + 1}`
    }));

    await Video.insertMany(videoDocs);
    console.log('Videos migrated successfully');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
