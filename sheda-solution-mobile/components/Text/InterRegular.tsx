import React from 'react';
import { Text } from 'react-native';

const InterRegular = (props: any) => {
  return (
    <Text
      {...props}
      style={{ fontFamily: 'Inter-Regular' }}
    >
      {props.children}
    </Text>
  );
};

export default InterRegular;