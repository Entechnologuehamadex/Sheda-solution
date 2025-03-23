import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

// Define the props interface for InterBold
interface InterBoldProps extends TextProps {
  className?: string; // Optional: Tailwind classes
  style?: StyleProp<TextStyle>; // Optional: Custom styles
  children: React.ReactNode; // Text content
}

const InterBold: React.FC<InterBoldProps> = (props) => {
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