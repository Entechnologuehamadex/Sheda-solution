import React from 'react';
import { Text } from 'react-native';

const InterSemiBold = (props: any) => {
  return (
    <Text
      {...props}
      style={{ fontFamily: 'Inter-SemiBold' }}
    >
      {props.children}
    </Text>
  );
};

export default InterSemiBold;