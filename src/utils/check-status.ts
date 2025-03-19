import { TApiResponse } from './types';
export const checkStatus = (res: TApiResponse) => {
  if (res.ok) {
    return res.json();
  }
    if (res.status === 401) {
      return Promise.reject(`Err ${res.status}. Wrong data`);
    } else if (res.status === 403) {
      return Promise.reject(`Err ${res.status}. Permission err`);
    } else {
      return Promise.reject(`Err ${res.status}. Server err`);
    }

}