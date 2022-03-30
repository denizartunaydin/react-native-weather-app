import {map, tap} from 'rxjs';
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
  );
};

export const RestClient = {
  get: get,
};
