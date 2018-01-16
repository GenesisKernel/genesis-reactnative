import { connect } from 'react-redux';
import PageTitle from 'components/PageTitle';

import * as application from 'modules/application';

const mapStateToProps = (state: any) => {
  const title = application.selectors.getTitle(state);
  const isVde = application.selectors.isVDEMode(state);

  return {
    title: `${isVde ? 'VDE - ' : ''}${title}`
  };
};

export default connect(mapStateToProps)(PageTitle);
