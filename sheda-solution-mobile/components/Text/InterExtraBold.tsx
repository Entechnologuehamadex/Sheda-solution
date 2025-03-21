import React from 'react';
import { Text } from 'react-native';

const InterExtraBold = (props: any) => {
  return (
    <Text
      {...props}
      style={{ fontFamily: 'Inter-ExtraBold' }}
    >
      {props.children}
    </Text>
  );
};

export default InterExtraBold;