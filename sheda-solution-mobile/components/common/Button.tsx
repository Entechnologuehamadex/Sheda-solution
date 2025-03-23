import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';

interface ButtonProps{
    isFull?: boolean;
    color?: string;
  [key: string]: any; //allow any additional props to make the component generic
}

const Button = ({ isFull = false, color = '#C1272D', ...props}: ButtonProps) => {
  return (
    <TouchableOpacity
    {...props}
    style={[styles.button, isFull? (styles.fullWidth) : "",  {backgroundColor: color}]}
    >
       {props.children}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    fullWidth: {
      width: '100%',
    },
})

export default Button;
