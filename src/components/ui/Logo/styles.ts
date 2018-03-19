import { StyleSheet } from 'react-native';
import { biggerThenIphone6Width } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    resizeMode: 'contain',
    width: '40%',
    height: biggerThenIphone6Width ? 65 : 50,
  }
});
