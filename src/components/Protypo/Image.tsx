import * as React from 'react';
import { Image as RNImage } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface IImageProps extends IElementProps {
  attr: {
    src: string;
  };
  currentNode: {
    apiUrl: string;
  };
}

import defaultStyles from './Image.style';

const Image: React.SFC<IImageProps> = ({ attr, style, currentNode }) => {
  return (
    <RNImage source={{ uri: `${currentNode.apiUrl}api/v2${attr.src}` }} style={[defaultStyles.image, style]} />
  );
}

export default stylable('Image')(Image);
