import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"

interface ButtonProps {
  isFull?: boolean
  color?: string
  style?: any
  [key: string]: any //allow any additional props to make the component generic
}

const Button = ({ isFull = false, color = "#C1272D", style, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        isFull ? styles.fullWidth : null,
        { backgroundColor: color },
        style, // This allows style prop to override the default backgroundColor
      ]}
    >
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  fullWidth: {
    width: "100%",
  },
})

export default Button
