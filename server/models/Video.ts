import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: 'Video Content'
  },
  order: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  // Calorie estimation matrix: { [ageRange]: { [weightRange]: { [dumbbellWeight]: "min-max" } } }
  // e.g. { "20-40": { "50-70": { "2.5": "900-1000", "5": "900-1100", "10": "1000-1200" }, ... }, ... }
  calories: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
}, { timestamps: true, minimize: false });

// Prevent overwrite on hot reload
const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
