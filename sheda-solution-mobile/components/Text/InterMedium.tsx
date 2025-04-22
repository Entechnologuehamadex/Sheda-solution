import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

// Define the props interface for InterMedium
interface InterMediumProps extends TextProps {
  className?: string; // Optional: Tailwind classes
  style?: StyleProp<TextStyle>; // Optional: Custom styles
  children: React.ReactNode; // Text content
}

const InterMedium: React.FC<InterMediumProps> = (props) => {
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