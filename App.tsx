import React from 'react';
import {Provider} from 'react-redux';
import WeatherScreen from './src/screen/weather/weather.screen';
import store from './src/store/appStore';

const App = () => {
  return (
    <Provider store={store}>
      <WeatherScreen></WeatherScreen>
    </Provider>
  );
};

export default App;
