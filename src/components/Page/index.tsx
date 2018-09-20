import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';
import BackButtonContainer from 'containers/BackButtonContainer'
import RefreshButtonContainer from 'containers/RefreshButtonContainer'
import HomeButton from 'components/HomeButton'
import styles from './styles';

export interface IPageProps {
  navigation: any
}

class Page extends React.Component<IPageProps, {}> {
  public render() {
    const { navigation } = this.props

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
        <View style={styles.fotter}>
          <BackButtonContainer
            navigation={navigation}
          />
          <RefreshButtonContainer />
          <HomeButton navigation={navigation} />
        </View>
      </View>
    );
  }
}

export default Page;
