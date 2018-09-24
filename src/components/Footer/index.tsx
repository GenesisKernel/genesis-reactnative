import * as React from 'react';
import { View } from 'react-native';
import BackButtonContainer from 'containers/BackButtonContainer';
import RefreshButtonContainer from 'containers/RefreshButtonContainer';
import HomeButtonContainer from 'containers/HomeButtonContainer';
import styles from './styles';

const Footer = () => (
  <View style={styles.fotter}>
    <BackButtonContainer />
    <RefreshButtonContainer />
    <HomeButtonContainer />
  </View>
);

export default Footer;
