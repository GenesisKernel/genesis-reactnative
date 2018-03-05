import { connect } from 'react-redux';
import Protypo from 'components/Protypo';

import * as auth from 'modules/auth';
import * as page from 'modules/page';
import * as application from 'modules/application';

const generateId = state =>
  [
    auth.selectors.getCurrentAccountAddress(state),
    auth.selectors.getCurrentEcosystemId(state),
    application.selectors.getCurrentPageId(state)
  ].join('_');

const mapStateToProps = (state: any) => {
  let currentPage;

  currentPage = page.selectors.getCurrentPage(state);

  return {
    id: generateId(state),
    payload: currentPage.tree || []
  };
};

export default connect(mapStateToProps)(Protypo);
