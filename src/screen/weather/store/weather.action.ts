import {WeatherGetResult} from '../../../api/dtos/weahterGetResult';

export const WEATHER_GET = 'WEATHER_GET';
interface WeatherGetActionType {
  type: typeof WEATHER_GET;
  payload: WeatherGetResult;
}

export type WeatherActionTypes = WeatherGetActionType;

export function getWeather(payload: WeatherGetResult): WeatherActionTypes {
  return {
    type: WEATHER_GET,
    payload: payload,
  };
}
