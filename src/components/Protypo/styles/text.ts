import { Stylesheet } from 'react-native-stylable';

export default (styles: Stylesheet) => {
  styles.addRules({
    ['Text.text-left']: {
      style: {
        textAlign: 'left',
      },
    },
    ['Text.text-center']: {
      style: {
        textAlign: 'center',
      },
    },
    ['Text.text-right']: {
      style: {
        textAlign: 'right',
      },
    },
    ['Text.text-justify']: {
      style: {
        textAlign: 'justify',
      },
    },

    ['Span.text-left']: {
      style: {
        textAlign: 'left',
      },
    },
    ['Span.text-center']: {
      style: {
        textAlign: 'center',
      },
    },
    ['Span.text-right']: {
      style: {
        textAlign: 'right',
      },
    },
    ['Span.text-justify']: {
      style: {
        textAlign: 'justify',
      },
    },

  });
};
