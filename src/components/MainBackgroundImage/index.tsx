import * as React from 'react';
import { ImageBackground } from 'react-native';

export interface IMainBackgroundImageProps {
  children: any;
  backgroundImage: string;
}
export default class MainBackgroundImage extends React.PureComponent<IMainBackgroundImageProps> {
  public render() {
    const { backgroundImage } = this.props;

    const imagePath = backgroundImage === 'violet'
      ? require('../../../assets/images/bg.png')
      : require('../../../assets/images/newBg.png');

    return (
      <ImageBackground
        source={imagePath}
        style={{ flex: 1 }}>
        {this.props.children}
      </ImageBackground>
    );
  }
}