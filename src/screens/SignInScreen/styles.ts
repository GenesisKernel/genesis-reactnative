import { StyleSheet } from "react-native";
import { Colors, FontSizes, Fonts } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'transparent',
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.light,
  },
  text: {
    color: Colors.white,
  },
  textContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  notification: {
    marginBottom: 10,
  }
});
