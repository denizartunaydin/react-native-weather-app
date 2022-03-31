import {tap} from 'rxjs';
import {RestClient} from '../../../api/api.restclient';
import {WeatherGetResult} from '../../../api/dtos/weahterGetResult';
import {Helper} from '../../../core/helper';
import {getWeather} from './weather.action';

const get_ = (payload: any) => {
  return (dispatch: any) => {
    const params = Helper.objToQueryString(payload);

    return RestClient.get(
      'http://api.weatherapi.com/v1/forecast.json?key=9f1705fbcd4347b5ac5104628211707&q=bursa&days=7&lang=tr',
    )
      .pipe(
        tap((res: any) => {
          return dispatch(getWeather(res));
        }),
      )
      .toPromise();
  };
};

export const WeatherService = {
  get: get_,
};
