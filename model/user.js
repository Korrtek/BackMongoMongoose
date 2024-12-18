import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String, // Поле для хранения URL изображения
      default: '', // Можно задать значение по умолчанию, если изображение не загружено
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    bookmarks: [{ type: String, ref: 'Manga' }],
    avatarUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('user', UserSchema);
