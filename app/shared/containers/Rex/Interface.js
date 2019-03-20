// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecommendationInterfaceList from '../../components/Recommendation/Interface/List';

type Props = {
  accounts: {},
  settings: {}
};

class RexInterface extends Component<Props> {
  props: Props;

  render() {
    const {
      accounts,
      settings
    } = this.props;
    const account = accounts[settings.account];
    if (!account) return false;
    return (
      <React.Fragment>
        <FormRex />

        <RecommendationInterfaceList
          account={account}
          settings={settings}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings
  };
}

export default withRouter(connect(mapStateToProps)(RexInterface));
