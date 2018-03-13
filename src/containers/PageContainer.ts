import { connect } from 'react-redux';
import Page from 'components/Page';

import * as page from 'modules/page';

const mapStateToProps = (state: any) => {
  return {
    pending: page.selectors.isFetching(state)
  };
};

export default connect()(Page);
