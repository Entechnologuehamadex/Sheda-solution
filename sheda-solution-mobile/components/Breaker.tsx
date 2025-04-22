import { View, StyleSheet, Text } from 'react-native';
import InterRegular from './Text/InterRegular';

  const Breaker = ({breakText}: {breakText:string}) => {

  return (
    <View style={styles.container}>
      <View className='border w-1/3 border-borderColor' />
     <InterRegular className="">{breakText}</InterRegular>
      <View className='border w-1/3 border-borderColor' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Breaker