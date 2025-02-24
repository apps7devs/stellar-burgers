// проверка статуса промиса для экшенов
export const checkStatus = (res) => {
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