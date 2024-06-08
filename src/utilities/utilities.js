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

export { shortenDescription, formattedDate };
