import * as React from 'react';
import { Image as RNImage } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface IImageProps extends IElementProps {
  attr: {
    src: string;
  };
}

import defaultStyles from './Image.style';

const Image: React.SFC<IImageProps> = ({ attr, style }) => (
  <RNImage source={{ uri: attr.src }} style={[defaultStyles.image, style]} />
);

export default stylable('Image')(Image);
