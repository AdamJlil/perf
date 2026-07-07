import "dotenv/config";
import mongoose from "mongoose";
import Video from "../server/models/Video";
import { defaultVideoDataForIndex } from "../server/utils/videoDefaults";

// One-time migration: gives every legacy video a per-video description and
// calorie matrix (previously hardcoded client-side by index), and normalizes
// the order sequence to 0..n-1.

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

const run = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const videos = await Video.find({}).sort({ order: 1, createdAt: 1 });
  console.log(`Found ${videos.length} videos`);

  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    const defaults = defaultVideoDataForIndex(i);
    const set: any = { order: i };
    if (!v.calories) set.calories = defaults.calories;
    if (!v.description) set.description = defaults.description;

    await Video.updateOne({ _id: v._id }, { $set: set });
    console.log(
      `#${i} ${v.title}: order=${i}${set.calories ? " +calories" : ""}${set.description ? " +description" : ""}`
    );
  }

  await mongoose.disconnect();
  console.log("Backfill complete.");
};

run().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
