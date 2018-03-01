import { connect } from 'react-redux';
import MenuGrid from 'components/MenuGrid';

import * as application from 'modules/application';
import * as page from 'modules/page';
import * as navigator from 'modules/navigator';
import { navTypes } from '../navigatorConfig';

const mapStateToProps = (state: any, ownProps: any) => {
  const currentPage = page.selectors.getPage(ownProps.pageName)(state);

  return {
    menu: ownProps.menu || (currentPage && currentPage.menuTree) || []
  };
};

const mapDispatchToProps = dispatch => ({
  navigateToSubMenu: (menu: any) =>
    dispatch(navigator.actions.navigate(navTypes.SUB_MENU, { menu })),
  receivePageParams: (params: any) => {
    dispatch(navigator.actions.navigate(navTypes.PAGE));
    dispatch(application.actions.receivePageParams(params));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuGrid);
