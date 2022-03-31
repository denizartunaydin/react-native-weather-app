import React, {useEffect} from 'react';
import {Dividers, View} from 'react-native-ui-lib';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/text.component';
import {rsTypo} from '../../../theme/typography';
import {colors} from '../../../theme/_variables';

const WeatherDetailItem = (prop: Props) => {
  return (
    <>
      <View row centerV marginB-20>
        <View row centerV>
          <MaterialCommunityIcons
            name={prop.icon}
            color={colors.textColor2}
            size={30}
          />

          <CustomText
            title={'' + prop.title}
            textColor={colors.textColor3}
            fontSize={rsTypo.default}
            style={{marginLeft: 10}}></CustomText>
        </View>

        <View flex right>
          <CustomText
            title={'' + prop.value}
            textColor={colors.textColor3}
            fontSize={rsTypo.h4}
            style={{}}></CustomText>
        </View>
      </View>
    </>
  );
};

type Props = {
  icon: string;
  title: string;
  value: any;
};

export default WeatherDetailItem;
