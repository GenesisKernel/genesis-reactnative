import { connect } from 'react-redux';
import { getCurrentLocale } from 'modules/application/selectors';
import IntlProviderComponent from 'components/IntlProvider';

const mapStateToProps = (state: any) => {
  return {
    currentLocale: getCurrentLocale(state),
  }
}

export default connect(mapStateToProps)(IntlProviderComponent);