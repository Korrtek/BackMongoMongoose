import Comment from '../model/Comment.js';

export const getAll = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user').exec();

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка получения комментария',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new Comment({
      text: req.body.text,
      user: req.userId,
      mangaId: req.body.mangaId,
    });

    const comment = await doc.save();
    return res.status(203).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка создания комментария',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await Comment.findOneAndDelete({ _id: postId }); // Используем await

    if (!doc) {
      return res.status(404).json({
        message: 'Комментарий не найден',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка удаления комментария',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await Comment.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        user: req.userId,
      },

      res.json({
        success: true,
      }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка удаления комментария',
    });
  }
};

// тест
export const getAllByManga = async (req, res) => {
  try {
    const comments = await CommentModel.find({ mangaId: req.params.mangaId }).populate('userId');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get comments' });
  }
};
