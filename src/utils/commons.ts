export const api = 'https://norma.nomoreparties.space/api'

export const fetchStatus = (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`err 01 :: ${res.status}`);
  }