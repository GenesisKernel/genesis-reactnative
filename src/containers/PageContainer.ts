import { connect } from 'react-redux';
import Page from 'components/Page';

import * as page from 'modules/page';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    pending: page.selectors.isFetching(state),
    ...ownProps
  };
};

export default connect(mapStateToProps)(Page);
