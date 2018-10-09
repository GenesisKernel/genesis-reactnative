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

const mapDispatchToProps = (dispatch: any) => ({
  setStaticPage: (pagePayload: page.actions.IStaticPagePayload) => {
    dispatch(page.actions.requestPage.started(pagePayload));
    dispatch(navigator.actions.navigate(navTypes.PAGE));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);