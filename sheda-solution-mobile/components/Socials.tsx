import { View, StyleSheet, Text } from 'react-native';
import InterRegular from './Text/InterRegular';
import Icon from './common/Icon';
import { FACEBOOKICON, GOOGLEICON, APPLEICON  } from '@/assets/icons';

export default function Socials() {

  return (
    <View style={styles.container}>
    <Icon 
    icon={FACEBOOKICON}
    className='border border-borderColor py-4 px-11 rounded-lg'/>
    <Icon 
    icon={GOOGLEICON}
    className='border border-borderColor py-4 px-11 rounded-lg'/>
    <Icon 
    icon={APPLEICON}
    className='border border-borderColor py-4 px-11 rounded-lg'/>
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
