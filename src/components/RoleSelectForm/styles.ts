import { StyleSheet } from "react-native";
import { Colors, FontSizes, authScreenPadding, borderRadius } from 'components/ui/theme';

export default StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.white,
    height: '70%',
    borderRadius: borderRadius,
  },
  title: {
    paddingVertical: 15,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: FontSizes.modalTitleSize,
  },
  roleContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noRoleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});