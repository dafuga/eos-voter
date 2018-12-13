// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Header, Icon, Input, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../Button/Elevate';
import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';

class GlobalBlockchainDropdown extends Component<Props> {
  state = { open: false }
  onClose = () => {
    this.setState({ open: false });
  }
  onOpen = () => {
    this.setState({ open: true });
  }
  onToggle = () => {
    this.setState({ open: !this.state.open });
  }
  swapBlockchain = (chainId, authorization, password = false) => {
    const { actions, blockchains, wallets } = this.props;
    const blockchain = find(blockchains, { chainId });
    setSettingWithValidation('node', blockchain.node)
    wallets.forEach(wallet => {
      if (wallet.chainId === chainId) {
        actions.useWallet(account, authorization);
        break;
      }
    })
  }
  render() {
    const {
      blockchains,
      settings,
      t,
      validate,
      wallet,
      wallets
    } = this.props;
    if (!blockchains || blockchains.length === 0) {
      return false;
    }

    const options = blockchains.map((w) => {
      key: blockchain._id,
      onClick: () => { this.swapBlockchain(blockchain._id) },
      text: blockchain.name,
      value: blockchain._id,
    });

    return (
      <Dropdown
        item
        labeled
        options={options}
        value={connection.chainId}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountDropdown);
