import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';
import StaticPageContainer from 'containers/StaticPageContainer';
import Footer from 'components/Footer';
import styles from './styles';

interface IPage {
  currentPageId: string;
  isFetching: boolean;
}

class Page extends React.Component<IPage> {
  public render() {
    const { currentPageId } = this.props;

    if (currentPageId.includes('@') ) {
      return <StaticPageContainer />;
    }

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
