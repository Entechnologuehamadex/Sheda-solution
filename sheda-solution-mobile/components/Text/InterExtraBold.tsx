import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

// Define the props interface for InterExtraBold
interface InterExtraBoldProps extends TextProps {
  className?: string; // Optional: Tailwind classes
  style?: StyleProp<TextStyle>; // Optional: Custom styles
  children: React.ReactNode; // Text content
}

const InterExtraBold: React.FC<InterExtraBoldProps> = (props) => {
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