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

    ['Span.text-left Text']: {
      style: {
        textAlign: 'left',
      },
    },
    ['Span.text-center Text']: {
      style: {
        textAlign: 'center',
      },
    },
    ['Span.text-right Text']: {
      style: {
        textAlign: 'right',
      },
    },
    ['Span.text-justify Text']: {
      style: {
        textAlign: 'justify',
      },
    },

  });
};
