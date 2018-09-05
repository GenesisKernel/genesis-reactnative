import { Stylesheet } from 'react-native-stylable';

export default (styles: Stylesheet) => {
  styles.addRules({
    ['Text.pt-sm']: {
      style: {
        paddingTop: 5,
      },
    },
    ['Text.pb-sm']: {
      style: {
        paddingBottom: 5,
      },
    },
    ['Text.pl-sm']: {
      style: {
        paddingLeft: 5,
      },
    },
    ['Text.pr-sm']: {
      style: {
        paddingRight: 5,
      },
    },
    ['Text.mt-sm']: {
      style: {
        marginTop: 5,
      },
    },
    ['Text.mb-sm']: {
      style: {
        marginBottom: 5,
      },
    },
    ['Text.ml-sm']: {
      style: {
        marginLeft: 5,
      },
    },
    ['Text.mr-sm']: {
      style: {
        marginRight: 5,
      },
    },
    ['Text.pt-lg']: {
      style: {
        paddingTop: 8,
      },
    },
    ['Text.pb-lg']: {
      style: {
        paddingBottom: 8,
      },
    },
    ['Text.pl-lg']: {
      style: {
        paddingLeft: 8,
      },
    },
    ['Text.pr-lg']: {
      style: {
        paddingRight: 8,
      },
    },
    ['Text.mt-lg']: {
      style: {
        marginTop: 8,
      },
    },
    ['Text.mb-lg']: {
      style: {
        marginBottom: 8,
      },
    },
    ['Text.ml-lg']: {
      style: {
        marginLeft: 8,
      },
    },
    ['Text.mr-lg']: {
      style: {
        marginRight: 8,
      },
    },

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
