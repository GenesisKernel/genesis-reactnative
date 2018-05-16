import * as React from 'react';
import { Text as TextDefault } from 'react-native';
import { stylable } from 'react-native-stylable';

import defaultStyles from './Text.style';

export interface ITextProps extends IElementProps {}

const Text: React.SFC<ITextProps> = ({ tag, text, style }) => (
  <TextDefault onLongPress={() => {}} style={[defaultStyles.text, style]} selectable={true}>{text}</TextDefault>
);

export default stylable('Text')(Text);
