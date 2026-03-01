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
  }
}, { timestamps: true });

// Prevent overwrite on hot reload
const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
