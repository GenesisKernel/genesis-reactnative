import { connect } from 'react-redux';

import * as pageSelectors from 'modules/page/selectors';
import * as ecosystemActions from 'modules/ecosystem/actions';

import StaticProtypo from 'components/StaticProtypo';

const mapStateToProps = (state: any, ownProps: { pageName: string }) => {
  return {
    page: pageSelectors.getStaticPage(state, ownProps.pageName),
    pageName: ownProps.pageName,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addEcosystemToList: (params: { ecosystem: string, page?: string }) => dispatch(ecosystemActions.addEcosystemToList(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticProtypo);
