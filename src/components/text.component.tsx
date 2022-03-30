import React from 'react';
import {Text} from 'react-native-ui-lib';

const CustomText = (props: Props) => {
  return (
    <>
      {props.title && props.title.length > 0 ? (
        <>
          <Text
            numberOfLines={props.numberOfLines}
            style={{color: props.textColor, ...props.fontSize, ...props.style}}>
            {props.title}
          </Text>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

type Props = {
  title: string | undefined;
  textColor: string;
  fontSize: any;
  style?: any;
  numberOfLines?: number;
};

export default CustomText;
