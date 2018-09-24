import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';
import Footer from 'components/Footer';
import styles from './styles';

class Page extends React.Component<{}, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="always"
        >
          <ProtypoContainer />
        </KeyboardAwareScrollView>
        <Footer />
      </View>
    );
  }
}

export default Page;
