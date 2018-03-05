import { Stylesheet } from 'react-native-stylable';

import bg from './bg';
import grid from './grid';
import panel from './panel';
import button from './button';
import alert from './alert';

import { COLORS } from './theme';

const styles = new Stylesheet();

bg(styles);
grid(styles);
panel(styles);
button(styles);
alert(styles);

styles.addRules({
  ['Span Text']: {
    style: {
      paddingRight: 5
    }
  },
  ['Span.h1 Text']: {
    style: {
      fontSize: 36
    }
  },

  ['Span.h2 Text']: {
    style: {
      fontSize: 30
    }
  },
  ['Span.h3 Text']: {
    style: {
      fontSize: 24
    }
  },
  ['Span.h4 Text']: {
    style: {
      fontSize: 18
    }
  },
  ['Span.h5 Text']: {
    style: {
      fontSize: 14
    }
  },
  ['Span.h6 Text']: {
    style: {
      fontSize: 12
    }
  },
  ['Span.text-muted Text']: {
    style: {
      color: '#909FA7'
    }
  },
  ['Span.text-primary Text']: {
    style: {
      color: COLORS.PRIMARY
    }
  },
  ['Span.text-success Text']: {
    style: {
      color: COLORS.SUCCESS
    }
  },
  ['Span.text-info Text']: {
    style: {
      color: COLORS.INFO
    }
  },
  ['Span.text-warning Text']: {
    style: {
      color: COLORS.WARNING
    }
  },
  ['Span.text-danger Text']: {
    style: {
      color: '#f05050'
    }
  },
  ['Image.img-circle']: {
    style: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 15
    }
  },
  ['Div.pull-right']: {
    style: {
      flex: 1,
      flexDirection: 'row'
    }
  },
  ['Div.bg-gray-dark']: {
    style: {
      backgroundColor: '#3a3f51'
    }
  },
  ['Div.bg-gray-dark Text']: {
    style: {
      color: '#fff'
    }
  },
  ['Div.bg-gray-darker']: {
    style: {
      backgroundColor: '#232735'
    }
  },
  ['Div.bg-gray-darker Text']: {
    style: {
      color: '#fff'
    }
  },
  ['Div.content-heading']: {
    style: {
      display: 'none' // Hide header on the mobile
    }
  },
  ['Div.breadcrumb']: {
    style: {
      display: 'none' // Hide breadcrumb on the mobile
    }
  },

  ['Input.form-control']: {
    style: {
      flex: 1,
      paddingVertical: 10
    }
  },
  ['Input.form-control.invalid']: {
    style: {
      borderColor: '#f05050'
    }
  },
  ['Input.form-control.error']: {
    style: {
      color: '#f05050'
    }
  },

  ['Div.input-group']: {
    style: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 5
    }
  },
  ['Div.input-group-btn']: {
    style: {
      marginVertical: 10
    }
  },
  ['Div.list-group-item']: {
    style: {
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#e4eaec'
    }
  }
});

export default styles;
