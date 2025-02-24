import { TApiResponse } from './types';
export const checkStatus = (res: TApiResponse) => {
  if (res.ok) {
    return res.json();
  }
    if (res.status === 401) {
      return Promise.reject(`Ошибка ${res.status}. Введены неверные данные`);
    } else if (res.status === 403) {
      return Promise.reject(`Ошибка ${res.status}. У вас недостаточно прав для просмотра содержимого`);
    } else {
      return Promise.reject(`Ошибка ${res.status}. На сервере произошла ошибка. Попробуйте позже`);
    }

}