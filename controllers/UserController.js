import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../model/user.js';
import { validationResult } from 'express-validator';
import checkAuth from '../utils/checkAuth.js';
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password.toString();
    const salt = await bcrypt.genSalt(10); // Generate salt first
    const passwordHash = await bcrypt.hash(password, salt); // Then hash the password

    const doc = new UserModel({
      email: req.body.email,
      fullname: req.body.fullname,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    res.json({
      ...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось зарегаться',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    res.json({
      ...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось зарегаться',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    // Если пользователь не найден, отправляем ответ и выходим из функции
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Если пользователь найден, отправляем его данные
    return res.json(user); // Используем return, чтобы избежать дальнейших вызовов res
  } catch (err) {
    console.error(err); // Лучше использовать console.error для ошибок
    return res.status(500).json({
      message: 'Произошла ошибка на сервере',
    });
  }
};
