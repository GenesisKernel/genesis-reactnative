import { connect } from 'react-redux';
import * as account from 'modules/account';

import BackupAccountButton from 'components/BacupAccountButton';

const mapDispatchToProps = (dispatch: any) => {
    return {
        backupAccount: () => dispatch(account.actions.backupAccount()),
    }
}

export default connect(null, mapDispatchToProps)(BackupAccountButton);