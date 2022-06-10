import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  ViewStyle,
} from 'react-native';
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
import WeatherDetailItem from './components/weather.detail.item.component';
import {HourDetail} from '../../api/dtos/Forecast/hourDetail';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ForecastDayDetail} from '../../api/dtos/Forecast/forecastDayDetail';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WeatherScreen = (prop: Props) => {
  useEffect(() => {
    prop.get({});
  }, []);

  let iosBar: ViewStyle = {};
  if (Platform.OS === 'ios') {
    iosBar = {paddingTop: 50};
  }

  const renderHourItem = ({item}: {item: HourDetail}) => {
    return (
      <>
        <View
          marginR-20
          center
          backgroundColor={colors.bg4Color}
          padding-10
          br20>
          <CustomText
            title={Helper.dateFormat(item.time, DataFormatType.timeFormat)}
            textColor={colors.textColor3}
            fontSize={rsTypo.default}
            style={{}}></CustomText>

          <View marginT-10>
            <Image
              style={{width: 50, height: 50}}
              source={{
                uri: `https:${item.condition.icon}`,
              }}
            />
          </View>

          <CustomText
            title={'' + item.temp_c}
            textColor={colors.bg2Color}
            fontSize={rsTypo.h4}
            style={{}}></CustomText>
        </View>
      </>
    );
  };

  console.log();

  const renderDayItem = ({item}: {item: ForecastDayDetail}) => {
    return (
      <>
        <View row>
          <View flex left centerV>
            <CustomText
              title={Helper.dateFormat(item.date, DataFormatType.dateFormat)}
              textColor={colors.textColor3}
              fontSize={rsTypo.default}
              style={{}}></CustomText>
          </View>
          <View flex center row>
            <View>
              <Image
                style={{width: 40, height: 40}}
                source={{
                  uri: `https:${item.day.condition.icon}`,
                }}
              />
            </View>

            <View row centerV>
              <MaterialCommunityIcons
                name="water-percent"
                color={colors.textColor2}
                size={30}
              />

              <CustomText
                title={`${item.day.avghumidity}`}
                textColor={colors.textColor3}
                fontSize={rsTypo.h5}
                style={{}}></CustomText>
            </View>
          </View>
          <View flex right centerV>
            <CustomText
              title={`${item.day.maxtemp_c} / ${item.day.mintemp_c}`}
              textColor={colors.textColor3}
              fontSize={rsTypo.default}
              style={{}}></CustomText>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View
        flex
        backgroundColor={colors.bg1Color}
        padding-20
        style={{...iosBar}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View row>
            <View flex>
              <CustomText
                title={Helper.dateFormat(
                  prop.location?.localtime,
                  DataFormatType.dateFormat,
                )}
                textColor={colors.textColor2}
                fontSize={rsTypo.default}
                style={{}}></CustomText>

              <CustomText
                title={`${prop.location?.name}, ${prop.location?.country}`}
                textColor={colors.textColor2}
                fontSize={rsTypo.h4}
                style={{}}></CustomText>
            </View>
            <View centerV>
              <Fontisto name={'search'} color={colors.textColor2} size={20} />
            </View>
          </View>

          <View row marginT-30>
            <View flex center>
              <Image
                style={{width: 100, height: 100}}
                source={{
                  uri: `http:${prop.current?.condition.icon}`,
                }}
              />
            </View>

            <View
              center
              backgroundColor={colors.bg2Color}
              width={2}
              height={'100%'}></View>

            <View flex center>
              <CustomText
                title={`${prop.current?.temp_c}`}
                textColor={colors.textColor2}
                fontSize={rsTypo.h1}
                style={{}}></CustomText>

              <CustomText
                title={`${prop.current?.condition.text}`}
                textColor={colors.textColor2}
                fontSize={rsTypo.default}
                style={{marginTop: 2}}></CustomText>
            </View>
          </View>

          <View row marginT-30>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={prop.forecast?.forecastday[0].hour.filter(c => {
                const date = Helper.stringToDate(c.time);
                const now = Helper.stringToDate(new Date());

                console.log(date.diff(now, 'hour') > 0);

                return date.diff(now, 'hour') >= 0;
              })}
              renderItem={renderHourItem}
              keyExtractor={item => '' + item.time}></FlatList>
          </View>

          <View marginT-20 backgroundColor={colors.bg4Color} padding-15 br20>
            <WeatherDetailItem
              title="Rüzgar"
              icon="weather-windy"
              value={prop.current?.wind_kph}></WeatherDetailItem>

            <WeatherDetailItem
              title="Bulut Örtüsü"
              icon="cloud"
              value={prop.current?.cloud}></WeatherDetailItem>

            <WeatherDetailItem
              title="Nem"
              icon="water-percent"
              value={prop.current?.humidity}></WeatherDetailItem>

            <WeatherDetailItem
              title="Basınç"
              icon="arrow-collapse-vertical"
              value={prop.current?.pressure_mb}></WeatherDetailItem>

            <WeatherDetailItem
              title="Görüş Mesafesi"
              icon="eye"
              value={prop.current?.vis_km}></WeatherDetailItem>

            <WeatherDetailItem
              title="UV"
              icon="sun-wireless"
              value={prop.current?.uv}></WeatherDetailItem>
          </View>

          <View marginT-20 backgroundColor={colors.bg4Color} padding-15 br20>
            <FlatList
              data={prop.forecast?.forecastday}
              renderItem={renderDayItem}
              keyExtractor={item => '' + item.date}></FlatList>
          </View>
        </ScrollView>
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
