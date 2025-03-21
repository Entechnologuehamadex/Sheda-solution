import React from 'react';
import { Text } from 'react-native';

const InterExtraLight = (props: any) => {
  return (
    <Text
      {...props}
      style={{ fontFamily: 'Inter-ExtraLight' }}
    >
      {props.children}
    </Text>
  );
};

export default InterExtraLight;