import { times } from 'ramda';
import { Stylesheet } from 'react-native-stylable';

import { COLORS } from './theme';

export default (styles: Stylesheet) => {
  styles.addRules({
    ['Button.btn']: {
      style: {
        minHeight: 30,
        minWidth: 70,
        padding: 5,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    ['Button.btn Text']: {
      style: {
        color: COLORS.WHITE
      }
    },

    ['Button.btn.btn-primary']: {
      style: {
        backgroundColor: COLORS.PRIMARY
      }
    },

    ['Button.btn.btn-default']: {
      style: {
        backgroundColor: COLORS.WHITE,
        borderColor: '#cfdbe2',
        borderWidth: 1
      }
    },
    ['Button.btn.btn-default Text']: {
      style: {
        color: COLORS.BLACK
      }
    },
    ['Button.btn.btn-default Em']: {
      style: {
        color: COLORS.BLACK
      }
    },

    ['Button.btn.btn-success']: {
      style: {
        backgroundColor: COLORS.SUCCESS
      }
    },

    ['Button.btn.btn-warning']: {
      style: {
        backgroundColor: COLORS.WARNING
      }
    },
    ['Button.btn.btn-info']: {
      style: {
        backgroundColor: COLORS.INFO
      }
    },
    ['Button.btn.btn-danger']: {
      style: {
        backgroundColor: COLORS.DANGER
      }
    },
    ['Button.btn.btn-danger Em']: {
      style: {
        color: COLORS.WHITE
      }
    },

    ['Button.btn.btn-link']: {
      style: {
        backgroundColor: 'transparent'
      }
    },
    ['Button.btn.btn-link Text']: {
      style: {
        color: COLORS.PRIMARY,
        fontWeight: 'bold'
      }
    }
  });
};
