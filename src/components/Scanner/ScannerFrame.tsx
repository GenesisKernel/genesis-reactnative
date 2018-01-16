import * as React from 'react';
import { View } from 'react-native';
import Text from '../ui/Text';
import styles from './styles';

const ScannerFrame: React.SFC<{}> = () => {
  return (
    <View style={styles.qrFrame}>
      <View style={[styles.frameBlock, styles.left, styles.top, styles.vertical]}></View>
      <View style={[styles.frameBlock, styles.right, styles.top, styles.vertical]}></View>
      <View style={[styles.frameBlock, styles.right, styles.bottom, styles.vertical]}></View>
      <View style={[styles.frameBlock, styles.left, styles.bottom, styles.vertical]}></View>

      <View style={[styles.frameBlock, styles.left, styles.top, styles.horizontal]}></View>
      <View style={[styles.frameBlock, styles.right, styles.top, styles.horizontal]}></View>
      <View style={[styles.frameBlock, styles.right, styles.bottom, styles.horizontal]}></View>
      <View style={[styles.frameBlock, styles.left, styles.bottom, styles.horizontal]}></View>
      <Text style={styles.qrText}>
        Place QR here
      </Text>
    </View>
  );
}

export default ScannerFrame;
