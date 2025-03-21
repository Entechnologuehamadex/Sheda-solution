import { Text } from "react-native";

const ManropeMedium = (props: any) => {
    return(
        <Text 
        {...props}
        style={{fontFamily: 'Manrope-Medium'}}
        >
            {props.children}
        </Text>
    )
}
export default ManropeMedium;