import { times } from 'ramda';
import { Stylesheet } from 'react-native-stylable';

import { COLORS } from './theme';

const panelPadding = {
  padding: 5,
  paddingVertical: 10
};

export default (styles: Stylesheet) => {
  styles.addRules({
    ['Div.panel']: {
      style: {}
    },
    ['Div.panel-heading']: {
      style: {
        ...panelPadding,
        backgroundColor: '#5d9cec'
      }
    },
    ['Div.panel-heading Text']: {
      style: {
        color: COLORS.WHITE
      }
    },
    ['Div.panel-body']: {
      style: {
        ...panelPadding,
        backgroundColor: COLORS.WHITE
      }
    },
    ['Div.panel-footer']: {
      style: {
        ...panelPadding,
        backgroundColor: '#FAFAFA',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  });
};
