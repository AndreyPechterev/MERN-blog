import { body } from "express-validator";

export const registerValidator = [
    body("email", "неверный формат почты").isEmail(),
    body("password", "пароль минимум 5 символов").isLength({ min: 5 }),
    body("fullName", "укажите имя").isLength({ min: 3 }),
    body("avatarUrl", "неверная ссылка на аватарку").optional().isURL(),
];

export const loginValidator = [
    body("email", "неверный формат почты").isEmail(),
    body("password", "пароль минимум 5 символов").isLength({ min: 5 }),
];

export const postCreateValidator = [
    body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
    body("text", "введите текст статьи").isLength({ min: 3 }).isString(),
    body("tags", "неверный формат тэгов").optional().isString(),
    body("imageUrl", "неверная ссылка на изображение").optional().isString(),
];
