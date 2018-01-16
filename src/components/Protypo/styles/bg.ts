import { times } from 'ramda';
import { Stylesheet, Rules } from 'react-native-stylable';

import { COLORS } from './theme';

const colorMap = {
  primary: [COLORS.PRIMARY_DARK, COLORS.PRIMARY, COLORS.PRIMARY_LIGHT],
  success: [COLORS.SUCCESS_DARK, COLORS.SUCCESS, COLORS.SUCCESS_LIGHT],
  info: [COLORS.INFO_DARK, COLORS.INFO, COLORS.INFO_LIGHT],
  warning: [COLORS.WARNING_DARK, COLORS.WARNING, COLORS.WARNING_LIGHT],
  danger: [COLORS.DANGER_DARK, COLORS.DANGER, COLORS.DANGER_LIGHT],
  gray: [COLORS.GRAY_DARK, COLORS.GRAY, COLORS.GRAY_LIGHT]
};

const generateStyle = (backgroundColor: string) => ({
  style: {
    backgroundColor
  }
});

const generateBg = (map: any) => {
  const keys = Object.keys(map);

  return keys.reduce((acc: Rules, key) => {
    const item = map[key];
    acc[`Div.bg-${key}-dark`] = generateStyle(item[0]);
    acc[`Div.bg-${key}`] = generateStyle(item[1]);
    acc[`Div.bg-${key}-light`] = generateStyle(item[2]);

    return acc;
  }, {});
};

export default (styles: Stylesheet) => {
  styles.addRules({
    ...generateBg(colorMap),
    ['Div.bg-gray-darker']: generateStyle(COLORS.GRAY_DARKER),
    ['Div.bg-gray-lighter']: generateStyle(COLORS.GRAY_LIGHTER)
  });
};
