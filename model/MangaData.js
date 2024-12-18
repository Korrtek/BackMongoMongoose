import mongoose from 'mongoose';

const mangaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    pathUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    PG: {
      type: Number,
      required: true,
    },
    yearCreate: {
      type: Number,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
    },
    bookmarkCount: {
      type: Number,
      required: true,
    },
    translateStatus: {
      type: String,
      required: true,
    },
    releaseStatus: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('MangaData', mangaSchema);
