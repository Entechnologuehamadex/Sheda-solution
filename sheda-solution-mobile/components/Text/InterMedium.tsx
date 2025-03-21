import React from 'react';
import { Text } from 'react-native';

const InterMedium = (props: any) => {
  return (
    <Text
      {...props}
      style={{ fontFamily: 'Inter-Medium' }}
    >
      {props.children}
    </Text>
  );
};

export default InterMedium;