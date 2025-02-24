import { checkStatus } from "./checkStatus";
import { api } from "./commons";
import { getCookie, setCookie } from "./cookie";
import { TRefreshFetch } from "./types";

const refreshToken = () => {
  return fetch(`${api}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
    .then((res) => checkStatus(res))
}

// автопробрасывание рефреш-токена, если на запрос авторизации приходит ошибка 403
export const refreshFetch: TRefreshFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    return await checkStatus(res);
  } catch (err) {
    console.log(err)
    if (err === 'Ошибка 403. У вас недостаточно прав для просмотра содержимого') {
      const refreshData = await refreshToken();
      setCookie('token', refreshData.accessToken.split('Bearer ')[1]);
      options.headers!.authorization = refreshData.accessToken;
      const res = await fetch(url, options)
      return await checkStatus(res);
    } else {
      return Promise.reject(err)
    }
  }
}
