import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import {Current} from '../../api/dtos/current';
import {ForecastDay} from '../../api/dtos/forecastDay';
import {Location} from '../../api/dtos/location';
import CustomText from '../../components/text.component';
import {DataFormatType, Helper} from '../../core/helper';
import {rsTypo} from '../../theme/typography';
import {colors} from '../../theme/_variables';
import {WeatherService} from './store/weather.service';
import {WeatherStateModel} from './store/weather.store';

const WeatherScreen = (prop: Props) => {
  useEffect(() => {
    prop.get({});
  }, []);

  return (
    <>
      <View flex backgroundColor={colors.bg1Color} padding-20>
        <View row>
          <View flex>
            <CustomText
              title={Helper.dateFormat(
                prop.location?.localtime,
                DataFormatType.dateFormat,
              )}
              textColor={colors.textColor2}
              fontSize={rsTypo.default}
              style={{marginTop: 2}}></CustomText>

            <CustomText
              title={`${prop.location?.name}, ${prop.location?.country}`}
              textColor={colors.textColor2}
              fontSize={rsTypo.h5}
              style={{marginTop: 2}}></CustomText>
          </View>
          <View>
            <Text color={colors.textColor2}>sdf</Text>
          </View>
        </View>

        <View row flex></View>
      </View>
    </>
  );
};

const mapStateToProps = ({weather}: {weather: WeatherStateModel}) => ({
  location: weather.location,
  current: weather.current,
  forecast: weather.forecast,
});

const mapDispatchToProps = (dispatch: any) => ({
  get: (payload: any) => dispatch(WeatherService.get(payload)),
});

type Props = {
  location: Location | null;
  current: Current | null;
  forecast: ForecastDay | null;
  get: (payload: any) => any;
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);
