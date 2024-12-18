import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 20 }).withMessage,
  body('fullname').isLength({ min: 3 }),
  body('avatarUrl').optional().isURL(),
];

export const postCreateValidation = [
  body('text', 'напишите текст коммента').isLength({ min: 1 }).isString(),
];
