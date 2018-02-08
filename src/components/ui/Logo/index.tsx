import * as React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

const Logo: React.SFC<{}> = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/images/logo/logo.png')} />
    </View>
  );
};

export default Logo;
