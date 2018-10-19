import { connect } from 'react-redux';
import MenuGrid from 'components/MenuGrid';

import * as application from 'modules/application';
import * as page from 'modules/page';
import * as navigatorActions from 'modules/navigator/actions';
import { navTypes } from '../constants';

const mapStateToProps = (state: any, ownProps: any) => {
  const currentPage = page.selectors.getPage(state.application.defaultPage)(state);

  return {
    menu: ownProps.menu || (currentPage && currentPage.menuTree) || []
  };
};

const mapDispatchToProps = dispatch => ({
  navigateToSubMenu: (menu: any) =>
    dispatch(navigatorActions.navigate(navTypes.SUB_MENU, { menu })),
  receivePageParams: (params: any) => {
    dispatch(navigatorActions.navigate(navTypes.PAGE));
    dispatch(application.actions.receivePageParams(params));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuGrid);
