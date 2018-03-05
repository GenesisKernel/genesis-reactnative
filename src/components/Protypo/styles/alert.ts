import { Stylesheet } from 'react-native-stylable';

import { COLORS } from './theme';

export default (styles: Stylesheet) => {
  styles.addRules({
    ['Div.alert']: {
      style: {
        minHeight: 30,
        maxHeight: 90,
        borderRadius: 3,
        padding: 5,
        marginVertical: 10,
        borderColor: 'rgba(0,0,0, .1)',
        borderWidth: 1,
      },
    },
    ['Div.alert Text']: {
      style: {
        color: COLORS.WHITE,
        textAlign: 'center',
      },
    },
    ['Div.alert.alert-danger']: {
      style: {
        backgroundColor: COLORS.DANGER
      }
    },
    ['Div.alert.alert-success']: {
      style: {
        backgroundColor: COLORS.SUCCESS
      }
    },
    ['Div.alert.alert-warning']: {
      style: {
        backgroundColor: COLORS.WARNING
      }
    },
    ['Div.alert.alert-info']: {
      style: {
        backgroundColor: COLORS.INFO
      }
    }
  });
}