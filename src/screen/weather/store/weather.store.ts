import {Current} from '../../../api/dtos/current';
import {ForecastDay} from '../../../api/dtos/forecastDay';
import {Location} from '../../../api/dtos/location';
import {WeatherActionTypes, WEATHER_GET} from './weather.action';

export interface WeatherStateModel {
  location: Location | null;
  current: Current | null;
  forecast: ForecastDay | null;
}

const initialState: WeatherStateModel = {
  location: null,
  current: null,
  forecast: null,
};

export function weatherReducer(
  state = initialState,
  action: WeatherActionTypes,
): WeatherStateModel {
  switch (action.type) {
    case WEATHER_GET:
      return {
        ...state,
        location: action.payload.location,
        current: action.payload.current,
        forecast: action.payload.forecast,
      };

    default:
      return state;
  }
}
