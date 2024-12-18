import MangaData from '../model/MangaData.js';

export const createManga = async (req, res) => {
  try {
    const doc = new MangaData({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      pathUrl: req.body.pathUrl,
      description: req.body.description,
      type: req.body.type,
      rating: req.body.rating,
      pages: req.body.pages,
      PG: req.body.PG,
      yearCreate: req.body.yearCreate,
      likeCount: req.body.likeCount,
      bookmarkCount: req.body.bookmarkCount,
      translateStatus: req.body.translateStatus,
      releaseStatus: req.body.releaseStatus,
      viewsCount: req.body.viewsCount,
    });

    const mangaData = await doc.save();
    return res.status(203).json(mangaData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка создания манги',
    });
  }
};

export const getAllManga = async (req, res) => {
  try {
    const MangaDatas = await MangaData.find().exec();

    res.json(MangaDatas);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка получения списка манги',
    });
  }
};

export const getMeManga = async (req, res) => {
  try {
    const manga = await MangaData.findOne({ pathUrl: req.params.pathUrl });

    // Если пользователь не найден, отправляем ответ и выходим из функции
    if (!manga) {
      return res.status(404).json({ message: 'Манга не найдена' });
    }

    // Если пользователь найден, отправляем его данные
    return res.json(manga); // Используем return, чтобы избежать дальнейших вызовов res
  } catch (err) {
    console.error(err); // Лучше использовать console.error для ошибок
    return res.status(500).json({
      message: 'Произошла ошибка на сервере',
    });
  }
};
