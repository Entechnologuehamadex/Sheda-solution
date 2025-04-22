import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

// Define the props interface for InterSemiBold
interface InterSemiBoldProps extends TextProps {
  className?: string; // Optional: Tailwind classes
  style?: StyleProp<TextStyle>; // Optional: Custom styles
  children: React.ReactNode; // Text content
}

const InterSemiBold: React.FC<InterSemiBoldProps> = (props) => {
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