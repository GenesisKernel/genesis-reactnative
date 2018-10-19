import { connect } from 'react-redux';

import HomeScreen from 'screens/HomeScreen';

import * as page from 'modules/page';
import * as navigator from 'modules/navigator';

import { navTypes } from '../constants';

import * as application from 'modules/application';

const mapStateToProps = (state: any, ownProps: any) => {
  const currentPage = page.selectors.getPage(state.application.defaultPage)(state);

  return {
    menu: ownProps.menu || (currentPage && currentPage.menuTree) || []
  };
};

export default connect(mapStateToProps)(HomeScreen);
