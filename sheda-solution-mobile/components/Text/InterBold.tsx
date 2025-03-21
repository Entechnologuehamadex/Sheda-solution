import React from 'react';
import { Text } from 'react-native';

const InterBold = (props: any) => {
  return (
    <Text
      {...props}
      style={{ fontFamily: 'Inter-Bold' }}
    >
      {props.children}
    </Text>
  );
};

export default InterBold;