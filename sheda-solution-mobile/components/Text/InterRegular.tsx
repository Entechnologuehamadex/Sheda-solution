import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

// Define the props interface for InterRegular
interface InterRegularProps extends TextProps {
  className?: string; // Optional: Tailwind classes
  style?: StyleProp<TextStyle>; // Optional: Custom styles
  children: React.ReactNode; // Text content
}

const InterRegular: React.FC<InterRegularProps> = (props) => {
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