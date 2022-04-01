import {catchError, map, of, tap} from 'rxjs';
import {ajax} from 'rxjs/ajax';

const get = (apiUrl: string) => {
  return ajax({
    url: `${apiUrl}`,
    crossDomain: true,
    withCredentials: true,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
    timeout: 0,
    createXHR: function () {
      return new XMLHttpRequest();
    },
  }).pipe(
    tap(res => res),
    map(res => res.response),
    catchError(error => handleError(error)),
  );
};

const handleError = (error: any) => {
  console.log(error.message);
  return of(null);
};

export const RestClient = {
  get: get,
};
