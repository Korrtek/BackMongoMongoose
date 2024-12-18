// bookmarkController.js
import UserModel from '../model/user.js';

export const addBookmark = async (req, res) => {
  try {
    const { mangaId } = req.body; // Предполагается, что ID манги передается в теле запроса
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Проверяем, есть ли уже закладка
    if (user.bookmarks.includes(mangaId)) {
      return res.status(400).json({ message: 'Манга уже в закладках' });
    }

    user.bookmarks.push(mangaId);
    await user.save();

    res.json({ message: 'Манга добавлена в закладки', bookmarks: user.bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const { mangaId } = req.body; // ID манги передается в параметрах
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.bookmarks = user.bookmarks.filter((id) => id !== null && id.toString() !== mangaId);
    await user.save();

    res.json({ message: 'Манга удалена из закладок', bookmarks: user.bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
};
