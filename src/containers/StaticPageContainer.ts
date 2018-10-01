import { connect } from 'react-redux';
import StaticPage from 'components/StaticPage';

const mapStateToProps = (state: any) => ({
  currentPageId: state.application.currentPageId,
  page: '',
  ecosystem: state.ecosystem,
});

export default connect(mapStateToProps)(StaticPage);
