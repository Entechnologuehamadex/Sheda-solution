import React from 'react';
import { Text } from 'react-native';

const  SoraBold= (props: any) => {
  return (
    <Text
      {...props}
      style={{ fontFamily: 'Sora-Bold' }}
    >
      {props.children}
    </Text>
  );
};

export default SoraBold ;