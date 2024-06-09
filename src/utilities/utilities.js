// Библиотеки
import { format } from 'date-fns';
// Дефолтные функции
const shortenDescription = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return `${str.slice(0, num)}...`;
};

const formattedDate = (date) =>
  date ? format(new Date(date), 'MMM dd, yyyy') : '';
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
};

export { shortenDescription, formattedDate, validationMethods };
