import { connect } from 'react-redux';
import Menu from 'components/Menu';

import * as application from 'modules/application';
import * as page from 'modules/page';

const mapStateToProps = (state: any) => {
  const currentPage = page.selectors.getCurrentPage(state);

  return {
    pageName: currentPage.name,
    menu: currentPage.menuTree || []
  };
};

const mapDispatchToProps = dispatch => ({
  receivePageParams: (params: any) =>
    dispatch(application.actions.receivePageParams(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
