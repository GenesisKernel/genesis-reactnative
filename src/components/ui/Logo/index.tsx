import * as React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

export interface ILogoProps {
  type?: string;
}
const Logo: React.SFC<ILogoProps> = (props) => {
  const imagePath = props.type === 'white'
    ? require('../../../../assets/images/logo/logo.png')
    : require('../../../../assets/images/logo/logo_black.png');

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={imagePath} />
    </View>
  );
};

Logo.defaultProps = {
  type: 'white',
}

export default Logo;
