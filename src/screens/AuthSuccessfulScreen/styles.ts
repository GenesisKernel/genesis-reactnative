import { StyleSheet } from 'react-native';
import { Colors, FontSizes, Fonts } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  icon: {
    color: '#fff',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: FontSizes.titleSize,
    marginBottom: 10,
    color: Colors.white,
  },
  text: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: Colors.green,
  }
});
