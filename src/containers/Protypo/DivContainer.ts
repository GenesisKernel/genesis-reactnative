import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import Div from 'components/Protypo/Div';
import { getInteractions } from '../../components/Protypo/utils/common';

import * as pageSelectors from 'modules/page/selectors';

const mapStateToProps = (state: any, ownProps: any) => {
  const interaction = getInteractions(ownProps.attr)
  const hasForm = pageSelectors.hasForm(state);
  const nameOfCurrentPage = pageSelectors.getNameOfCurrentPage(state);
  const form = getFormValues(nameOfCurrentPage)(state);

  return {
    ...ownProps,
    interaction,
    form,
  };
}

export default connect(mapStateToProps)(Div);
