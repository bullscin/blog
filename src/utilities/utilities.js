/* eslint-disable consistent-return */
// Библиотеки
import { format } from 'date-fns';
import { message } from 'antd';

// Дефолтные функции
const shortenDescription = (text, maxLength) => {
  if (typeof text !== 'string') {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

const formattedDate = (date) =>
  date ? format(new Date(date), 'MMM dd, yyyy') : '';

function validateAndTrimData(data) {
  const trimmedData = {
    ...data,
    title: data.title.trim(),
    description: data.description.trim(),
    body: data.body.trim(),
    tags: data.tags.map((tag) => (typeof tag === 'string' ? tag.trim() : tag)),
  };

  if (
    !/^(?![\s\n]*$).+/.test(trimmedData.title) ||
    !/^(?![\s\n]*$).+/.test(trimmedData.body) ||
    !/^(?![\s\n]*$).+/.test(trimmedData.description)
  ) {
    message.error('Data cannot be empty or contain only spaces');
    return;
  }

  return trimmedData;
}
// Методы валидации
const validationMethods = {
  validateUsername: (value) => {
    if (!value) {
      return 'Имя пользователя обязательно';
    }
    if (value.length < 3 || value.length > 20) {
      return 'Имя пользователя должно быть от 3 до 20 символов';
    }
    return true;
  },
  validateEmail: (value) => {
    if (!value) {
      return 'Электронная почта обязательна';
    }
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      return 'Неверный адрес электронной почты';
    }
    return true;
  },
  validatePassword: (value) => {
    if (!value) {
      return 'Пароль обязателен';
    }
    if (value.length < 6 || value.length > 40) {
      return 'Пароль должен быть от 6 до 40 символов';
    }
    return true;
  },
  validateRepeatPassword: (value, getValues) => {
    const password = getValues('password');
    if (!value) {
      return 'Повтор пароля обязателен';
    }
    if (value !== password) {
      return 'Пароли не совпадают';
    }
    return true;
  },
  validateAvatar: (value) => {
    if (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
      return 'Некорректный URL изображения';
    }
    return true;
  },

  validateCheckbox: (value) => {
    if (value === false) {
      return 'Click me!';
    }
    return true;
  }, // Проверяет, что значение чекбокса равно true (отмечен)
  validateTitle: (value) => {
    if (!value) {
      return 'Заголовок обязателен';
    }
    return true;
  },
  validateDescription: (value) => {
    if (!value) {
      return 'Краткое описание обязательно';
    }
    return true;
  },
  validateBody: (value) => {
    if (!value) {
      return 'Текст обязателен';
    }
    return true;
  },
};

export {
  shortenDescription,
  formattedDate,
  validateAndTrimData,
  validationMethods,
};
