import { times } from 'ramda';
import { Stylesheet } from 'react-native-stylable';

const generateGridRules = (className: string, customStyles: {}) => {
  const columns = 12;
  const arr = times(i => i, columns);

  return arr.reduce((acc: any, index) => {
    acc[`Div.${className}-${index + 1}`] = customStyles
      ? customStyles
      : {
          style: {
            flex: (index + 1) / columns
          }
        };

    return acc;
  }, {});
};

export default (styles: Stylesheet) => {
  styles.addRules({
    ['Div.row']: {
      style: {
        flex: 1
      }
    },
    ['Div.row.row-table']: {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
      }
    },
    ...generateGridRules('col-xs'),
    ...generateGridRules('col-md')
  });
};
