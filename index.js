import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { registerValidation } from './validation.js';
import cors from 'cors';

import UserModel from './model/user.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as Comment from './controllers/CommentController.js';
import * as MangaData from './controllers/MangaDataController.js';
import * as Bookmarks from './controllers/BookmarksController.js';
import { postCreateValidation } from './validation.js';
import path from 'path';
console.log(UserModel);

// 'mongodb+srv://Korrtek:040112qwaszx@cluster0.lnk6n.mongodb.net/blog?'

// коннект к базе через мангус
mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb+srv://Korrtek:040112qwaszx@cluster0.lnk6n.mongodb.net/blog?',
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());
// Роуты региастрации
app.post('/auth/register', UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

// роут для добавления и удаления закладок
app.post('/bookmarks', checkAuth, Bookmarks.addBookmark);
app.delete('/bookmarks', checkAuth, Bookmarks.removeBookmark);

// роуты комментариев
app.get('/comment', Comment.getAll);
// app.get('/comment/:id',Comment.getOne);
app.post('/comment', postCreateValidation, checkAuth, Comment.create);
app.delete('/comment/:id', checkAuth, Comment.remove);
app.patch('/comment/:id', postCreateValidation, checkAuth, Comment.update);
// рост для создания манги
app.get('/Manga', MangaData.getAllManga);
app.post('/Manga', MangaData.createManga);
app.get('/Manga/:pathUrl', MangaData.getMeManga);

// тест комментов
app.get('/Manga/:mangaId/comments', checkAuth, Comment.getAllByManga);

// роут для картинок
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: '/uploads/' + req.file.originalname,
  });
}),
  app.listen(process.env.PORT || 3333, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('Serv ok');
  });

// порт был 3333

// app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
//   res.json({
//   url: ('/uploads/' + req.file.originalname),
